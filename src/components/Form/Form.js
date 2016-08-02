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
        this._errorHandler = this.onError.bind(this);
    }

    onSubmitHandler(event){
        event.preventDefault();
        let context = this.getChildContext();
        let {valueStore, errorStore} = context;
        errorStore.trigger('forceValidate')
        let hasErrors = Object.values(errorStore.getAll()).filter(function(item){return item.length > 0}).length > 0;
        if(hasErrors){
            return;
        }
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

    onError(error){
        console.log(error);
    }

    getChildContext() {

        if(!this.store){
            let store = this.store = this.props.valueStore || new SimpleModel();
            let detailStore = new SimpleModel();
            if(this._unsubscribeChange){
                this._unsubscribeChange();
            }
            this._unsubscribeChange = store.on('change', this._valueChangeHandler);
            store.detailStore = detailStore;


            let errorStore = this.errorStore = this.props.errorStore || new SimpleModel();
            if(this._unsubscribeErrorChange){
                this._unsubscribeErrorChange();
            }

            this._unsubscribeErrorChange = errorStore.on('change', this._errorHandler);
        }



        return {
            valueStore: this.store,
            errorStore: this.errorStore,
            valueDetailStore:this.store.detailStore
        }

    }
}

Form.childContextTypes = {
    valueStore: PropTypes.object.isRequired,
    errorStore: PropTypes.object.isRequired,
    valueDetailStore: PropTypes.object.isRequired
}


export default Form;