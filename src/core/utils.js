/**
 * Created by ravi.hamsa on 6/28/16.
 */

import React from "react";
import _ from 'lodash';

const identity = function(arg1){
    return arg1;
}

const getUniqueId = (function(){
    var counter = 1000;
    return function(){
        return ''+(++counter);
    }
})();



let connectToStore = function(Component, stores){
    class ComponentWrapper extends React.Component {
        constructor(props){
            super(props);
            this.state = {

            }
        }
        componentWillMount(){
            let self = this;
            this.unsubscribeStore = [];
            _.each(stores, (item)=>{
                let {stateName, event='change', store, parser=identity} =  item;
                this.unsubscribeStore.push(store.on(event, (args)=>{
                    self.setState({stateName:parser(args)})
                }))
            })
        }

        componentWillUnmount(){
            if(this.unsubscribeStore ){
                _.each(this.unsubscribeStore, (unsubscribe) => unsubscribe())
            }
        }

        render(){
            return <Component {...this.props} {...this.state} />
        }
    }
    return ComponentWrapper;
}

let cloneChildren = function(children, props){
    if(children.map){
        return children.map(function(child, index){
            let key = props.key;
            if(key === undefined){
                key=index;
            }
            return React.cloneElement(child, {...props, key})
        })
    }else{
        return  React.cloneElement(children, {...props})
    }
}

export default {identity, cloneChildren, connectToStore, getUniqueId}