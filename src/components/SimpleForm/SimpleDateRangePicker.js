import React from 'react';
import SimpleElement from './SimpleElement';
import Month from '../Form/DatePicker/Month';
import {InlineModal, InlineModalBody, InlineModalButton} from '../common/InlineModalGroup';
import moment from 'moment';
import util from '../../core/utils';
const dateRangeSplitter = '<=>';

export default class SimpleDatePicker extends SimpleElement {

	getDefaultDate(){
		const inputFormat = util.getStarterConfig('dateFormat');
		return moment().format(inputFormat) + dateRangeSplitter + moment().format(inputFormat);
	}

    onChange(dateType, selectedDate) {
        const value = this.props.value || this.getDefaultDate();
    	const valueArr = value.split(dateRangeSplitter);
        if (dateType === 'from') {
	        valueArr[0] = selectedDate;
        } else if (dateType === 'to') {
	        valueArr[1] = selectedDate;
        }
        this.updateValue(valueArr.join(dateRangeSplitter));
    }

    closePopup(dateType) {
        if (this['ref_modal_' + dateType]) {
	        this['ref_modal_' + dateType].closePopup();
        }
    }

    render() {
        const props = this.filterDomProps(this.props);
        const inputFormat = util.getStarterConfig('dateFormat');
        props.className = 'form-control';
        props.readOnly = true;
        props.value = props.value || this.getDefaultDate();
        const valueArr =  props.value.split(dateRangeSplitter);
        const className = this.getClassNames();
        const {valign, bodyPosition, minDate = moment().format(inputFormat), maxDate = moment().add(10, 'years').format(inputFormat)} = this.props;

        return <div className={className}>
            <InlineModal ref={modal => this.ref_modal_from = modal}>
                <InlineModalButton>
                    <div><span {...props}>{valueArr[0]}</span>
                        <span className="calendar icon"></span></div>
                </InlineModalButton>
                <InlineModalBody valign={valign} bodyPosition={bodyPosition}>
                    <Month onDateSelect={this.onChange.bind(this, 'from')} selectedDate={valueArr[0]}
					       displayDate={valueArr[0]}
					       minDate={minDate} maxDate={maxDate}
					       closePopup={this.closePopup.bind(this, 'from')}></Month>
                </InlineModalBody>
            </InlineModal>
            <InlineModal ref={modal => this.ref_modal_to = modal}>
                <InlineModalButton>
                    <div><span {...props}>{valueArr[1]}</span>
                        <span className="calendar icon"></span></div>
                </InlineModalButton>
                <InlineModalBody valign={valign} bodyPosition={bodyPosition}>
                    <Month onDateSelect={this.onChange.bind(this, 'to')} selectedDate={valueArr[1]}
					       displayDate={valueArr[1]}
					       minDate={minDate} maxDate={maxDate}
					       closePopup={this.closePopup.bind(this, 'to')}></Month>
                </InlineModalBody>
            </InlineModal>
        </div>;
    }
}

SimpleDatePicker.defaultProps = {
    ...SimpleElement.defaultProps,
    type: 'date-range-picker',
    bodyPosition: 'down',
    valign: 'bottom'
};