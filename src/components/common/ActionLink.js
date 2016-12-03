/**
 * Created by ravi.hamsa on 10/22/16.
 */
import React, {Component, PropTypes} from "react";
import _ from 'lodash'
export default class ActionLink extends Component {

    onClick(event){
        event.preventDefault();
        this.props.controller.onAction(this.props.action, _.omit(this.props, ['action', 'controller', 'children']) );
    }

    render(){
        let href = this.props.href || '#';
        let ContainerTag = this.props.tagName || 'a'
        return <ContainerTag className={this.props.className} href={href} onClick={this.onClick.bind(this)}>{this.props.children}</ContainerTag>
    }
}
