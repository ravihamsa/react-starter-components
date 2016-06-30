/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {PropTypes, Component} from "react";
import FormElement from './FormElement'


class TextInput extends FormElement {
    render() {
        return <fieldset className="form-group">
            <label>{this.props.label}</label>
            <input type={this.props.type} className="form-control" name={this.props.name}
                   placeholder={this.props.placeholder} onChange={this.onChange.bind(this)}  defaultValue={this.props.defaultValue}/>
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
        </fieldset>
    }
}



export default TextInput;