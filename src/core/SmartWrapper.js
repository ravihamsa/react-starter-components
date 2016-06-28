/**
 * Created by ravi.hamsa on 6/28/16.
 */

import React, {Component} from "react";
import dataLoader from './dataLoader';
import Loader from './Loader';
import {identity} from './utils';

class SmartWrapper extends Component {

    constructor(){
        super(...arguments);
        this._loadingCount = 0;
        this.dataIndex = {};
        this.state = {
            loading:false
        }
    }


    componentWillMount(){
        let stores = this.props.dataRequests;
        if (stores) {
            for(let i=0; i<stores.length; i++){
                let storeConfig = stores[i];
                let getParams = storeConfig.getDataParams || identity;
                this.addRequest(storeConfig.propKey, storeConfig.requestId, getParams.call(this, storeConfig))
                // this.loadStore(storeConfig.propKey, storeConfig.store, getParams.call(this, storeConfig), true)
            }
        }

    }

    addRequest(propName, requestId, payload){
        var self = this;
        let def = dataLoader.getRequestDef(requestId, payload);

        def.done(function(data){
            self.dataIndex[propName] = data;
        })

        def.finally(function(){
            self.bumpAndCheckLoading(-1)
        })

        def.catch(function(e){
            console.log(e);
        })

        self.bumpAndCheckLoading(1)
    }


    bumpAndCheckLoading(diff){
        this._loadingCount += diff;
        this.setState({loading:this._loadingCount > 0})
    }

    render() {
        let children =  this.props.children;
        if(!Array.isArray(this.props.children)){
            children = [children];
        }

        let childComponents = children.map(function(childComponent,index){
            return React.cloneElement(childComponent, {...this.dataIndex, key:index});
        },this)
        return this.state.loading ? <Loader/> : <div>{childComponents}</div>
    }

}

export default SmartWrapper;