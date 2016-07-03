/**
 * Created by ravi.hamsa on 6/30/16.
 */
import React, {PropTypes, Component} from "react";
import {SimpleModel} from '../../core';


class FormCollection extends Component {
    constructor(){
        super(...arguments);
        this._dataCollection = this.props.items || []
    }

    onFormChange(index, changed, allData){
        this._dataCollection[index]=allData;
        console.log(this._dataCollection);
    }

    render(){


        let forms = this._dataCollection.map(function(formItem, index){
            let valueStore = new SimpleModel(formItem);
            valueStore.on('change', this.onFormChange.bind(this, index));
            return React.cloneElement(this.props.children, {key:index, valueStore: valueStore})
        },this)

        return <div className="form-collection">
            {forms}
        </div>
    }
}

export default FormCollection