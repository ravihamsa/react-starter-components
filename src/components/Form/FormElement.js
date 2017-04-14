/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes, Component} from "react";
import _ from 'lodash';
import Rx from 'rxjs';


let validatorMap = {
    'req': function(rule, value) {
        return !_.isEmpty(value);
    },
    'selReq': function(rule, value){
        return value !== '-1';
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

let getRuleValue = function(item){
    return  {
        type:item.expr,
        value:item.value,
        func:item.expr === 'function' ? item.func : validatorMap[item.expr],
        message:item.message || item.expr
    }
}

class FormElement extends Component {

    constructor(){
        super(...arguments);
        let validations = this.props.validations || [];
        this.change$ = new Rx.Subject();
        this._changing = false;
        this.state= {
            errors:[]
        }
        this.validations = validations.map(function(rule, index){
            return getRuleValue(rule);
        });

    }

    subscribeToChange(){
        let debounceTime = this.props.debounceTime;
        if(debounceTime !==undefined){
            this.changeSubscription = this.change$.debounceTime(debounceTime).subscribe((value)=>{
                this.updateValueStore(value);
                this._changing = false;
            })
        }else{
            this.changeSubscription = this.change$.subscribe((value)=>this.updateValueStore(value))
        }

    }

    onChange(event) {
        this.setValue(this.getValueFromNode(event.target));
    }

    setValue(value, skipValidate){
        let name = this.props.name;
        let toSet = {[name]: value};

        if(this.props.options){
            var multiSelect = this.multiSelect;
            var selectedOption =  multiSelect ? _.filter(this.props.options,(item)=> value.indexOf(item.id)>-1) : this.props.options.find((item)=> item.id===value);
            this.context.valueDetailStore.set({[name]: selectedOption});
            if(this.props.exposeSelection){
                toSet[name + '_selection'] = selectedOption
            }
            if(this.props.exposeName && selectedOption){
                toSet[name + '_name'] = multiSelect ? _.map(selectedOption, 'name') : selectedOption.name
            }
        }

        if(value === null){
            if(this.props.exposeSelection){
                toSet[name + '_selection'] = undefined
            }
            if(this.props.exposeName){
                toSet[name + '_name'] = undefined
            }
        }
        // this.updateValueStore(toSet);
        // this.context.valueStore.set(toSet);
        this._changing = true;
        this.change$.next(toSet);
        if(skipValidate !== true){
            this.validateValue(value);
        }
        this.setState({defaultValue:value})
    }

    updateValueStore(toSet){
        this.context.valueStore.set(toSet);
    }

    validateValue(value){
        let name = this.props.name;
        let errors = this.validations.filter((item)=>{
            return item.func.call(this,item, value) === false;
        })
        this.context.errorStore.set({[name]:errors})
        this.setState({errors:errors})
    }

    getValueFromNode(node){
        return node.value;
    }

    componentWillMount(){
        let self = this;
        let name = self.props.name;
        let valueStoreValue = this.context.valueStore.get(this.props.name);
        if(valueStoreValue === undefined){
            self.context.valueStore.set({[name]: self.props.defaultValue})
        }
        self.context.elementIndex[name]=self;
        this.unsubscribeErrorStore = this.context.errorStore.on('forceValidate', function(){
            self.validateValue(self.context.valueStore.get(name));
        })
        this.subscribeToChange();
    }

    componentWillUnmount(){
        if(this.unsubscribeErrorStore){
            this.unsubscribeErrorStore();
        }
        if(this.changeSubscription){
            this.changeSubscription.unsubscribe()
        }
    }

    getDefaultValue(){
        return this._changing ?  this.state.defaultValue : this.context.valueStore.get(this.props.name);
    }

    getFormClasses(){
        let classArray = ['form-group'];
        classArray.push('element')
        classArray.push('element-type-'+this.props.type);
        classArray.push('element-'+this.props.name);
        let errors = this.getErrors();
        if(errors.length > 0){
            classArray.push('has-error');
        }
        return classArray.join(' ')
    }

    getErrors (){
        let errors = this.state && this.state.errors || [];
        return errors;
    }

    getSiblingValue(siblingName){
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
    defaultValue:PropTypes.string,
    options:PropTypes.array,
    exposeSelection:PropTypes.bool,
    exposeName:PropTypes.bool,
    showLabel:PropTypes.bool.isRequired
}

FormElement.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input',
    showLabel:true,
    exposeSelection:false,
    exposeName:false,
}


export default FormElement;
