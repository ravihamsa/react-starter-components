
/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React from 'react';
import RXFormElement from './RXFormElement'

export default class RXHiddenInput extends RXFormElement {
    renderElement() {
        const restProps = this.getRestProps();
        restProps.type = 'hidden';
        return <input  {...restProps} onChange={this.onChange.bind(this)}/>;
    }

    renderElementWithWrapper(){
        return <div>{this.renderElement()}</div>;
    }
}


RXHiddenInput.defaultProps = {
    ...RXFormElement.defaultProps,
    type: 'hidden'
}