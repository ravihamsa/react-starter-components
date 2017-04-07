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
            .filter(event => {
                let isWithinPopup = false;
                let target = event.target;
                let bodyRoot = this.refs.inlineBody.portalElement;
                while (target.parentNode && !isWithinPopup) {
                    if (target === bodyRoot) {
                        isWithinPopup = true;
                    }
                    target = target.parentNode;
                }
                return !isWithinPopup;
            }).take(1)
            .subscribe(event => this.closePopup());

    }

    closePopup() {
        if (clickSubscription) {
            clickSubscription.unsubscribe();
        }
        if (this.props.onClosePopup) {
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

    componentWillUnmount() {
        if (openPopup && openPopup === this) {
            openPopup = null;
        }
    }

    getButtonBounds() {
        let {inlineButton, inlineBody} = this.refs;
        return ReactDOM.findDOMNode(inlineButton).getBoundingClientRect();


    }

    render() {
        let childProps = {
            togglePopup: this.togglePopup.bind(this),
            closePopup: this.closePopup.bind(this),
            itemClick: this.itemClick.bind(this),
            getButtonBounds: this.getButtonBounds.bind(this),
            isOpen: this.state.open
        }

        let domProps = _.pick(this.props, 'className');
        let refMap = ['inlineButton', 'inlineBody']

        return <div style={popupStyles} ref="rootEl" {...domProps}>
            {this.props.children.map(function (children, index) {
                return React.cloneElement(children, {...childProps, key: index, ref: refMap[index]})
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
        return <div className="inline-popop-body"></div>;
    }

    componentDidMount() {
        let p = this.portalElement;
        if (!p) {
            p = document.createElement('div');
            document.body.appendChild(p);
            this.portalElement = p;
        }
        this.componentDidUpdate();
    }

    componentWillReceiveProps() {
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    }

    updatePortalElementPosition(){
        let p = this.portalElement;
        if(!p){
            return;
        }
        let refEl = ReactDOM.findDOMNode(this);
        let bounds = refEl.getBoundingClientRect();
        let buttonBounds = this.props.getButtonBounds();
        let style = {position: 'absolute'};
        style.left = bounds.left + 'px';
        style.top = bounds.top + 'px';
        style.width = buttonBounds.width + 'px';
        for (var i in style) {
            p.style[i] = style[i];
        }
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            this.updatePortalElementPosition();
            let style = {position: 'absolute'};
            let buttonBounds = this.props.getButtonBounds();
            let {halign, valign} = this.props;
            switch (halign) {
                case 'right':
                    style.right = 0;
                    break;
                case 'center':
                    style.left = '-50%';
                    style.transform = 'translateX(-50%)'
                    break;
                default:
                    break;
            }

            switch (valign) {
                case 'top':
                    style.top = -(buttonBounds.height);
                    break;
            }
            ReactDOM.render(<div className="inline-popup-body"
                                 style={style}>{React.cloneElement(this.props.children, {closePopup: this.props.closePopup})}</div>, this.portalElement);
        } else {
            ReactDOM.render(<div></div>, this.portalElement);
        }
    }
}

InlineBody.defaultProps = {
    valign: 'bottom',
    halign: 'left'
}

export default {
    InlinePopup,
    InlineButton,
    InlineBody
}