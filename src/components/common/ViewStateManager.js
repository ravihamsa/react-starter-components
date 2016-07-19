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
    constructor(){
        super(...arguments);
        this.state = {
            viewState:this.props.viewState
        }

    }

    render(){
        let currentState = this.state.viewState;
        let stateChild = this.props.children.find(function(child){
            return child.props.viewStateName === currentState;
        })
        if(stateChild){
            return stateChild;
        }else{
            return <NoStateView/>
        }

    }
}

ViewStateManager.propTypes = {
    viewState:PropTypes.string.isRequired
}

ViewStateManager.defaultProps = {
    viewState:'default'
}

export default ViewStateManager;