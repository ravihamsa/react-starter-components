/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {PropTypes, Component} from "react";
import FormElement from './FormElement'


class Select extends FormElement {
    render() {

        let defaultValue = this.getDefaultValue();
        let selectText = this.props.selectText || 'Select';

        return <fieldset className="form-group">
            <label>{this.props.label}</label>
            <select className="form-control" name={this.props.name}
                   placeholder={this.props.placeholder} onChange={this.onChange.bind(this)}  defaultValue={defaultValue}>
                    <option value="-1">{selectText}</option>
                {this.props.options.map(function(option, index){
                    return <option value={option.id} key={index}>{option.name}</option>
                },this)}
            </select>
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
        </fieldset>
    }
}



export default Select;