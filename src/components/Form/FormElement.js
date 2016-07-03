/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes, Component} from "react";

class FormElement extends Component {

    onChange(event) {
        let name = this.props.name;
        let value = this.getValueFromNode(event.target);
        this.context.valueStore.set({[name]: value});
        if(this.props.options){
            this.context.valueDetailStore.set({[name]: this.props.options.find((item)=> item.id===value)})
        }
        this.setState({defaultValue:value})
    }

    getValueFromNode(node){
        return node.value;
    }

    componentWillMount(){
        if(this.props.defaultValue){
            this.context.valueStore.set({[this.props.name]: this.props.defaultValue})
        }
    }

    getDefaultValue(){
        return this.context.valueStore.get(this.props.name);
    }

    getFormClasses(){
        let classArray = ['form-group'];
        if(this.props.errors !== undefined){
            classArray.push('has-error');
        }
        return classArray.join(' ')
    }
}

FormElement.contextTypes = {
    valueStore: PropTypes.object.isRequired,
    valueDetailStore: PropTypes.object.isRequired,
}

FormElement.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue:PropTypes.string,
    options:PropTypes.array
}

FormElement.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input'
}


export default FormElement;