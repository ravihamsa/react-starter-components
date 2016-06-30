/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {PropTypes, Component} from "react";
import FormElement from './FormElement'


class TextBox extends FormElement {
    render() {
        return <fieldset className="form-group">
            <label>{this.props.label}</label>
            <input type={this.props.type} className="form-control" name={this.props.name}
                   placeholder={this.props.placeholder} onChange={this.onChange.bind(this)}/>
            <small className="text-muted">We will never share your email with anyone else.</small>
        </fieldset>
    }
}



export default TextBox;