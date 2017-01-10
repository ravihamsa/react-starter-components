/**
 * Created by ravi.hamsa on 7/2/16.
 */
import React, {PropTypes, Component} from 'react';
import {bodyClick$, createEventStream} from './../../core/rxutils';


let popupStyles = {
    position: 'relative'
}

let bodyStyles = {
    position: 'absolute',
    zIndex: 999
}

let openPopup;
let clickSubscription;
let clickInsideSubscription;

class InlinePopup extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            open: false
        }
    }

    openPopup() {
        if (openPopup && openPopup !== this) {
            openPopup.closePopup();

        }
        this.setState({open: true})
        openPopup = this;
        clickSubscription = bodyClick$
            .filter(event=> {
                let isWithinPopup = false;
                let target = event.target;
                while (target.parentNode && !isWithinPopup) {
                    if (target === this.refs.rootEl) {
                        isWithinPopup = true;
                    }
                    target = target.parentNode;
                }
                return !isWithinPopup;
            }).take(1)
            .subscribe(event=>this.closePopup());

    }

    closePopup() {
        if (clickSubscription) {
            clickSubscription.unsubscribe();
        }
        if(this.props.onClosePopup){
            this.props.onClosePopup();
        }
        this.setState({open: false})
    }

    togglePopup() {
        this.state.open ? this.closePopup() : this.openPopup();
    }

    itemClick() {
        if (this.props.itemClick) {
            this.props.itemClick(arguments);
        }
    }

    componentWillUnmount(){
        if (openPopup && openPopup === this) {
            openPopup = null;
        }
    }

    render() {
        let childProps = {
            togglePopup: this.togglePopup.bind(this),
            closePopup: this.closePopup.bind(this),
            itemClick: this.itemClick.bind(this),
            isOpen: this.state.open
        }

        let domProps = _.pick(this.props, 'className');

        return <div style={popupStyles}  ref="rootEl" {...domProps}>
            {this.props.children.map(function (children, index) {
                return React.cloneElement(children, {...childProps, key: index})
            })}
        </div>
    }
}


class InlineButton extends Component {
    render() {
        return React.cloneElement(this.props.children, {onClick: this.props.togglePopup})
    }
}

class InlineBody extends Component {
    render() {
        return this.props.isOpen ? <div
            style={bodyStyles} className="inline-popup-body"> { React.cloneElement(this.props.children, {closePopup: this.props.closePopup}) }</div> : null;
    }
}

export default {
    InlinePopup,
    InlineButton,
    InlineBody
}