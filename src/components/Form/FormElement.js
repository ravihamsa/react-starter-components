/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes, Component} from "react";
import _ from 'lodash';



let validatorMap = {
    'req': function(rule, value) {
        return !_.isEmpty(value);
    },
    'digits': function(rule, value) {
        return (/^\d{5}$/).test(value);
    },
    'alphanumeric': function(rule, value) {
        var ck_alphaNumeric = /^\w+$/;
        return ck_alphaNumeric.test(value);
    },
    'number': function(rule, value) {
        if (value === undefined) {
            return true;
        }
        var numberVal = +value;
        return numberVal === numberVal;
    },
    'email': function(rule, value) {
        var ck_email = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\\+]+)*@[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\+]+)*(\.[A-Za-z]{2,})$/i;
        return ck_email.test($.trim(value));
    },
    'minlen': function(rule, value) {
        var min = rule.length;
        return $.trim(String(value)).length >= min;
    },
    'maxlen': function(rule, value) {
        var max = rule.length;
        return $.trim(String(value)).length <= max;
    },
    'lt': function(rule, value) {
        var target = parseFloat(rule.value);
        var curvalue = parseFloat(value);
        return curvalue < target;
    },
    'gt': function(rule, value) {
        var target = parseFloat(rule.value);
        var curvalue = parseFloat(value);
        return curvalue > target;
    },
    'eq': function(rule, value) {
        return rule.value === value;
    },
    'neq': function(rule, value) {
        return rule.value !== value;
    },
    'url': function(rule, value) {
        if (value === '') {
            return true;
        }
        var ck_url = /(http|https|market):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
        return ck_url.test($.trim(value));
    },
    'emaillist': function(rule, value) {
        var emails = value.split(',');
        var ck_email = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        for (var i = 0; i < emails.length; i++) {
            if ($.trim(emails[i]) !== '' && !ck_email.test($.trim(emails[i]))) {
                return false;
            }
        }
        return true;
    },
    'function': function(rule, value) {
        var func = rule.func;
        return func.call(this, value, rule);
    }
}

let getRuleValue = function(type){
    return  {
        type:type,
        func:validatorMap[type]
    }
}

class FormElement extends Component {

    onChange(event) {
        let name = this.props.name;
        let value = this.getValueFromNode(event.target);
        this.context.valueStore.set({[name]: value});
        if(this.props.options){
            this.context.valueDetailStore.set({[name]: this.props.options.find((item)=> item.id===value)})
        }
        let errors = this.validateValue(value);
        this.context.errorStore.set({[name]:errors[0]})
        this.setState({defaultValue:value, error:errors[0]})
    }

    validateValue(value){
        let name = this.props.name;
        let errors = this.validations.filter(function(item){
            return item.func(value) === false;
        })
        return errors;
    }

    getValueFromNode(node){
        return node.value;
    }

    componentWillMount(){
        let validations = this.props.validations || [];
        this.validations = validations.forEach(function(rule, index){
            return getRuleValue(rule);
        });

        if(this.props.defaultValue){
            this.context.valueStore.set({[this.props.name]: this.props.defaultValue})
        }
    }

    getDefaultValue(){
        return this.context.valueStore.get(this.props.name);
    }

    getFormClasses(){
        let classArray = ['form-group'];
        if(this.props.errors !== undefined){
            classArray.push('has-error');
        }
        return classArray.join(' ')
    }
}

FormElement.contextTypes = {
    valueStore: PropTypes.object.isRequired,
    valueDetailStore: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
}

FormElement.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue:PropTypes.string,
    options:PropTypes.array,
    showLabel:PropTypes.bool.isRequired
}

FormElement.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input',
    showLabel:true
}


export default FormElement;