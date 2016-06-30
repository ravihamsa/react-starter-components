/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes, Component} from "react";

class FormElement extends Component {

    onChange(event) {
        let name = this.props.name;
        this.context.valueStore.set({[name]: event.target.value})
    }

    componentWillMount(){
        if(this.props.defaultValue){
            this.context.valueStore.set({[this.props.name]: this.props.defaultValue})
        }
    }
}

FormElement.contextTypes = {
    valueStore: PropTypes.object.isRequired
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