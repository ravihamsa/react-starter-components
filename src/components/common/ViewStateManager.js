/**
 * Created by ravi.hamsa on 7/19/16.
 */


import React, {Component, PropTypes} from "react";


class NoStateView extends Component {
    render(){
        <div className="no-state">State Not Defined</div>
    }
}



class ViewStateManager extends Component {
    render(){
        let currentState = this.props.currentState;
        let stateChild = this.props.children.filter(function(child){
            let stateArray = child.props.stateNames.replace(/\s/g, '').split(',')
            return stateArray.indexOf(currentState) > -1;
        })
        if(stateChild){
            return <div className="state-wrapper">{stateChild}</div>;
        }else{
            return <NoStateView/>
        }

    }
}

ViewStateManager.propTypes = {
    currentState:PropTypes.string.isRequired
}

ViewStateManager.defaultProps = {
    currentState:'default'
}

export default ViewStateManager;