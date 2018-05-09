import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import utils, {_} from '../../core/utils';
import {bodyClick$} from './../../core/rxutils';

const rootStyle = {
    position: 'absolute',
    top: 0,
    left: 0
};

const popups = [];

const addToModalRoot = modal => {
    inlineModalRoot.appendChild(modal.bodyEl);
    popups.push(modal);
};

const removeFromModalRoot = modal => {
    inlineModalRoot.removeChild(modal.bodyEl);
    const elementIndex = _.indexOf(popups, item => item === modal);
    popups.splice(elementIndex, 1);
};

bodyClick$.filter(() => popups.length > 0).subscribe(event => {
    let count = popups.length;
    while (count--) {
        const curPopup = popups[count];
        const isClickedOutside = curPopup.isClickedOutside(event);
        if (!isClickedOutside) {
            break;
        } else {
            curPopup.closePopup();
        }
    }
});

if(typeof document !== 'undefined'){
	const inlineModalRoot = document.createElement('div');
	inlineModalRoot.className = 'modal-root';
	for (const i in rootStyle) {
		inlineModalRoot.style[i] = rootStyle[i];
	}
	document.body.appendChild(inlineModalRoot);
}



export class InlineModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.bodyEl = null;
        this.buttonEl = null;
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
        if (!this.props.disabled) {
            this.setOpen(!this.state.isOpen);
        }
    }

    getPosition() {
        return {
            placeholder: this.placeholderEl.getBoundingClientRect(),
            button: this.buttonEl.getBoundingClientRect(),
            body: this.bodyEl.getBoundingClientRect()
        };
    }

    setButtonElement(button) {
        this.buttonEl = button;

    }

    setBodyElement(element) {
        this.bodyEl = element;
        addToModalRoot(this);
    }

    unsetBodyElement() {
        removeFromModalRoot(this);
        this.bodyEl = null;
    }

    isClickedOutside(event) {
        let isWithinBody = false;
        let isWithinButton = false;
        let target = event.target;
        let bodyRoot = this.bodyEl;
        while (target.parentNode && !isWithinBody) {
            if (target === bodyRoot) {
                isWithinBody = true;
            }
            target = target.parentNode;
        }

        bodyRoot = this.buttonEl;
        target = event.target;
        while (target.parentNode && !isWithinButton) {
            if (target === bodyRoot) {
                isWithinButton = true;
            }
            target = target.parentNode;
        }
        return !isWithinButton && !isWithinBody;
    }

    render() {
        return <div style={{
            position: 'relative'
        }} className={'inline-modal modal-open-' + this.state.isOpen} ref={element => this.modalContainerEl = element}>
            {utils.cloneChildren(this.props.children[0], {
                togglePopup: this.togglePopup.bind(this),
                setButtonElement: this.setButtonElement.bind(this)
            })}
            {this.state.isOpen ? utils.cloneChildren(this.props.children[1], {
                closePopup: this.closePopup.bind(this),
                getPosition: this.getPosition.bind(this),
                setBodyElement: this.setBodyElement.bind(this),
                unsetBodyElement: this.unsetBodyElement.bind(this),
            }) : null}
            <div ref={element => this.placeholderEl = element}></div>
        </div>;
    }


}

export class InlineModalButton extends Component {

    componentDidMount() {
        const domNode = ReactDOM.findDOMNode(this.rootEl);
        this.props.setButtonElement(domNode);
    }

    render() {
        const childNode = React.Children.only(this.props.children);
        return React.cloneElement(childNode, {
            onClick: this.props.togglePopup,
            ref: element => this.rootEl = element
        });
    }
}

export class InlineModalBody extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.visibility = 'hidden';
        this.el.className = this.props.className || '';
    }

    componentDidMount() {
        this.positionElement();
        this.props.setBodyElement(this.el);
        /*this.clickSubscription = bodyClick$
			.filter(event => this.isClickedOutside(event)).take(1)
			.subscribe(() => this.props.closePopup());*/
    }

    positionElement() {
        setTimeout(() => {
            const {placeholder, button, body} = this.props.getPosition();
            let left = placeholder.x;
            let top = placeholder.y + window.pageYOffset;

            switch (this.props.valign) {
                case 'top':
                    top -= button.height;
                    break;

                case 'bottom':
                    //do nothing
                    break;
            }

            switch (this.props.halign) {
                case 'left':
                    //do nothing
                    break;

                case 'right':
                    left -= (body.width - button.width);
                    break;

                case 'center':
                    left -= (body.width - button.width) / 2;
                    break;
            }

            switch (this.props.bodyPosition) {
                case 'up':
                    top -= (button.height + body.height);
                    break;
            }

            if (this.props.useButtonWidth) {
                this.el.style.width = button.width + 'px';
            }

            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';
            this.el.style.visibility = 'visible';
            this.el.classList.add('valign-' + this.props.valign);
            this.el.classList.add('halign-' + this.props.halign);
            this.el.classList.add('body-pos-' + this.props.bodyPosition);
        });
    }


    componentWillUnmount() {
        this.props.unsetBodyElement(this.el);
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

InlineModalBody.defaultProps = {
    valign: 'bottom',
    halign: 'left',
    bodyPosition: 'down',
    useButtonWidth: false
};

export class PageModal extends React.Component {
    constructor(props) {
        super(props);
        this.bodyEl = document.createElement('div');
        this.bodyEl.style.position = 'fixed';
        this.bodyEl.className = 'page-modal';
        this.state = {
            isOpen: false
        };
    }

    isClickedOutside() {
        let isWithinBody = false;
        const target = event.target;
        isWithinBody = target.classList.contains('js-close-modal');
        return isWithinBody;
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

    componentDidMount() {
        addToModalRoot(this);
    }

    componentWillUnmount() {
        removeFromModalRoot(this);
    }

    updatePosition() {
        if (this.state.isOpen) {
            this.bodyEl.style.left = 0;
            this.bodyEl.style.right = 0;
            this.bodyEl.style.bottom = 0;
            this.bodyEl.style.top = 0;
        } else {
            this.bodyEl.style.left = 'auto';
            this.bodyEl.style.right = 'auto';
            this.bodyEl.style.bottom = 'auto';
            this.bodyEl.style.top = 'auto';
        }
    }

    render() {
        this.updatePosition();
        return this.state.isOpen ? ReactDOM.createPortal(
	        utils.cloneChildren(this.props.children, {
                closePopup:this.closePopup.bind(this)
            }),
            this.bodyEl,
        ) : null;
    }
}

export class PageModalBody extends React.Component {
    render() {
        return <div className="page-modal-mask js-close-modal" style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            alignItems: 'center'
        }}>
            <div className="page-modal-container">
                {utils.cloneChildren(this.props.children, {closePopup:this.props.closePopup})}
            </div>

        </div>;
    }
}