/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {PropTypes, Component} from "react";
import Rx from 'rxjs';
import _ from 'lodash';
import validatorMap from './validationRules';
import activeRulesMap from './activeRules';
import dataLoader from '../../core/dataLoader';

let getValidationRule = function (item) {
    return {
        type: item.expr,
        value: item.value,
        length: item.length,
        func: validatorMap[item.expr],
        message: item.message || item.expr
    }
}

let getActiveRule = (item) => {
    return {
        type: item.expr,
        element: item.element,
        prop: item.prop || 'update',
        value: item.value,
        func: activeRulesMap[item.expr]
    }
}

let getServerValidationRule = function (rule) {
    return {
        requestId: rule.requestId,
        getParams: rule.getParams || _.identity
    }
}

let propsList = ['active', 'error', 'disabled', 'valid', 'defaultValue', '__shadowValue']

export default class RXFormElement extends Component {

    constructor(props) {
        super(props);
        let {debounceTime, validations, activeRules} = this.props;
        this.props$ = new Rx.Subject();
        this.talkToForm$ = new Rx.Subject();
        this.value$ = new Rx.Subject().debounceTime(debounceTime);
        this.selection$ = new Rx.Subject();
        this.state = _.pick(this.props, propsList);
        this._value = this.props.defaultValue;
        this.validations = validations.map(rule => getValidationRule(rule));
        this.activeRules = activeRules.map(rule => getActiveRule(rule));
    }

    componentWillMount() {

        let groupedProps$ = this.props$/*.filter(x=>x.type !== '__shadowValue')*/.groupBy(x => x.type + '--' + x.field);
        groupedProps$.flatMap(group => {
            return group.distinctUntilChanged((a, b) => {
                return a.value === b.value
            });
        }).subscribe(value => this.context.elementProps$.next(value))


        this.selection$.groupBy(x => x.type + '--' + x.field).flatMap(group => {
            return group.distinctUntilChanged((a, b) => {
                return a.value === b.value
            });
        }).subscribe(value => {
            return this.context.elementValue$.next(value)
        });

        this.value$.distinctUntilChanged((a, b) => {
            return a.value === b.value
        }).subscribe(value => {
            return this.context.elementValue$.next(value)
        });

        this.addValidationListeners()
        this.addServerValidationListeners()
        this.addActiveListeners()
        this.addCommunicationListeners();
        this.propChangeListeners()
        this.updateProps(null, 'register');
        this.readInputValue();
        _.each(propsList, (prop) => {
            this.updateProps(this.props[prop], prop)
        })
    }

    readInputValue() {
        this.updateValue(this.props.defaultValue, 'read');
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
            this.setIfNotEqualState(this.context.elementPropIndex[this.props.name])
        });
    }

    addCommunicationListeners(){
        let setSibling$ =  this.context.communication$.filter(val=>val.type ==='elementValue' && val.field === this.props.name);
        setSibling$.subscribe((val)=>{
            this.updateValue(val.value, 'update');
        })
    }

    addServerValidationListeners() {

        if (this.props.serverValidation) {
            let validateRequest$ = this.value$.filter(val => val.type === 'update')
                .debounceTime(400)
                .filter(() => this.state.valid);
            let serverValidation = getServerValidationRule(this.props.serverValidation);
            let setError$ = validateRequest$.flatMap((val) => {
                return Rx.Observable.fromPromise(dataLoader.getRequestDef(serverValidation.requestId, serverValidation.getParams(val, this.context.elementValueIndex)))
            }).combineLatest().defaultIfEmpty(null)
            setError$.subscribe((resp) => {
                this.updateProps(resp[0], 'error')
            }, (resp) => {
                this.updateProps(resp[0], 'error')
            });
        }

    }

    addValidationListeners() {
        let forceValidate$ = this.context.communication$.filter(val => val.type === 'validate');
        let validateRequest$ = this.value$.filter(val => val.type === 'update').merge(this.context.communication$);
        let setError$ = validateRequest$
            .mergeMap((val) => Rx.Observable.from(this.validations).filter((rule) => {
                return rule.func(rule, val.value) !== true
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
            .mergeMap(value => {
                return Rx.Observable.from(this.activeRules).filter(rule => {
                    return rule.func({value: valueIndex[rule.element]}, rule) !== true
                }).mapTo(false).defaultIfEmpty(true)
            })
            .subscribe(e => {
                this.updateProps(e, 'active')
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
        this.updateProps(value, '__shadowValue');
    }

    updateProps(value, type) {
        this.props$.next({field: this.props.name, type: type, value: value});
    }

    getRestProps() {
        let props = _.omit(this.props, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'error', 'validations', 'activeRules', 'valid', 'serverValidation');
        props.ref = 'inputElement';
        props.className = (props.className||'') + ' '+'form-control';
        return props;
    }

    getFormClasses() {
        let classArray = ['form-group'];
        classArray.push('element')
        classArray.push('element-type-'+this.props.type);
        classArray.push('element-'+this.props.name);
        if (this.state.errors) {
            classArray.push('has-error');
        }
        return classArray.join(' ')
    }

    renderElement() {
        let restProps = this.getRestProps();
        return <input  {...restProps} onChange={this.onChange.bind(this)}/>
    }

    getErrors() {
        return this.state.errors;
    }
    setSiblingValue(siblingName, value){
        this.context.communication$.next({field:siblingName, type:'elementValue', value:value});
    }


    renderElementWithWrapper() {
        let formClasses = this.getFormClasses();
        let elementProps = this.context.elementPropIndex[this.props.name];
        let error = this.state.error;
        return <fieldset className={formClasses}>
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
    defaultValue: PropTypes.string.isRequired,
    showLabel: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
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
    showLabel: true,
    active: true,
    disabled: false,
    valid: true,
    defaultValue: '',
    debounceTime: 0,
    error: null,
    validations: [],
    activeRules: [],
    serverValidation: null
}
