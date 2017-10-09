/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import FormElement from './FormElement'


class TextArea extends FormElement {
    render() {
        let defaultValue = this.getDefaultValue();
        let formClasses = this.getFormClasses();
        let value = defaultValue || '';
        let errors = this.getErrors();

        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            <textarea className="form-control" name={this.props.name}
                      placeholder={this.props.placeholder} onChange={this.onChange.bind(this)}
                      value={value}/>
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : ''}
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : ''}
        </fieldset>
    }
}


export default TextArea;


TextArea.defaultProps = {
    ...FormElement.defaultProps,
    type: 'text-area'
}