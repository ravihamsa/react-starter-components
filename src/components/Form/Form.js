/**
 * Created by ravi.hamsa on 6/29/16.
 */
import React, {PropTypes, Component} from "react";
import core from '../../core';
import _ from 'lodash';
const {SimpleModel}=core;

class Form extends Component {

    constructor() {
        super(...arguments);
        this._valueChangeHandler = this.onValueChange.bind(this);
        this._errorHandler = this.onError.bind(this);
        this.elementIndex = {};
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.validateForm();
        this.props.onSubmitHandler(valueStore.getAll(), valueStore);
    }

    isFormValid(){
        let context = this.getChildContext();
        let {valueStore, errorStore} = context;
        errorStore.trigger('forceValidate')
        let hasErrors = _.values(errorStore.getAll()).filter(function (item) {
                return item.length > 0
            }).length > 0;

        return !hasErrors
    }


    render() {
        return <form onSubmit={this.onSubmitHandler.bind(this)} className={this.props.className}>
            {this.props.children}
        </form>
    }

    onValueChange(changed, allData) {
        if (this.props.onValueChange) {
            this.props.onValueChange(changed, allData);
        }
    }

    onError(error) {
        // console.log(error);
    }

    setValues(map, skipValidate) {
        _.each(_.keys(map), (elementName)=> this.setValue(elementName, map[elementName], skipValidate));
    }

    setValue(elementName, value, skipValidate){
        if(this.elementIndex[elementName]){
            this.elementIndex[elementName].setValue(value, skipValidate)
        }else{
            console.log('no element by name', elementName, value);
        }
    }

    getChildContext() {

        if (!this.store) {
            let store = this.store = this.props.valueStore || new SimpleModel();
            let detailStore = new SimpleModel();
            if (this._unsubscribeChange) {
                this._unsubscribeChange();
            }
            this._unsubscribeChange = store.on('change', this._valueChangeHandler);
            store.detailStore = detailStore;


            let errorStore = this.errorStore = this.props.errorStore || new SimpleModel();
            if (this._unsubscribeErrorChange) {
                this._unsubscribeErrorChange();
            }

            this._unsubscribeErrorChange = errorStore.on('change', this._errorHandler);
        }


        return {
            valueStore: this.store,
            errorStore: this.errorStore,
            valueDetailStore: this.store.detailStore,
            elementIndex: this.elementIndex
        }

    }
}

Form.childContextTypes = {
    valueStore: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
    valueDetailStore: PropTypes.object.isRequired,
    elementIndex: PropTypes.object.isRequired
}


export default Form;