import RXFormElement from './RXFormElement';
import Month from '../Form/DatePicker/Month';
import InlinePopupGroup from '../common/InlinePopupGroup';
import moment from 'moment';

const {InlinePopup, InlineButton, InlineBody} = InlinePopupGroup;

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
    closePopup(){

    }

    renderElement() {
        const restProps = this.getRestProps();
        const value = restProps.value;
        restProps.value = this.getFormattedDate(value);
        return <div>
            <InlinePopup>
                <InlineButton>
                    <div><input  {...restProps}/>
                        <span className="calendar icon"></span></div>
                </InlineButton>
                <InlineBody>
                    <Month onDateSelect={this.onChange.bind(this)} selectedDate={value}
                           displayDate={value}
                           minDate={this.props.minDate} maxDate={this.props.maxDate}
                           closePopup={this.closePopup.bind(this)}></Month>
                </InlineBody>
            </InlinePopup>
        </div>
    }
}

RXDatePicker.defaultProps = {
    ...RXFormElement.defaultProps,
    type: 'date-picker',
    displayFormat: inputFormat,
    minDate: moment().format(inputFormat),
    selectedDate: moment().format(inputFormat),
    displayDate: moment().format(inputFormat),
    maxDate: moment().add(10, 'years').format(inputFormat)
};