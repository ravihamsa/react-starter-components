/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {PropTypes, Component} from 'react';
import {Rx} from '../../core/rxutils';
import {_} from '../../core/utils';
import validatorMap from './validationRules';
import activeRulesMap from './activeRules';
import dataLoader from '../../core/dataLoader';

const defaultPropReturnFunction = _.identity;

const returnTrueFunction = ()=> {
    return true;
};

const getValidationRule = item => {
    return {
        type: item.expr,
        value: item.value,
        length: item.length,
        func: item.expr === 'function' ? item.func : validatorMap[item.expr],
        message: item.message || item.expr
    };
};

const getActiveRule = item => ({
    type: item.expr,
    element: item.element,
    prop: item.prop || 'update',
    value: item.value,
    func: item.expr === 'function' ? item.func : activeRulesMap[item.expr]
});

const getPropRule = item => ({
    type: item.expr,
    element: item.element,
    prop: item.prop,
    value: item.value,
    valueFunc: item.valueFunc || defaultPropReturnFunction,
    func: item.expr === 'function' ? item.func : activeRulesMap[item.expr]
});

const getServerValidationRule = rule => {
    return {
        requestId: rule.requestId,
        getParams: rule.getParams || _.identity,
        validateRequest: rule.validateRequest || returnTrueFunction
    };
};


export default class RXFormElement extends Component {

    constructor(props) {
        super(props);
        const {debounceTime = 0, validations, activeRules, propRules} = this.props;
        this.props$ = new Rx.Subject();
        this.unmount$ = new Rx.Subject();
        // this.talkToForm$ = new Rx.Subject();
        this.value$ = new Rx.Subject().debounceTime(debounceTime);
        // this.selection$ = new Rx.Subject();
        this.state = _.pick(this.props, this.getPropToStateList());
        this.state.__shadowValue = this.props.value;
        this._value = this.props.value;
        this.validations = validations.map(rule => getValidationRule(rule));
        this.activeRules = activeRules.map(rule => getActiveRule(rule));
        this.propRules = propRules.map(rule => getPropRule(rule));
    }

    getPropToStateList() {
        return ['active', 'error', 'disabled', 'valid', 'value', 'type', 'serverValid', 'serverError', 'placeholder'];
    }


    applyValue(value) {
        this.updateValue(value, 'update');
    }

    /*    componentWillReceiveProps(newProps) {
     _.each(this.getPropToStateList(), (prop) => {
     if (newProps[prop]) {
     if (prop === 'value') {
     this.applyValue(newProps[prop])
     }
     this.updateProps(newProps[prop], prop)
     }
     })
     }*/

    componentWillMount() {

        const groupedProps$ = this.props$.groupBy(x => x.type + '--' + x.field);
        groupedProps$.mergeMap(group => group.distinctUntilChanged((a, b) => a.value === b.value)).takeUntil(this.unmount$).subscribe(value => this.context.elementProps$.next(value));

        this.value$.distinctUntilChanged((a, b) => a.value === b.value).takeUntil(this.unmount$).subscribe(value => this.context.elementValue$.next(value));

        this.addValidationListeners();
        this.addServerValidationListeners();
        this.addActiveListeners();
        this.addPropListeners();
        this.addCommunicationListeners();
        this.propChangeListeners();
        this.updateProps(null, 'register');
        this.readInputValue();
        _.each(this.getPropToStateList(), prop => {
            this.updateProps(this.state[prop], prop);
        });

    }

    componentWillUnmount() {
        this.updateProps(null, 'clear');
        this.unmount$.next();
    }

    readInputValue() {
        const {hasController, valueIndex} = this.context;
        if (!hasController) {
            this.updateValue(this.props.value, 'read');
        } else {
            this.updateValue(valueIndex[this.props.name], 'read');
        }

    }

    setIfNotEqualState(newStateMap) {
        for (const newState in newStateMap) {
            const value = newStateMap[newState];
            if (this.state[newState] !== value) {
                this.setState({
                    [newState]: value
                });
            }
        }
    }


    propChangeListeners() {
        const propChange$ = this.context.elementProps$.filter(e => e.field === this.props.name);
        propChange$.takeUntil(this.unmount$).subscribe(e => {
            if (this.context.elementPropIndex[this.props.name]) {
                this.setState(this.context.elementPropIndex[this.props.name]);
            }
        });
    }

    addCommunicationListeners() {
        const setSibling$ = this.context.communication$.filter(val => val.type === 'elementValue' && val.field === this.props.name);
        setSibling$.takeUntil(this.unmount$).subscribe(val => {
            this.applyValue(val.value);
        });

        const setSiblingProp$ = this.context.communication$.filter(val => val.type === 'elementProp' && val.field === this.props.name);
        setSiblingProp$.takeUntil(this.unmount$).subscribe(val => {
            this.updateProps(val.value, val.prop);
        });
    }

    addServerValidationListeners() {

        if (this.props.serverValidation) {
            const forceServerValidation$ = this.context.communication$.filter(val => val.type === 'elementServerValidation' && val.field === this.props.name);
            const serverValidation = getServerValidationRule(this.props.serverValidation);
            const validateRequest$ = this.value$.filter(val => val.type === 'update').merge(forceServerValidation$)
                .debounceTime(400)
                .filter(() => this.state.valid)
                .filter(val => serverValidation.validateRequest(val, this.context.elementValueIndex));
            const setError$ = validateRequest$.mergeMap(val => Rx.Observable.fromPromise(dataLoader.getRequestDef(serverValidation.requestId, serverValidation.getParams(val, this.context.elementValueIndex)))).combineLatest().defaultIfEmpty(null);
            setError$.takeUntil(this.unmount$).subscribe(resp => {
                this.updateProps(resp[0], 'serverError');
                this.updateProps(resp[0] ? false : true, 'serverValid');
            }, resp => {
                this.updateProps(resp[0], 'serverError');
                this.updateProps(resp[0] ? false : true, 'serverValid');
            });
        }

    }

    addValidationListeners() {
        const forceValidate$ = this.context.communication$.filter(val => val.type === 'validate' && val.field === this.props.name);
        const validateRequest$ = this.value$.filter(val => val.type === 'update').merge(forceValidate$);
        const setError$ = validateRequest$
            .mergeMap(val => Rx.Observable.from(this.validations).filter(rule => rule.func.call(this, rule, val.value) !== true).take(1).defaultIfEmpty(null));
        setError$.takeUntil(this.unmount$).subscribe((rule, val) => {
            this.updateProps(rule ? false : true, 'valid');
            this.updateProps(rule, 'error');
        });
    }

    addActiveListeners() {

        const elementName = this.props.name;
        if (this.activeRules.length === 0) {
            return;
        }

        const elementsToWatchForActive = _.map(this.activeRules, 'element');
        const valueChange$ = this.context.elementValue$;
        const valueIndex = this.context.elementValueIndex;
        valueChange$
            .filter(value => value.field !== elementName && elementsToWatchForActive.indexOf(value.field) > -1)
            // .do(value=>console.log(value, 'activeCheck'))
            .mergeMap(value => Rx.Observable.from(this.activeRules).filter(rule => rule.func.call(this, {
                value: valueIndex[rule.element]
            }, rule) !== true).mapTo(false).defaultIfEmpty(true))
            .takeUntil(this.unmount$)
            .subscribe(e => {
                this.updateProps(e, 'active');
            });
    }

    addPropListeners() {

        const elementName = this.props.name;
        const {propRules} = this;
        if (propRules.length === 0) {
            return;
        }

        const groupedPropRules = _.groupBy(propRules, e => e.prop);


        const elementsToWatchForActive = _.map(propRules, 'element');
        const valueChange$ = this.context.elementValue$;
        const valueIndex = this.context.elementValueIndex;

        valueChange$
            .filter(value => value.field !== elementName && value.type === 'update' && elementsToWatchForActive.indexOf(value.field) > -1)
            // .do(value=>console.log(value, 'activeCheck'))
            .takeUntil(this.unmount$)
            .subscribe(value => {
                _.each(groupedPropRules, (rules, prop) => {
                    const propValue = _.reduce(rules, (memo, rule) => !memo && rule.func.call(this, {
                        value: valueIndex[rule.element]
                    }, rule) === true, false);
                    this.updateProps(this.props.getPropValue(prop, propValue), prop);
                });

            });
    }

    onChange(e) {
        this.updateValue(e.target.value, 'update');
    }

    getValue() {
        return this._value;
    }

    updateValue(value, type) {
        this._value = value;
        this.value$.next({
            field: this.props.name, type, value
        });
        this.updateProps(value, 'value');
    }

    updateProps(value, type) {
        this.props$.next({
            field: this.props.name, type, value
        });
    }

    getRestProps() {
        const props = _.omit(this.state, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'error',
            'validations', 'activeRules', 'valid', 'serverValidation', '__shadowValue', 'register', 'clear',
            'exposeName', 'exposeSelection', 'serverValid', 'serverError');
        props.ref = 'inputElement';
        props.className = (props.className || '') + ' form-control';
        return props;
    }

    getFormClasses() {
        const classArray = ['form-group'];
        classArray.push('element');
        classArray.push('element-type-' + this.props.type);
        classArray.push('element-' + this.props.name);
        if (this.state.error) {
            classArray.push('has-error');
        }
        if (this.props.disabled) {
            classArray.push('disabled');
        }
        return classArray;
    }

    renderElement() {
        const restProps = this.getRestProps();
        return <input  {...restProps} onChange={this.onChange.bind(this)}/>;
    }

    getErrors() {
        return this.state.errors;
    }

    setSiblingValue(siblingName, value) {
        this.context.communication$.next({
            field: siblingName, type: 'elementValue', value
        });
    }

    getSiblingValue(siblingName) {
        return this.context.elementValueIndex[siblingName];
    }

    renderElementWithWrapper() {
        const formClasses = this.getFormClasses();
        const error = this.state.error || this.state.serverError;
        return <fieldset className={formClasses.join(' ')}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            {this.renderElement()}
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : ''}
            {error ? <small className="text-danger">{error.message}</small> : ''}
        </fieldset>;
    }

    render() {
        if (this.state.active) {
            return this.renderElementWithWrapper();
        } else {
            return null;
        }
    }
}

RXFormElement.contextTypes = {
    elementProps$: PropTypes.object.isRequired,
    elementValue$: PropTypes.object.isRequired,
    communication$: PropTypes.object.isRequired,
    elementPropIndex: PropTypes.object.isRequired,
    elementValueIndex: PropTypes.object.isRequired,
    hasController: PropTypes.bool.isRequired
};

RXFormElement.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    getPropValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    showLabel: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    serverValid: PropTypes.bool.isRequired,
    error: PropTypes.object,
    debounceTime: PropTypes.number.isRequired,
    validations: PropTypes.array,
    activeRules: PropTypes.array,
    propRules: PropTypes.array,
    serverValidation: PropTypes.object
};

RXFormElement.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input',
    value: '',
    showLabel: true,
    active: true,
    disabled: false,
    valid: true,
    serverValid: true,
    debounceTime: 0,
    error: null,
    serverError: null,
    validations: [],
    activeRules: [],
    propRules: [],
    getPropValue: (prop, value) => value,
    serverValidation: null
};

