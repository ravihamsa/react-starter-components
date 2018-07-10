import React from 'react';
import RXFormElement from './RXFormElement';
import Month from '../common/Month';
import {InlineModal, InlineModalButton, InlineModalBody} from '../common/InlineModalGroup';
import moment from 'moment';
import util from '../../core/utils';
import RXDatePicker from './RXDatePicker';
const dateRangeSplitter = '<=>';

export default class RXDateRangePicker extends RXFormElement {

    getDefaultDate(){
        const {rangeDuration, rangeUnit} = this.props;
        const inputFormat = util.getStarterConfig('dateFormat');
        return moment().format(inputFormat) + dateRangeSplitter + moment().add(rangeDuration, rangeUnit).format(inputFormat);
    }

    onChange(dateType, selectedDate) {
        const value = this.state.value || this.getDefaultDate();
        const valueArr = value.split(dateRangeSplitter);
        if (dateType === 'from') {
            valueArr[0] = selectedDate;
        } else if (dateType === 'to') {
            valueArr[1] = selectedDate;
        }
        this.updateValue(valueArr.join(dateRangeSplitter), 'update');
    }

    closePopup(dateType) {
        if (this['ref_modal_' + dateType]) {
            this['ref_modal_' + dateType].closePopup();
        }
    }

    renderElement() {
        const props = this.filterDomProps(this.props);
        const inputFormat = util.getStarterConfig('dateFormat');
        props.className = 'form-control';
        props.readOnly = true;
        props.value = this.state.value || this.getDefaultDate();
        const valueArr =  props.value.split(dateRangeSplitter);
        const {valign, bodyPosition, bodyClassName = '', minDate = moment().format(inputFormat), maxDate = moment().add(10, 'years').format(inputFormat)} = this.props;

        return <div>
            <InlineModal ref={modal => this.ref_modal_from = modal}>
                <InlineModalButton>
                    <div><span {...props}>{valueArr[0]}</span>
                        <span className="calendar icon"></span></div>
                </InlineModalButton>
                <InlineModalBody valign={valign} bodyPosition={bodyPosition} className={bodyClassName}>
                    <Month onDateSelect={this.onChange.bind(this, 'from')} selectedDate={valueArr[0]}
					       displayDate={valueArr[0]}
					       minDate={minDate} maxDate={valueArr[1]}
					       closePopup={this.closePopup.bind(this, 'from')}></Month>
                </InlineModalBody>
            </InlineModal>
            <InlineModal ref={modal => this.ref_modal_to = modal}>
                <InlineModalButton>
                    <div><span {...props}>{valueArr[1]}</span>
                        <span className="calendar icon"></span></div>
                </InlineModalButton>
                <InlineModalBody valign={valign} bodyPosition={bodyPosition} className={bodyClassName}>
                    <Month onDateSelect={this.onChange.bind(this, 'to')} selectedDate={valueArr[1]}
					       displayDate={valueArr[1]}
					       minDate={valueArr[0]} maxDate={maxDate}
					       closePopup={this.closePopup.bind(this, 'to')}></Month>
                </InlineModalBody>
            </InlineModal>
        </div>;
    }
}



RXDateRangePicker.defaultProps = {
    ...RXFormElement.defaultProps,
    type: 'date-picker',
    bodyPosition: 'down',
    rangeDuration:1,
    rangeUnit:'month'
};