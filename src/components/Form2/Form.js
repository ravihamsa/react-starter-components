/**
 * Created by ravi.hamsa on 3/25/17.
 */
import React, {PropTypes, Component} from "react";
import Rx from 'rxjs';
import _ from 'lodash';
import validatorMap from './validationRules';


let getRuleValue = function (item) {
    return {
        type: item.expr,
        value: item.value,
        length: item.length,
        func: validatorMap[item.expr],
        message: item.message || item.expr
    }
}


export default class Form2 extends Component {
    constructor(props) {
        super(props);
        this.value$ = new Rx.Subject();
        this.error$ = new Rx.Subject();
        this.valueIndex = {};
    }

    componentWillMount() {
        let read$ = this.value$.filter(e => e.type === 'read');
        let update$ = this.value$.filter(e => e.type === 'update');

        read$.merge(update$).subscribe(val => {
            this.valueIndex[val.field] = val.value;
        });

        update$.subscribe(val => {
            this.valueChangeHandler({[val.field]: val.value}, this.valueIndex);
        })
    }

    valueChangeHandler(changed, fullObject) {
        if (this.props.onValueChange) {
            this.props.onValueChange(changed, fullObject)
        }
    }

    getChildContext() {
        return {
            value$: this.value$,
            error$: this.error$
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
    value$: PropTypes.object.isRequired,
    error$: PropTypes.object.isRequired
}

let emptyArray = [];

export class Form2Element extends Component {

    constructor(props) {
        super(props);
        let {debounceTime, validations} = this.props;
        this.value$ = new Rx.Subject();
        this.error$ = new Rx.Subject();
        this.value$ = this.value$.debounceTime(debounceTime);
        this.state = {
            errors: emptyArray
        }
        this.validations = validations.map(function (rule, index) {
            return getRuleValue(rule);
        });

    }

    componentWillMount() {
        this.linkFormValueStore();
    }

    componentDidMount() {
        this.updateValue(this.refs.inputElement.value, 'read');
    }

    linkFormValueStore() {
        this.value$.subscribe(value => this.context.value$.next(value));
        let update$ = this.value$.filter(val => val.type === 'update');
        this.error$.subscribe(value => this.context.error$.next(value));
        let error$ = update$
            .do(() => this.state.errors !== emptyArray && this.setState({errors: emptyArray}))
            .mergeMap((val) => Rx.Observable.from(this.validations).filter((rule) => {
                return rule.func(rule, val.value) !== true
            }).take(1))
        error$.subscribe((rule, val) => {
            this.setState({errors: [rule]});
        });
    }

    onChange(e) {
        e.preventDefault();
        this.updateValue(e.target.value, 'update');
    }

    updateValue(value, type) {
        this.value$.next({field: this.props.name, type: type, value: value});
    }

    getRestProps() {
        let props = _.omit(this.props, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'validations');
        props.ref = 'inputElement'
        return props;
    }

    getFormClasses() {
        let classArray = ['form-group'];
        if (this.state.errors.length > 0) {
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
        let errors = this.getErrors();
        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
            {this.renderElement()}
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : '' }
        </fieldset>
    }

    render() {
        if (this.props.active) {
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
    value$: PropTypes.object.isRequired,
    error$: PropTypes.object.isRequired
}

Form2Element.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    showLabel: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    debounceTime: PropTypes.number.isRequired,
    validations: PropTypes.array
}

Form2Element.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input',
    showLabel: true,
    active: true,
    defaultValue: '',
    debounceTime: 0,
    validations: []
}

Select2.defaultProps = {
    ...Form2Element.defaultProps,
    defaultValue: '-1'
}

