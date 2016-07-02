/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes, Component} from "react";
import {SimpleStore} from '../../core';

class Form extends Component {

    constructor(){
        super(...arguments);
        this._valueChangeHandler = this.onValueChange.bind(this);
    }

    render(){
        return <form>
            {this.props.children}
        </form>
    }

    onValueChange(changed, allData){
        console.log(allData)
    }

    getChildContext(){

        let store = this.props.valueStore || new SimpleStore();
        store.off('change', this._valueChangeHandler)
        store.on('change', this._valueChangeHandler);

        return {
            valueStore: store
        }

    }
}

Form.childContextTypes = {
    valueStore: PropTypes.object.isRequired
}


export default Form;