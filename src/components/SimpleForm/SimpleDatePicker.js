import React from 'react';
import SimpleElement from './SimpleElement';
import Month from '../common/Month';
import {InlineModal, InlineModalBody, InlineModalButton} from '../common/InlineModalGroup';
import moment from 'moment';
import util from '../../core/utils';
import _ from 'lodash';


export default class SimpleDatePicker extends SimpleElement {

    onChange(selectedDate) {
        this.updateValue(selectedDate);
    }

    getDefaultValue(){
        const inputFormat = util.getStarterConfig('dateFormat');
        return  moment().format(inputFormat);
    }

    applyValue(value){
        if (value !== undefined && value !== ''){
            this.updateValue(value);
        } else {
            this.updateValue(this.getDefaultValue());
        }
    }

    closePopup() {
        if (this.ref_modal){
            this.ref_modal.closePopup();
        }
    }

    render() {
        const props = this.filterDomProps(this.props);
	    const inputFormat = util.getStarterConfig('dateFormat');
        props.className = 'form-control';
	    props.readOnly = true;
	    props.value = props.value || this.getDefaultValue();
        const className = this.getClassNames();
        const {valign, bodyPosition, minDate = moment().format(inputFormat), maxDate = moment().add(10, 'years').format(inputFormat)} = this.props;

        return <div className={className}>
            <InlineModal ref={modal => this.ref_modal = modal}>
                <InlineModalButton>
                    <div><span {...props}>{props.value}</span>
                        <span className="calendar icon"></span></div>
                </InlineModalButton>
                <InlineModalBody valign={valign} bodyPosition={bodyPosition}>
                    <Month onDateSelect={this.onChange.bind(this)} selectedDate={props.value}
					       displayDate={props.value}
					       minDate={minDate} maxDate={maxDate}
					       closePopup={this.closePopup.bind(this)}></Month>
                </InlineModalBody>
            </InlineModal>
        </div>;
    }
}

SimpleDatePicker.defaultProps = {
    ...SimpleElement.defaultProps,
    type: 'date-picker',
    bodyPosition: 'down',
    valign: 'bottom'
};