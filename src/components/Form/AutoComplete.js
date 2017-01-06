/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {PropTypes, Component} from "react";
import FormElement from './FormElement'
import InlinePopupGroup from '../common/InlinePopupGroup'
import Selection from 'selection-manager';
const {InlinePopup, InlineButton, InlineBody} = InlinePopupGroup;

console.log(InlinePopup, 'InlinePopup');

class AutoComplete extends FormElement {
    constructor() {
        super(...arguments);
        this.state.searchString = '';
        this.selection = new Selection({multiSelect: this.props.multiSelect});
    }

    componentWillMount() {
        super.componentWillMount();
        this.selection.select(this.getDefaultValue());
        this.unsubscribeSelection = this.selection.on('change', (selection) => {
            this.setValue(selection.id)
        })
    }

    getDefaultValue() {
        let options = this.props.options;
        let selectedId = this.props.defaultValue;
        let selectedOption = options.find((item) => item.id === selectedId);
        if (!selectedOption) {
            let selectText = this.props.selectText || 'Select';
            selectedOption = {id: '-1', name: selectText};
        }
        return selectedOption;
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.unsubscribeSelection) {
            this.unsubscribeSelection();
        }
    }

    selectOption(selectedId, event) {
        event.preventDefault();
        this.selection.select(selectedId);
        if(!this.selection.isMultiSelect()){
            this.refs.popupBody.props.closePopup();
        }
    }

    localOnChange(event) {
        this.setState({searchString: this.getValueFromNode(event.target)})
    }

    onClosePopup(){
        this.setState({searchString:this.selection.getSelected().name})
    }

    render() {

        let defaultValue = this.getDefaultValue();
        let selectedOption = this.selection.getSelected();
        let options = this.props.options || [];
        let formClasses = this.getFormClasses();
        let errors = this.getErrors();
        let searchString = this.state.searchString;
        let filteredOptions = options.filter((item) => item.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1)

        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
            <InlinePopup onClosePopup={this.onClosePopup.bind(this)}>
                <InlineButton>
                    <div style={{position:'relative'}}>
                        {/*<span>{selectedOption.name}</span>*/}
                        <input className="form-control" name={this.props.name} disabled={this.props.disabled}
                               placeholder={this.props.placeholder} onChange={this.localOnChange.bind(this)} value={this.state.searchString}>
                        </input>
                    </div>
                    {/*<option value="-1">{selectText}</option>
                     {options.map(function(option, index){
                     return <option value={option.id} key={index}>{option.name}</option>
                     },this)}*/}

            </InlineButton>
            <InlineBody ref="popupBody">
                <ul style={{maxHeight: '200px', overflow: 'auto'}}>
                    {filteredOptions.map(function (option, index) {
                        return <li value={option.id} key={index}
                                   onClick={this.selectOption.bind(this, option)}>{option.name}</li>
                    }, this)}
                </ul>
            </InlineBody>
        </InlinePopup>
    {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
    {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : '' }
    </fieldset>
    }
}


export default AutoComplete;
