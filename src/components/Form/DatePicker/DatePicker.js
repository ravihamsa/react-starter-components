/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormElement from '../FormElement';
import common from '../../common';
import Month from './Month';
import moment from 'moment';

const {InlinePopup, InlineButton, InlineBody} = common.InlinePopupGroup;

const inputFormat = 'DD/MM/YYYY';

class DatePicker extends FormElement {

    onDateSelect(value) {
        const name = this.props.name;
        /*this.context.valueStore.set({[name]: value});
        this.setState({defaultValue:value})
        this.refs.inputField.value = value;*/
        this.setValue(value);
        this.setState({
            defaultValue: value
        });
        // this.refs.inputField.value = value;
    }

    getFormattedDate(value) {
        if (value !== '') {
            return moment(value, inputFormat).format(this.props.displayFormat);
        } else {
            return value;
        }

    }

    getDefaultValue() {
        return this._changing ? (this.state.defaultValue) : (this.context.valueStore.get(this.props.name) || moment().format(inputFormat));
    }

    render() {

        const defaultValue = this.getDefaultValue();
        const displayValue = this.getFormattedDate(defaultValue);
        const formClasses = this.getFormClasses();
        const errors = this.getErrors();

        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            <InlinePopup disabled={this.props.disabled}>
                <InlineButton>
                    <div>
                        <input type={this.props.type} className="form-control" name={this.props.name}
                            placeholder={this.props.placeholder} onChange={this.onChange.bind(this)}
                            value={displayValue}
                            readOnly="true" ref={inputField => this.ref_inputField = inputField}/>
                        <span className="calendar icon"></span>
                    </div>
                </InlineButton>
                <InlineBody>
                    <Month onDateSelect={this.onDateSelect.bind(this)} selectedDate={defaultValue}
                        displayDate={defaultValue} minDate={this.props.minDate} maxDate={this.props.maxDate}></Month>
                </InlineBody>
            </InlinePopup>
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : ''}
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : ''}
        </fieldset>;
    }
}


export default DatePicker;

DatePicker.defaultProps = {
    ...FormElement.defaultProps,
    type: 'date-picker',
    displayFormat: inputFormat,
    minDate: moment().format(inputFormat),
    maxDate: moment().add(10, 'years').format(inputFormat)
};
