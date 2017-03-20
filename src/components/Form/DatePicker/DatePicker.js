/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {PropTypes, Component} from "react";
import FormElement from '../FormElement';
import common from '../../common';
import Month from './Month';
const {InlinePopup, InlineButton, InlineBody} = common.InlinePopupGroup;


class DatePicker extends FormElement {

    onDateSelect(value){
        let name = this.props.name;
        this.context.valueStore.set({[name]: value});
        this.setState({defaultValue:value})
        this.refs.inputField.value = value;
    }

    closePopup() {
        this.refs['month'].props.closePopup();
    }

    render() {

        let defaultValue = this.getDefaultValue();
        let formClasses = this.getFormClasses();
        let errors = this.getErrors();

        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
            <InlinePopup>
                   <InlineButton>
                       <input type={this.props.type} className="form-control" name={this.props.name}
                              placeholder={this.props.placeholder} onChange={this.onChange.bind(this)} defaultValue={defaultValue}
                              readOnly="true" ref="inputField"/>
                   </InlineButton>
                    <InlineBody ref="month">
                        <Month onDateSelect={this.onDateSelect.bind(this)} closePopup={this.closePopup.bind(this)} selectedDate={defaultValue}></Month>
                    </InlineBody>
            </InlinePopup>
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : '' }
        </fieldset>
    }
}


export default DatePicker;
