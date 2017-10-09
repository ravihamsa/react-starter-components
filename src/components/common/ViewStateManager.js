/**
 * Created by ravi.hamsa on 7/19/16.
 */


import React, {Component} from "react";
import PropTypes from "prop-types";


class NoStateView extends Component {
    render() {
        return <div className="no-state">State Not Defined</div>
    }
}

export class ViewState extends Component {
    render(){
        return <div>{this.props.children}</div>
    }
}


class ViewStateManager extends Component {
    render() {
        let currentState = this.props.currentState;
        let children = this.props.children;
        if (!children.find) {
            children = [children];
        }
        let stateChild = children.find(function (child) {
            let stateArray = child.props.stateNames.replace(/\s/g, '').split(',')
            return stateArray.indexOf(currentState) > -1;
        })
        if (stateChild) {
            return <div className="state-wrapper">{stateChild}</div>;
        } else {
            return <div>{currentState} Not Defined</div>
        }

    }
}

ViewStateManager.propTypes = {
    currentState: PropTypes.string.isRequired
}

ViewStateManager.defaultProps = {
    currentState: 'default'
}

export default ViewStateManager;

