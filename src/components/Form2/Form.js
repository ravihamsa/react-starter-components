/**
 * Created by ravi.hamsa on 3/25/17.
 */
import React, {PropTypes, Component} from "react";
import Rx from 'rxjs';
import _ from 'lodash';
import validatorMap from './validationRules';
import activeRulesMap from './activeRules';


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

let ensurePropertyIndex = (obj, prop) => {
    obj[prop] = obj[prop] || {};
}


export default class Form2 extends Component {
    constructor(props) {
        super(props);
        this.elementProps$ = new Rx.Subject();
        this.elementValue$ = new Rx.Subject();
        this.elementPropIndex = {};
        this.valueIndex = {};
    }

    componentWillMount() {
        let read$ = this.elementValue$.filter(e => e.type === 'read');
        let update$ = this.elementValue$.filter(e => e.type === 'update');
        let register$ = this.elementProps$.filter(e => e.type === 'register');
        let other$ = this.elementProps$.filter(e => e.type !== 'register');


        register$.subscribe(val => {
            console.log('register', val)
            ensurePropertyIndex(this.elementPropIndex, val.field);
        });

        other$.subscribe(val => {
            ensurePropertyIndex(this.elementPropIndex[val.field], val.type);
            this.elementPropIndex[val.field][val.type] = val.value;
        });

        read$.merge(update$).subscribe(val => {
            this.valueIndex[val.field] = val.value;
        })

        update$.subscribe(val => {
            this.valueChangeHandler({[val.field]: val.value}, this.valueIndex);
        })

        // this.elementProps$.subscribe(e=>console.log(e, 'elementProps$'))
    }

    valueChangeHandler(changed, fullObject) {
        // console.log(changed, fullObject);
        if (this.props.onValueChange) {
            this.props.onValueChange(changed, fullObject)
        }
    }

    getChildContext() {
        return {
            elementProps$: this.elementProps$,
            elementValue$: this.elementValue$,
            elementPropIndex: this.elementPropIndex,
            elementValueIndex: this.valueIndex,
        }
    }

    onSubmitHandler(e) {
        e.preventDefault();
    }

    render() {
        return <form onSubmit={this.onSubmitHandler.bind(this)} className={this.props.className}>
            {this.props.children}
        </form>
    }
}

Form2.childContextTypes = {
    elementProps$: PropTypes.object.isRequired,
    elementValue$: PropTypes.object.isRequired,
    elementPropIndex: PropTypes.object.isRequired,
    elementValueIndex: PropTypes.object.isRequired,
}

let emptyArray = [];

let propsList = ['active', 'error', 'disabled', 'valid', 'activeRules']

export class Form2Element extends Component {

    constructor(props) {
        super(props);
        let {debounceTime, validations, activeRules} = this.props;
        this.props$ = new Rx.Subject();
        this.value$ = new Rx.Subject().debounceTime(debounceTime);
        this.state = _.pick(this.props, propsList);
        this.validations = validations.map(function (rule, index) {
            return getValidationRule(rule);
        });
        this.activeRules = activeRules.map(rule => getActiveRule(rule));
    }

    componentDidMount() {

        this.props$.subscribe(value => this.context.elementProps$.next(value));
        this.value$.subscribe(value => this.context.elementValue$.next(value));
        this.addValidationListeners()
        this.addActiveListeners()
        this.propChangeListeners()
        this.updateProps(null, 'register');
        this.updateValue(this.refs.inputElement.value, 'read');
        _.each(propsList, (prop) => {
            this.updateProps(this.props[prop], prop)
        })
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

    addValidationListeners() {
        let validateRequest$ = this.value$.filter(val => val.type === 'update');
        let setError$ = validateRequest$
            .mergeMap((val) => Rx.Observable.from(this.validations).filter((rule) => {
                return rule.func(rule, val.value) !== true
            }).take(1).defaultIfEmpty(null))
        setError$.subscribe((rule, val) => {
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
                return Rx.Observable.from(this.activeRules).filter(rule=>{
                    return rule.func({value:valueIndex[rule.element]}, rule) !== true
                }).mapTo(false).defaultIfEmpty(true)
            })
            .subscribe(e => {
                this.updateProps(e, 'active')
            })
    }

    onChange(e) {
        e.preventDefault();
        this.updateValue(e.target.value, 'update');
    }

    updateValue(value, type) {
        this.value$.next({field: this.props.name, type: type, value: value});
    }

    updateProps(value, type) {
        this.props$.next({field: this.props.name, type: type, value: value});
    }

    getRestProps() {
        let props = _.omit(this.props, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'error', 'validations', 'activeRules', 'valid');
        props.ref = 'inputElement'
        return props;
    }

    getFormClasses() {
        let classArray = ['form-group'];
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

    renderElementWithWrapper() {
        let formClasses = this.getFormClasses();
        let elementProps = this.context.elementPropIndex[this.props.name];
        console.log(elementProps, 'elementProps');
        let error = this.state.error;
        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
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


export class Select2 extends Form2Element {
    renderElement() {
        let restProps = this.getRestProps();
        let options = this.props.options;
        return <select {...restProps} onChange={this.onChange.bind(this)}>
            <option value="-1">Select</option>
            {options.map(function (option, index) {
                return <option value={option.id} key={index}>{option.name}</option>
            }, this)}
        </select>
    }
}

Form2Element.contextTypes = {
    elementProps$: PropTypes.object.isRequired,
    elementValue$: PropTypes.object.isRequired,
    elementPropIndex: PropTypes.object.isRequired,
    elementValueIndex: PropTypes.object.isRequired,
}

Form2Element.propTypes = {
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
}

Form2Element.defaultProps = {
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
    activeRules: []
}

Select2.defaultProps = {
    ...Form2Element.defaultProps,
    defaultValue: '-1'
}

