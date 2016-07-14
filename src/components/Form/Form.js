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

    render() {
        return <form onSubmit={this.props.onSubmitHandler.bind(this.props.valueStore)}>
            {this.props.children}
        </form>
    }

    onValueChange(changed, allData) {
        console.log(allData)
    }

    getChildContext() {

        let store = this.props.valueStore || new SimpleModel();
        let detailStore = this.props.valueDetailStore || new SimpleModel();
        store.off('change', this._valueChangeHandler)
        store.on('change', this._valueChangeHandler);
        store.detailStore = detailStore;
        return {
            valueStore: store,
            valueDetailStore: detailStore
        }

    }
}

Form.childContextTypes = {
    valueStore: PropTypes.object.isRequired,
    valueDetailStore: PropTypes.object.isRequired
}


export default Form;