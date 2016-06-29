/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {PropTypes, Component} from "react";
import FormElement from './FormElement'


class TextBox extends FormElement {
    render() {
        return <fieldset className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name={this.props.name}
                   placeholder="Enter email" onChange={this.onChange.bind(this)}/>
            <small className="text-muted">We will never share your email with anyone else.</small>
        </fieldset>
    }
}



export default TextBox;
