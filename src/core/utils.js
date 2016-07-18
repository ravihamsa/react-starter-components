/**
 * Created by ravi.hamsa on 6/28/16.
 */

import React from "react";

const identity = function(arg1){
    return arg1;
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

export default {identity, cloneChildren}