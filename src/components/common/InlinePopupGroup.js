/**
 * Created by ravi.hamsa on 7/2/16.
 */
import React, {PropTypes, Component} from 'react';

let popupStyles = {
    position:'relative'
}

let bodyStyles = {
    position:'absolute',
    zIndex:999
}

let openPopup;

class InlinePopup extends Component{
    constructor(){
        super(...arguments)
        this.state = {
            open:false
        }
    }

    openPopup(){
        if(openPopup && openPopup !== this){
            openPopup.closePopup();
        }
        this.setState({open:true})
        openPopup = this;
    }

    closePopup(){
        this.setState({open:false})
    }

    togglePopup(){
        this.state.open ? this.closePopup() : this.openPopup();
    }

    itemClick(){
        if(this.props.itemClick){
            this.props.itemClick(arguments);
        }
    }

    render(){
        let childProps = {
            togglePopup:this.togglePopup.bind(this),
            closePopup:this.closePopup.bind(this),
            itemClick:this.itemClick.bind(this),
            isOpen:this.state.open
        }

        return <div styles={popupStyles} {...this.props}>
            {this.props.children.map(function(children, index){
                return React.cloneElement(children, {...childProps, key:index})
            })}
        </div>
    }
}


class InlineButton extends Component {
    render(){
        return React.cloneElement(this.props.children, {onClick:this.props.togglePopup})
    }
}

class InlineBody extends Component {
    render(){
        return this.props.isOpen ? <div style={bodyStyles}> { React.cloneElement(this.props.children, {closePopup:this.props.closePopup}) }</div>  : null;
    }
}

export default {
    InlinePopup,
    InlineButton,
    InlineBody
}