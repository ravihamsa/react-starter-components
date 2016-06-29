/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes,Component} from "react";

class FormElement extends Component {
    onChange(event){
        let name = this.props.name;
        this.context.valueStore.set({[name]:event.target.value})
    }
}

FormElement.contextTypes = {
    valueStore: PropTypes.object.isRequired
}

export default FormElement;