import React, {Component, PropTypes} from "react";
import FormElement from "./FormElement"

class RadioList extends FormElement {
    render() {
        let defaultValue = this.getDefaultValue();
        let options = this.props.options || [];
        let formClasses = this.getFormClasses();
        let errors = this.getErrors();
        let name = this.props.name;

        return <fieldset className={formClasses} onChange={this.onChange.bind(this)}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
            {options.map(function(option, index) {
                return (
                    <label className="form-control" key={index}>
                        <input type="radio" name={name} 
                        defaultChecked={defaultValue === option.id }
                        id={"radio-" + name + "-" + option.id} value={option.id} />
                        <label htmlFor={"radio-" + name + "-" + option.id}>{option.label}</label>
                    </label>
                )
            }, this)}
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : '' }
        </fieldset>
    }
}

export default RadioList;
