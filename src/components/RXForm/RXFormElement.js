/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {PropTypes, Component} from "react";
import Rx from 'rxjs';
import _ from 'lodash';
import validatorMap from './validationRules';
import activeRulesMap from './activeRules';
import dataLoader from '../../core/dataLoader';

let defaultPropReturnFunction = _.identity;

let returnTrueFunction = function() {return true};

let getValidationRule = function (item) {
    return {
        type: item.expr,
        value: item.value,
        length: item.length,
        func: item.expr === 'function' ? item.func : validatorMap[item.expr],
        message: item.message || item.expr
    }
}

let getActiveRule = (item) => {
    return {
        type: item.expr,
        element: item.element,
        prop: item.prop || 'update',
        value: item.value,
        func: item.expr === 'function' ? item.func : activeRulesMap[item.expr]
    }
}

let getPropRule = (item) => {
    return {
        type: item.expr,
        element: item.element,
        prop: item.prop,
        value: item.value,
        valueFunc:item.valueFunc || defaultPropReturnFunction,
        func: item.expr === 'function' ? item.func : activeRulesMap[item.expr]
    }
}

let getServerValidationRule = function (rule) {
    return {
        requestId: rule.requestId,
        getParams: rule.getParams || _.identity,
        validateRequest: rule.validateRequest || returnTrueFunction
    }
}


export default class RXFormElement extends Component {

    constructor(props) {
        super(props);
        let {debounceTime=0, validations, activeRules, propRules} = this.props;
        this.props$ = new Rx.Subject();
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
        return ['active', 'error', 'disabled', 'valid', 'value', 'type', 'serverValid', 'serverError', 'placeholder']
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

        let groupedProps$ = this.props$.groupBy(x => x.type + '--' + x.field);
        groupedProps$.flatMap(group => {
            return group.distinctUntilChanged((a, b) => {
                return a.value === b.value
            });
        }).subscribe(value => this.context.elementProps$.next(value))

        this.value$.distinctUntilChanged((a, b) => {
            return a.value === b.value
        }).subscribe(value => {
            return this.context.elementValue$.next(value)
        });

        this.addValidationListeners()
        this.addServerValidationListeners()
        this.addActiveListeners()
        this.addPropListeners();
        this.addCommunicationListeners();
        this.propChangeListeners()
        this.updateProps(null, 'register');
        this.readInputValue();
        _.each(this.getPropToStateList(), (prop) => {
            this.updateProps(this.state[prop], prop)
        })
    }

    readInputValue() {
        this.updateValue(this.props.value, 'read');
    }

    setIfNotEqualState(newStateMap) {
        for (let newState in newStateMap) {
            let value = newStateMap[newState];
            if (this.state[newState] !== value) {
                this.setState({[newState]: value})
            }
        }
    }


    propChangeListeners() {
        let propChange$ = this.context.elementProps$.filter(e => e.field === this.props.name);
        propChange$.subscribe(e => {
            this.setState(this.context.elementPropIndex[this.props.name])
        });
    }

    addCommunicationListeners() {
        let setSibling$ = this.context.communication$.filter(val => val.type === 'elementValue' && val.field === this.props.name);
        setSibling$.subscribe((val) => {
            this.applyValue(val.value);
        })

        let setSiblingProp$ = this.context.communication$.filter(val => val.type === 'elementProp' && val.field === this.props.name);
        setSiblingProp$.subscribe((val) => {
            this.updateProps(val.value, val.prop);
        })
    }

    addServerValidationListeners() {

        if (this.props.serverValidation) {
            let forceServerValidation$ = this.context.communication$.filter(val => val.type === 'elementServerValidation' && val.field === this.props.name);
            let serverValidation = getServerValidationRule(this.props.serverValidation);
            let validateRequest$ = this.value$.filter(val => val.type === 'update').merge(forceServerValidation$)
                .debounceTime(400)
                .filter(() => this.state.valid)
                .filter((val) => {
                    return serverValidation.validateRequest(val, this.context.elementValueIndex)
                });
            let setError$ = validateRequest$.flatMap((val) => {
                return Rx.Observable.fromPromise(dataLoader.getRequestDef(serverValidation.requestId, serverValidation.getParams(val, this.context.elementValueIndex)))
            }).combineLatest().defaultIfEmpty(null)
            setError$.subscribe((resp) => {
                this.updateProps(resp[0], 'serverError')
                this.updateProps(resp[0] ? false : true, 'serverValid');
            }, (resp) => {
                this.updateProps(resp[0], 'serverError')
                this.updateProps(resp[0] ? false : true, 'serverValid');
            });
        }

    }

    addValidationListeners() {
        let forceValidate$ = this.context.communication$.filter(val => val.type === 'validate' && val.field === this.props.name);
        let validateRequest$ = this.value$.filter(val => val.type === 'update').merge(forceValidate$);
        let setError$ = validateRequest$
            .mergeMap((val) => Rx.Observable.from(this.validations).filter((rule) => {
                return rule.func.call(this, rule, val.value) !== true
            }).take(1).defaultIfEmpty(null))
        setError$.subscribe((rule, val) => {
            this.updateProps(rule ? false : true, 'valid');
            this.updateProps(rule, 'error')
        });
    }

    addActiveListeners() {

        let elementName = this.props.name;
        if (this.activeRules.length === 0) {
            return;
        }

        let elementsToWatchForActive = _.map(this.activeRules, 'element');
        let valueChange$ = this.context.elementValue$;
        let valueIndex = this.context.elementValueIndex;
        valueChange$
            .filter(value => value.field !== elementName && elementsToWatchForActive.indexOf(value.field) > -1)
            // .do(value=>console.log(value, 'activeCheck'))
            .mergeMap(value => {
                return Rx.Observable.from(this.activeRules).filter(rule => {
                    return rule.func.call(this, {value: valueIndex[rule.element]}, rule) !== true
                }).mapTo(false).defaultIfEmpty(true)
            })
            .subscribe(e => {
                this.updateProps(e, 'active')
            })
    }

    addPropListeners() {

        let elementName = this.props.name;
        let {propRules} = this;
        if (propRules.length === 0) {
            return;
        }

        let groupedPropRules = _.groupBy(propRules, (e)=>e.prop);


        let elementsToWatchForActive = _.map(propRules, 'element');
        let valueChange$ = this.context.elementValue$;
        let valueIndex = this.context.elementValueIndex;

        valueChange$
            .filter(value => value.field !== elementName && value.type === 'update' && elementsToWatchForActive.indexOf(value.field) > -1)
            // .do(value=>console.log(value, 'activeCheck'))
            .subscribe(value=>{
                _.each(groupedPropRules, (rules, prop)=>{
                    let propValue =   _.reduce(rules, (memo, rule)=>{
                        return !memo && rule.func.call(this, {value: valueIndex[rule.element]}, rule) === true
                    }, false)
                    this.updateProps(this.props.getPropValue(prop,propValue), prop)
                })

            })
    }

    onChange(e) {
        this.updateValue(e.target.value, 'update');
    }

    getValue() {
        return this._value;
    }

    updateValue(value, type) {
        this.value$.next({field: this.props.name, type: type, value: value});
        this.updateProps(value, 'value');
    }

    updateProps(value, type) {
        this.props$.next({field: this.props.name, type: type, value: value});
    }

    getRestProps() {
        let props = _.omit(this.state, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'error', 'validations', 'activeRules', 'valid', 'serverValidation', '__shadowValue', 'register', 'exposeName', 'exposeSelection', 'serverValid', 'serverError');
        props.ref = 'inputElement';
        props.className = (props.className || '') + ' ' + 'form-control';
        return props;
    }

    getFormClasses() {
        let classArray = ['form-group'];
        classArray.push('element')
        classArray.push('element-type-' + this.props.type);
        classArray.push('element-' + this.props.name);
        if (this.state.errors) {
            classArray.push('has-error');
        }
        if(this.props.disabled){
            classArray.push('disabled')
        }
        return classArray;
    }

    renderElement() {
        let restProps = this.getRestProps();
        return <input  {...restProps} onChange={this.onChange.bind(this)}/>
    }

    getErrors() {
        return this.state.errors;
    }

    setSiblingValue(siblingName, value) {
        this.context.communication$.next({field: siblingName, type: 'elementValue', value: value});
    }


    renderElementWithWrapper() {
        let formClasses = this.getFormClasses();
        let elementProps = this.context.elementPropIndex[this.props.name];
        let error = this.state.error || this.state.serverError;
        return <fieldset className={formClasses.join(' ')}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            {this.renderElement()}
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {error ? <small className="text-danger">{error.message}</small> : '' }
        </fieldset>
    }

    render() {
        if (this.state.active) {
            return this.renderElementWithWrapper()
        } else {
            return null
        }
    }
}

RXFormElement.contextTypes = {
    elementProps$: PropTypes.object.isRequired,
    elementValue$: PropTypes.object.isRequired,
    communication$: PropTypes.object.isRequired,
    elementPropIndex: PropTypes.object.isRequired,
    elementValueIndex: PropTypes.object.isRequired,
}

RXFormElement.propTypes = {
    type: PropTypes.string.isRequired,
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
    serverValidation: PropTypes.object
}

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
    getPropValue:(prop, value)=>value,
    serverValidation: null
}

