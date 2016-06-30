/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes, Component} from "react";
import {SimpleStore} from '../../core';

class Form extends Component {

    render(){
        return <form>
            {this.props.children}
        </form>
    }

    onValueChange(changed){
        console.log(changed)
    }

    getChildContext(){

        let store = new SimpleStore();
        store.on('change', this.onValueChange.bind(this));

        return {
            valueStore: store
        }

    }
}

Form.childContextTypes = {
    valueStore: PropTypes.object.isRequired
}


export default Form;