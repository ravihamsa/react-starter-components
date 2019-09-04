/**
 * Created by ravi.hamsa on 7/2/16.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {bodyClick$} from './../../core/rxutils';
import {_} from './../../core/utils';

const popupStyles = {
    position: 'relative'
};

const bodyStyles = {
    position: 'absolute',
    zIndex: 999
};

let openPopup;
let clickSubscription;
let clickInsideSubscription;

class InlinePopup extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            open: false
        };
    }

    openPopup() {
        if (openPopup && openPopup !== this) {
            openPopup.closePopup();

        }
        this.setState({
            open: true
        });
        openPopup = this;
        clickSubscription = bodyClick$
            .filter(event => this.isClickedOutside(event, this)).take(1)
            .subscribe(() => this.closePopup());

    }

    isClickedOutside(event, popup) {
        let isWithinPopup = false;
        let target = event.target;
        const bodyRoot = popup.ref_inlineBody.portalElement;
        while (target.parentNode && !isWithinPopup) {
            if (target === bodyRoot) {
                isWithinPopup = true;
            }
            target = target.parentNode;
        }
        return !isWithinPopup;
    }

    closePopup() {
        if (clickSubscription) {
            clickSubscription.unsubscribe();
        }
        if (this.props.onClosePopup) {
            this.props.onClosePopup();
        }
        this.setState({
            open: false
        });
    }

    togglePopup() {
        if (!this.props.disabled) {
            this.state.open ? this.closePopup() : this.openPopup();
        }
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
        return ReactDOM.findDOMNode(this.ref_inlineButton).getBoundingClientRect();
    }

    render() {
        const childProps = {
            togglePopup: this.togglePopup.bind(this),
            closePopup: this.closePopup.bind(this),
            itemClick: this.itemClick.bind(this),
            getButtonBounds: this.getButtonBounds.bind(this),
            isOpen: this.state.open
        };

        const domProps = _.pick(this.props, 'className');
        const refMap = [inlineButton => this.ref_inlineButton = inlineButton, inlineBody => this.ref_inlineBody = inlineBody];

        return <div style={popupStyles} ref={rootEl => this.ref_rootEl = rootEl} {...domProps}>
            {this.props.children.map((children, index) => React.cloneElement(children, {
                ...childProps, key: index, ref: refMap[index]
            }))}
        </div>;
    }
}


class InlineButton extends Component {
    render() {
        return React.cloneElement(this.props.children, {
            onClick: this.props.togglePopup
        });
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

    UNSAFE_componentWillReceiveProps() {
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    }

    updatePortalElementPosition() {
        const p = this.portalElement;
        if (!p) {
            return;
        }
        const refEl = ReactDOM.findDOMNode(this);
        const bounds = refEl.getBoundingClientRect();
        const buttonBounds = this.props.getButtonBounds();
        const style = {
            position: 'absolute'
        };
        style.left = bounds.left + 'px';
        style.top = (bounds.top + window.scrollY) + 'px';
        style.width = buttonBounds.width + 'px';
        for (const i in style) {
            p.style[i] = style[i];
        }
    }

    componentDidUpdate() {
        const {className = ''} = this.props;
        if (this.props.isOpen) {
            this.updatePortalElementPosition();
            const style = {
                position: 'absolute'
            };
            const buttonBounds = this.props.getButtonBounds();
            const {halign, valign, bodyPosition} = this.props;
            switch (halign) {
                case 'right':
                    style.right = 0;
                    break;
                case 'center':
                    style.left = '-50%';
                    style.transform = 'translateX(-50%)';
                    break;
                default:
                    break;
            }

            switch (valign) {
                case 'top':
                    style.top = -(buttonBounds.height);
                    break;
            }
            switch (bodyPosition) {
                case 'up':
                    delete style.top;
                    style.bottom = 0;
                    break;
            }
            ReactDOM.render(<div className={className + ' inline-popup-body'}
			                     style={style}>{React.cloneElement(this.props.children, {
                    closePopup: this.props.closePopup
                })}</div>, this.portalElement);
        } else {
            ReactDOM.render(<div></div>, this.portalElement);
        }
    }
}

InlineBody.defaultProps = {
    valign: 'bottom',
    halign: 'left',
    bodyPosition: 'down'
};

InlinePopup.defaultProps = {
    disabled: false
};

export default {
    InlinePopup,
    InlineButton,
    InlineBody
};