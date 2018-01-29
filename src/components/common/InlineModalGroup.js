import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import utils from '../../core/utils';
import {bodyClick$} from './../../core/rxutils';

const rootStyle = {
    position: 'fixed',
    top: 0,
    left: 0
};

const inlineModalRoot = document.createElement('div');
inlineModalRoot.className = 'modal-root';
for (const i in rootStyle) {
    inlineModalRoot.style[i] = rootStyle[i];
}
document.body.appendChild(inlineModalRoot);


export class InlineModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    setOpen(bool) {
        this.setState({
            isOpen: bool
        });
    }

    closePopup() {
        this.setOpen(false);
    }

    openPopup() {
        this.setOpen(true);
    }

    togglePopup() {
        this.setOpen(!this.state.isOpen);
    }

    getPosition() {
        return {
            placeholder: this.placeholderEl.getBoundingClientRect(),
            root: this.modalContainerEl.getBoundingClientRect()
        };
    }

    render() {
        return <div style={{
            position: 'relative'
        }} className={'modal-open-' + this.state.isOpen} ref={element => this.modalContainerEl = element}>
            {utils.cloneChildren(this.props.children[0], {
                togglePopup: this.togglePopup.bind(this)
            })}
            {this.state.isOpen ? utils.cloneChildren(this.props.children[1], {
                closePopup: this.closePopup.bind(this),
                getPosition: this.getPosition.bind(this)
            }) : null}
            <div ref={element => this.placeholderEl = element}></div>
        </div>;
    }


}

export class InlineModalButton extends Component {

    render() {
        return React.cloneElement(this.props.children, {
            onClick: this.props.togglePopup
        });
    }
}

export class InlineModalBody extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.style.position = 'relative';
        this.el.style.display = 'none';
        this.el.className = this.props.className || ''
    }

    componentDidMount() {
	    this.positionElement();
        inlineModalRoot.appendChild(this.el);
        this.clickSubscription = bodyClick$
            .filter(event => this.isClickedOutside(event)).take(1)
            .subscribe(() => this.props.closePopup());
    }

    positionElement() {
        setTimeout(() => {
            const {placeholder} = this.props.getPosition();
            this.el.style.left = placeholder.x + 'px';
            this.el.style.top = placeholder.y + 'px';
            this.el.style.display = 'block';
        });
    }

    isClickedOutside(event) {
        let isWithinPopup = false;
        let target = event.target;
        const bodyRoot = this.el;
        while (target.parentNode && !isWithinPopup) {
            if (target === bodyRoot) {
                isWithinPopup = true;
            }
            target = target.parentNode;
        }
        return !isWithinPopup;
    }

    componentWillUnmount() {
        inlineModalRoot.removeChild(this.el);
        if (this.clickSubscription) {
            this.clickSubscription.unsubscribe();
        }
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}