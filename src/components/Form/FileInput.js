/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';


class FileInput extends FormElement {
    getValueFromNode(node) {
        return node.files[0];
    }

    render() {

        const defaultValue = this.getDefaultValue();
        const formClasses = this.getFormClasses();
        const value = defaultValue || '';
        const errors = this.getErrors();

        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            <input type="file" className="form-control" name={this.props.name}
                placeholder={this.props.placeholder} onChange={this.onChange.bind(this)}
                ref={element => this.ref_input = element}/>
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : ''}
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : ''}
        </fieldset>;
    }

}


export default FileInput;

FileInput.defaultProps = {
    ...FormElement.defaultProps,
    type: 'file'
};

