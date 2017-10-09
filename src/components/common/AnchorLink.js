/**
 * Created by ravi.hamsa on 10/22/16.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

export default class AnchorLink extends Component {

    onClick(event){
        event.preventDefault();
        this.props.onClick(event);
    }

    render(){
        let href = this.props.href || '#';
        return <a className={this.props.className} href={href} onClick={this.onClick.bind(this)}>{this.props.children}</a>
    }
}
