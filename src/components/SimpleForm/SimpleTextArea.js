import React from 'react';
import SimpleElement from './SimpleElement';


export default class SimpleTextArea extends SimpleElement {
    render() {
        const props = this.filterDomProps(this.props);
        props.className = 'form-control';
        if (props.value === undefined) {
            props.value = this.getDefaultValue();
        }
        const className = this.getClassNames();
        return <div className={className}>
            <textarea {...props}/>
        </div>;
    }
}

SimpleTextArea.defaultProps = {
    ...SimpleElement.defaultProps,
    type:'textArea'
};