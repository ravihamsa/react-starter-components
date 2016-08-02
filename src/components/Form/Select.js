/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {PropTypes, Component} from "react";
import FormElement from './FormElement'


class Select extends FormElement {
    render() {

        let defaultValue = this.getDefaultValue();
        let selectText = this.props.selectText || 'Select';
        let options = this.props.options || [];
        let formClasses = this.getFormClasses();
        let errors = this.getErrors();

        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
            <select className="form-control" name={this.props.name}
                   placeholder={this.props.placeholder} onChange={this.onChange.bind(this)}  value={defaultValue}>
                    <option value="-1">{selectText}</option>
                {options.map(function(option, index){
                    return <option value={option.id} key={index}>{option.name}</option>
                },this)}
            </select>
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {errors.length > 0 ? <small className="text-muted">{errors[0].message}</small> : '' }
        </fieldset>
    }
}



export default Select;