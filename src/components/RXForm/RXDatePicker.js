import React from 'react';
import RXFormElement from './RXFormElement';
import Month from '../common/Month';
import moment from 'moment';
import _ from 'lodash';

import { InlineModal, InlineModalBody, InlineModalButton } from '../common/InlineModalGroup';

const inputFormat = 'DD/MM/YYYY';

export default class RXDatePicker extends RXFormElement {

    onChange(selectedDate) {
        this.updateValue(selectedDate, 'update');
    }

    getRestProps() {
        const props = _.omit(this.state, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'error',
            'validations', 'activeRules', 'valid', 'serverValidation', '__shadowValue', 'register', 'clear',
            'exposeName', 'exposeSelection', 'serverValid', 'serverError', 'displayDate', 'selectedDate');
        props.className = (props.className || '') + ' form-control';
        return props;
    }

    getFormattedDate(value) {
        if (value !== '') {
            return moment(value, inputFormat).format(this.props.displayFormat);
        } else {
            return value;
        }
    }

    closePopup() {
        this.ref_inlineModal.closePopup();
    }

    renderElement() {
        const restProps = this.getRestProps();
        const value = restProps.value;
        restProps.value = this.getFormattedDate(value);
        const {valign = 'top', bodyPosition, bodyClassName = ''} = this.props;
        return <InlineModal ref={inlineModal => this.ref_inlineModal = inlineModal}>
            <InlineModalButton>
                <div><input  {...restProps}/>
                    <span className="calendar icon"></span></div>
            </InlineModalButton>
            <InlineModalBody valign={valign} bodyPosition={bodyPosition} className={bodyClassName}>
                <Month onDateSelect={this.onChange.bind(this)} selectedDate={value}
                        displayDate={value}
                        minDate={this.props.minDate} maxDate={this.props.maxDate}
                        closePopup={this.closePopup.bind(this)}></Month>
            </InlineModalBody>
        </InlineModal>
    }
}

RXDatePicker.defaultProps = {
    ...RXFormElement.defaultProps,
    type: 'date-picker',
    bodyPosition: 'down',
    displayFormat: inputFormat,
    minDate: moment().format(inputFormat),
    selectedDate: moment().format(inputFormat),
    displayDate: moment().format(inputFormat),
    maxDate: moment().add(10, 'years').format(inputFormat)
};