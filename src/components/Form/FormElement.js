/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes, Component} from "react";
import {_} from '../../core/utils'
import {Rx} from '../../core/rxutils'


let validatorMap = {
    'req': function (rule, value) {
        return !_.isEmpty(value);
    },
    'selReq': function (rule, value) {
        return value !== '-1';
    },
    'digits': function (rule, value) {
        return (/^\d{5}$/).test(value);
    },
    'alphanumeric': function (rule, value) {
        var ck_alphaNumeric = /^\w+$/;
        return ck_alphaNumeric.test(value);
    },
    'number': function (rule, value) {
        if (value === undefined) {
            return true;
        }
        var numberVal = +value;
        return numberVal === numberVal;
    },
    'email': function (rule, value) {
        var ck_email = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\\+]+)*@[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\+]+)*(\.[A-Za-z]{2,})$/i;
        return ck_email.test($.trim(value));
    },
    'minlen': function (rule, value) {
        var min = rule.length;
        return $.trim(String(value)).length >= min;
    },
    'maxlen': function (rule, value) {
        var max = rule.length;
        return $.trim(String(value)).length <= max;
    },
    'lt': function (rule, value) {
        var target = parseFloat(rule.value);
        var curvalue = parseFloat(value);
        return curvalue < target;
    },
    'gt': function (rule, value) {
        var target = parseFloat(rule.value);
        var curvalue = parseFloat(value);
        return curvalue > target;
    },
    'eq': function (rule, value) {
        return rule.value === value;
    },
    'neq': function (rule, value) {
        return rule.value !== value;
    },
    'url': function (rule, value) {
        if (value === '') {
            return true;
        }
        var ck_url = /(http|https|market):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
        return ck_url.test($.trim(value));
    },
    'emaillist': function (rule, value) {
        var emails = value.split(',');
        var ck_email = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        for (var i = 0; i < emails.length; i++) {
            if ($.trim(emails[i]) !== '' && !ck_email.test($.trim(emails[i]))) {
                return false;
            }
        }
        return true;
    },
    'function': function (rule, value) {
        var func = rule.func;
        return func.call(this, value, rule);
    }
}

let getRuleValue = function (item) {
    return {
        type: item.expr,
        value: item.value,
        element: item.element,
        func: item.expr === 'function' ? item.func : validatorMap[item.expr],
        message: item.message || item.expr
    }
}

let getPropRule = (item) => {
    return {
        type: item.expr,
        element: item.element,
        prop: item.prop,
        value: item.value,
        valueFunc:item.valueFunc || _.identity,
        func: item.expr === 'function' ? item.func : activeRulesMap[item.expr]
    }
}

class FormElement extends Component {

    constructor() {
        super(...arguments);
        let {validations = [], propRules=[]} = this.props
        this.change$ = new Rx.Subject();
        this._changing = false;
        this.state = {
            errors: []
        }
        this.validations = _.filter(validations, item => item.element === undefined).map(function (rule, index) {
            return getRuleValue(rule);
        });

        this.siblingValidations = _.filter(validations, item => item.element !== undefined).map(function (rule, index) {
            return getRuleValue(rule);
        });

        this.propRules = propRules.map(function (rule, index) {
            return getRuleValue(rule);
        });
    }

    setState(arg1, arg2){
        if(this.props.name === 'stateIds'){
            //console.log(arg1, arg2, 'stateIds')
        }
        super.setState(arg1, arg2);
    }

    subscribeToChange() {
        let debounceTime = this.props.debounceTime;
        if (debounceTime !== undefined) {
            this.changeSubscription = this.change$.debounceTime(debounceTime).subscribe((value) => {
                this.updateValueStore(value);
                this._changing = false;
            })
        } else {
            this.changeSubscription = this.change$.subscribe((value) => this.updateValueStore(value))
        }

    }

    subscribeToValidation() {
        let siblingsToBeValidated = this.siblingValidations;
        if (siblingsToBeValidated.length === 0) {
            return;
        }
        let self = this;
        this.validationSubscription = this.context.valueStore.on('change', (changed, fullObject) => {
            self.validateSiblingsOnChange(changed);
            self.handlePropRules(changed, fullObject);
        })
    }


    onChange(event) {
        this.setValue(this.getValueFromNode(event.target));
    }

    setValue(value, skipValidate) {
        let name = this.props.name;
        let toSet = {[name]: value};

        if (this.props.options) {
            var multiSelect = this.multiSelect;
            var selectedOption = multiSelect ? _.filter(this.props.options, (item) => value.indexOf(item.id) > -1) : this.props.options.find((item) => item.id === value);
            this.context.valueDetailStore.set({[name]: selectedOption});
            if (this.props.exposeSelection) {
                toSet[name + '_selection'] = selectedOption
            }
            if (this.props.exposeName && selectedOption) {
                toSet[name + '_name'] = multiSelect ? _.map(selectedOption, 'name') : selectedOption.name
            }
        }

        if (value === null) {
            if (this.props.exposeSelection) {
                toSet[name + '_selection'] = undefined
            }
            if (this.props.exposeName) {
                toSet[name + '_name'] = undefined
            }
        }
        // this.updateValueStore(toSet);
        // this.context.valueStore.set(toSet);
        this._changing = true;
        this.change$.next(toSet);
        if (skipValidate !== true) {
            this.validateValue(value);
        }
        this.setState({defaultValue: value})
    }

    updateValueStore(toSet) {
        this.context.valueStore.set(toSet);
    }

    validateSiblingsOnChange(changed){
        let toValidateIds = this.siblingValidations.map((item) => item.element);
        let changedKey = _.keys(changed)[0];
        if (toValidateIds.indexOf(changedKey) > -1) {
            let errors = this.siblingValidations.filter((item) => {
                return item.element === changedKey && item.func.call(this, item, changed[changedKey]) === false;
            })
            this.context.errorStore.set({[changedKey]: errors})
            this.setState({siblingErrors: errors})
        }
    }

    handlePropRules(changed, fullObjecdt){
        let toValidateIds = this.propRules.map((item) => item.element);
        let changedKey = _.keys(changed)[0];
        if (toValidateIds.indexOf(changedKey) > -1) {
            let propValue =   _.reduce(this.propRules, (memo, rule)=>{
                return !memo && rule.func.call(this, {value: fullObjecdt[rule.element]}, rule) === true
            }, false)
            //console.log(propValue);
        }
    }

    validateSiblings(){
        let changedKey = this.props.name;
        let valueStore =  this.context.valueStore;
        let errors = this.siblingValidations.filter((item) => {
            return item.func.call(this, item, valueStore.get(item.element)) === false;
        })
        this.context.errorStore.set({[changedKey]: errors})
        this.setState({errors: errors})
    }

    validateValue(value) {
        let name = this.props.name;
        let errors = this.validations.filter((item) => {
            return item.func.call(this, item, value) === false;
        })
        this.context.errorStore.set({[name]: errors})
        this.setState({errors: errors})
        if(errors.length === 0){
            this.validateSiblings();
        }
    }

    getValueFromNode(node) {
        return node.value;
    }

    componentWillMount() {
        let self = this;
        let name = self.props.name;
        let valueStoreValue = this.context.valueStore.get(this.props.name);
        if (valueStoreValue === undefined) {
            self.context.valueStore.set({[name]: self.props.defaultValue})
        }
        self.context.elementIndex[name] = self;
        this.unsubscribeErrorStore = this.context.errorStore.on('forceValidate', function () {
            self.validateValue(self.context.valueStore.get(name));
        })
        this.subscribeToChange();
        this.subscribeToValidation();
    }

    componentWillUnmount() {
        if (this.unsubscribeErrorStore) {
            this.unsubscribeErrorStore();
        }
        if (this.validationSubscription) {
            this.validationSubscription();
        }
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe()
        }
    }

    getDefaultValue() {
        return this._changing ? this.state.defaultValue : this.context.valueStore.get(this.props.name);
    }

    getFormClasses() {
        let classArray = ['form-group'];
        classArray.push('element')
        classArray.push('element-type-' + this.props.type);
        classArray.push('element-' + this.props.name);
        let errors = this.getErrors();
        if (errors.length > 0) {
            classArray.push('has-error');
        }
        if(this.props.disabled){
            classArray.push('disabled')
        }
        return classArray.join(' ')
    }

    getErrors() {
        let errors = this.state && this.state.errors || [];
        let siblingErrors = this.state && this.state.siblingErrors || [];
        return errors.concat(siblingErrors);
    }

    getSiblingValue(siblingName) {
        return this.context.valueStore.get(siblingName)
    }

}

FormElement.contextTypes = {
    valueStore: PropTypes.object.isRequired,
    valueDetailStore: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
    elementIndex: PropTypes.object.isRequired,
}

FormElement.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    options: PropTypes.array,
    exposeSelection: PropTypes.bool,
    exposeName: PropTypes.bool,
    showLabel: PropTypes.bool.isRequired
}

FormElement.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input',
    showLabel: true,
    exposeSelection: false,
    exposeName: false,
}


export default FormElement;
