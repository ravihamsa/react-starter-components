/**
 * Created by ravi.hamsa on 10/22/16.
 */
import React, {Component, PropTypes} from "react";
import {_} from '../../core/utils'
import Collection from 'collection-manager';

export default class ToggleActionButton extends Component {

    constructor(){
        super(...arguments);
        this.collectionManager=new Collection(this.props.actions, {circular:true});
    }

    componentWillMount(){
        this.unsubscribeCollection = this.collectionManager.on('change', (element)=>this.setState({currentElement:element}))
    }

    componentWillUnmount(){
        if(this.unsubscribeCollection){
            this.unsubscribeCollection();
        }
    }

    onClick(event){
        event.preventDefault();
        this.props.controller.onAction(this.collectionManager.getActiveElement(), _.omit(this.props, ['action', 'controller', 'children']) );
        this.collectionManager.next();
    }

    render(){

        let props = {onClick:this.onClick.bind(this)}
        return React.cloneElement(this.props.children[this.collectionManager.getActiveIndex()], props)
        {/*return <ContainerTag className={this.props.className}  onClick={this.onClick.bind(this)}>{this.props.children[this.state.actionIndex]}</ContainerTag>*/}
    }
}
