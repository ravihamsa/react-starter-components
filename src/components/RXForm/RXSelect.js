/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React from 'react';
import RXFormElement from './RXFormElement'

export default class RXSelect extends RXFormElement {
    renderElement() {
        let restProps = this.getRestProps();
        let options = this.props.options;
        return <select {...restProps} onChange={this.onChange.bind(this)}>
            {restProps.showSelect ? <option value="-1">Select</option> : null}
            {options.map(function (option, index) {
                return <option value={option.id} key={index}>{option.name}</option>
            }, this)}
        </select>
    }
}

RXSelect.defaultProps = {
    ...RXFormElement.defaultProps,
    value: '-1',
    showSelect:true
}
