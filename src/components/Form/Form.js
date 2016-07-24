/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes, Component} from "react";
import core from '../../core';
const {SimpleModel}=core;

class Form extends Component {

    constructor() {
        super(...arguments);
        this._valueChangeHandler = this.onValueChange.bind(this);
    }

    onSubmitHandler(event){
        event.preventDefault();
        let context = this.getChildContext();
        let {valueStore, valueDetailStore} = context;
        this.props.onSubmitHandler(valueStore.getAll(), valueStore);
    }


    render() {
        return <form onSubmit={this.onSubmitHandler.bind(this)}>
            {this.props.children}
        </form>
    }

    onValueChange(changed, allData) {
        if(this.props.onValueChange){
            this.props.onValueChange(changed, allData);
        }
    }

    getChildContext() {

        if(!this.store){
            let store = this.store = this.props.valueStore || new SimpleModel();
            let detailStore = new SimpleModel();
            store.off('change', this._valueChangeHandler)
            store.on('change', this._valueChangeHandler);
            store.detailStore = detailStore;
        }

        return {
            valueStore: this.store,
            valueDetailStore:this.store.detailStore
        }

    }
}

Form.childContextTypes = {
    valueStore: PropTypes.object.isRequired,
    valueDetailStore: PropTypes.object.isRequired
}


export default Form;