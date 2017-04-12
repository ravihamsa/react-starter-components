/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {PropTypes, Component} from "react";
import RXFormElement from './RXFormElement'

export default class RXCheckbox extends RXFormElement {

    onChange(e) {
        this.updateValue(e.target.checked, 'update');
    }

    renderElement() {
        let restProps = this.getRestProps();
        delete restProps.label;
        restProps.checked = this.getValue() === true;
        return <input  {...restProps} onChange={this.onChange.bind(this)}/>
    }
}

RXCheckbox.propTypes = {
    ...RXFormElement.propTypes,
    value: PropTypes.bool.isRequired,

}

RXCheckbox.defaultProps = {
    ...RXFormElement.defaultProps,
    type: 'checkbox',
    value: false
}
