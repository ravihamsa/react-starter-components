'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PageModalBody = exports.PageModal = exports.InlineModalBody = exports.InlineModalButton = exports.InlineModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('../../core/utils');

var _utils2 = _interopRequireDefault(_utils);

var _rxutils = require('./../../core/rxutils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rootStyle = {
    position: 'absolute',
    top: 0,
    left: 0
};

var popups = [];

var inlineModalRoot = null;

if (typeof document !== 'undefined') {
    inlineModalRoot = document.createElement('div');
    inlineModalRoot.className = 'modal-root';
    for (var i in rootStyle) {
        inlineModalRoot.style[i] = rootStyle[i];
    }
    document.body.appendChild(inlineModalRoot);
}

var addToModalRoot = function addToModalRoot(modal) {
    inlineModalRoot.appendChild(modal.bodyEl);
    popups.push(modal);
};

var removeFromModalRoot = function removeFromModalRoot(modal) {
    inlineModalRoot.removeChild(modal.bodyEl);
    var elementIndex = _utils._.indexOf(popups, function (item) {
        return item === modal;
    });
    popups.splice(elementIndex, 1);
};

var clickSubscription = void 0;

var subscribeBodyClick = function subscribeBodyClick() {
    if (!clickSubscription) {
        clickSubscription = _rxutils.bodyClick$.filter(function () {
            return popups.length > 0;
        }).subscribe(function (event) {
            var count = popups.length;
            while (count--) {
                var curPopup = popups[count];
                var isClickedOutside = curPopup.isClickedOutside(event);
                if (!isClickedOutside) {
                    break;
                } else {
                    curPopup.closePopup();
                }
            }
        });
    }
};

var unSubscribeBodyClick = function unSubscribeBodyClick() {
    if (clickSubscription) {
        clickSubscription.unsubscribe();
        clickSubscription = null;
    }
};

var InlineModal = exports.InlineModal = function (_Component) {
    _inherits(InlineModal, _Component);

    function InlineModal(props) {
        _classCallCheck(this, InlineModal);

        var _this = _possibleConstructorReturn(this, (InlineModal.__proto__ || Object.getPrototypeOf(InlineModal)).call(this, props));

        _this.state = {
            isOpen: false
        };
        _this.bodyEl = null;
        _this.buttonEl = null;
        return _this;
    }

    _createClass(InlineModal, [{
        key: 'setOpen',
        value: function setOpen(isOpen) {

            if (isOpen) {
                subscribeBodyClick();
            } else {
                unSubscribeBodyClick();
            }

            this.setState({
                isOpen: isOpen
            });

            if (isOpen && this.props.onOpenModal) {
                this.props.onOpenModal();
            } else if (!isOpen && this.props.onCloseModal) {
                this.props.onCloseModal();
            }
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this.setOpen(false);
        }
    }, {
        key: 'openPopup',
        value: function openPopup() {
            this.setOpen(true);
        }
    }, {
        key: 'togglePopup',
        value: function togglePopup() {
            if (!this.props.disabled) {
                this.setOpen(!this.state.isOpen);
            }
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return {
                placeholder: this.placeholderEl.getBoundingClientRect(),
                button: this.buttonEl.getBoundingClientRect(),
                body: this.bodyEl.getBoundingClientRect()
            };
        }
    }, {
        key: 'setButtonElement',
        value: function setButtonElement(button) {
            this.buttonEl = button;
        }
    }, {
        key: 'setBodyElement',
        value: function setBodyElement(element) {
            this.bodyEl = element;
            addToModalRoot(this);
        }
    }, {
        key: 'unsetBodyElement',
        value: function unsetBodyElement() {
            removeFromModalRoot(this);
            this.bodyEl = null;
        }
    }, {
        key: 'isClickedOutside',
        value: function isClickedOutside(event) {
            var isWithinBody = false;
            var isWithinButton = false;
            var target = event.target;
            var bodyRoot = this.bodyEl;
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
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { style: {
                        position: 'relative'
                    }, className: 'inline-modal modal-open-' + this.state.isOpen, ref: function ref(element) {
                        return _this2.modalContainerEl = element;
                    } },
                _utils2.default.cloneChildren(this.props.children[0], {
                    togglePopup: this.togglePopup.bind(this),
                    setButtonElement: this.setButtonElement.bind(this)
                }),
                this.state.isOpen ? _utils2.default.cloneChildren(this.props.children[1], {
                    closePopup: this.closePopup.bind(this),
                    getPosition: this.getPosition.bind(this),
                    setBodyElement: this.setBodyElement.bind(this),
                    unsetBodyElement: this.unsetBodyElement.bind(this)
                }) : null,
                _react2.default.createElement('div', { ref: function ref(element) {
                        return _this2.placeholderEl = element;
                    } })
            );
        }
    }]);

    return InlineModal;
}(_react.Component);

var InlineModalButton = exports.InlineModalButton = function (_Component2) {
    _inherits(InlineModalButton, _Component2);

    function InlineModalButton() {
        _classCallCheck(this, InlineModalButton);

        return _possibleConstructorReturn(this, (InlineModalButton.__proto__ || Object.getPrototypeOf(InlineModalButton)).apply(this, arguments));
    }

    _createClass(InlineModalButton, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var domNode = _reactDom2.default.findDOMNode(this.rootEl);
            this.props.setButtonElement(domNode);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var childNode = _react2.default.Children.only(this.props.children);
            return _react2.default.cloneElement(childNode, {
                onClick: this.props.togglePopup,
                ref: function ref(element) {
                    return _this4.rootEl = element;
                }
            });
        }
    }]);

    return InlineModalButton;
}(_react.Component);

var InlineModalBody = exports.InlineModalBody = function (_Component3) {
    _inherits(InlineModalBody, _Component3);

    function InlineModalBody(props) {
        _classCallCheck(this, InlineModalBody);

        var _this5 = _possibleConstructorReturn(this, (InlineModalBody.__proto__ || Object.getPrototypeOf(InlineModalBody)).call(this, props));

        _this5.el = document.createElement('div');
        _this5.el.style.position = 'absolute';
        _this5.el.style.visibility = 'hidden';
        _this5.el.className = _this5.props.className || '';
        return _this5;
    }

    _createClass(InlineModalBody, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.positionElement();
            this.props.setBodyElement(this.el);
            /*this.clickSubscription = bodyClick$
            .filter(event => this.isClickedOutside(event)).take(1)
            .subscribe(() => this.props.closePopup());*/
        }
    }, {
        key: 'positionElement',
        value: function positionElement() {
            var _this6 = this;

            setTimeout(function () {
                var _props$getPosition = _this6.props.getPosition(),
                    placeholder = _props$getPosition.placeholder,
                    button = _props$getPosition.button,
                    body = _props$getPosition.body;

                var left = placeholder.x;
                var top = placeholder.y + window.pageYOffset;

                switch (_this6.props.valign) {
                    case 'top':
                        top -= button.height;
                        break;

                    case 'bottom':
                        //do nothing
                        break;
                }

                switch (_this6.props.halign) {
                    case 'left':
                        //do nothing
                        break;

                    case 'right':
                        left -= body.width - button.width;
                        break;

                    case 'center':
                        left -= (body.width - button.width) / 2;
                        break;
                }

                switch (_this6.props.bodyPosition) {
                    case 'up':
                        top -= button.height + body.height;
                        break;
                }

                if (_this6.props.useButtonWidth) {
                    _this6.el.style.width = button.width + 'px';
                }

                _this6.el.style.left = left + 'px';
                _this6.el.style.top = top + 'px';
                _this6.el.style.visibility = 'visible';
                _this6.el.classList.add('valign-' + _this6.props.valign);
                _this6.el.classList.add('halign-' + _this6.props.halign);
                _this6.el.classList.add('body-pos-' + _this6.props.bodyPosition);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.unsetBodyElement(this.el);
            if (this.clickSubscription) {
                this.clickSubscription.unsubscribe();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _reactDom2.default.createPortal(this.props.children, this.el);
        }
    }]);

    return InlineModalBody;
}(_react.Component);

InlineModalBody.defaultProps = {
    valign: 'bottom',
    halign: 'left',
    bodyPosition: 'down',
    useButtonWidth: false
};

var PageModal = exports.PageModal = function (_React$Component) {
    _inherits(PageModal, _React$Component);

    function PageModal(props) {
        _classCallCheck(this, PageModal);

        var _this7 = _possibleConstructorReturn(this, (PageModal.__proto__ || Object.getPrototypeOf(PageModal)).call(this, props));

        _this7.bodyEl = document.createElement('div');
        _this7.bodyEl.style.position = 'fixed';
        _this7.bodyEl.className = 'page-modal';
        _this7.state = {
            isOpen: false
        };
        return _this7;
    }

    _createClass(PageModal, [{
        key: 'isClickedOutside',
        value: function isClickedOutside() {
            var isWithinBody = false;
            var target = event.target;
            isWithinBody = target.classList.contains('js-close-modal');
            return isWithinBody;
        }
    }, {
        key: 'setOpen',
        value: function setOpen(bool) {
            this.setState({
                isOpen: bool
            });
            if (bool && this.props.onOpenModal) {
                this.props.onOpenModal();
            } else if (!bool && this.props.onCloseModal) {
                this.props.onCloseModal();
            }
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this.setOpen(false);
        }
    }, {
        key: 'openPopup',
        value: function openPopup() {
            this.setOpen(true);
        }
    }, {
        key: 'togglePopup',
        value: function togglePopup() {
            this.setOpen(!this.state.isOpen);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            addToModalRoot(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            removeFromModalRoot(this);
        }
    }, {
        key: 'updatePosition',
        value: function updatePosition() {
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
    }, {
        key: 'render',
        value: function render() {
            this.updatePosition();
            return this.state.isOpen ? _reactDom2.default.createPortal(_utils2.default.cloneChildren(this.props.children, {
                closePopup: this.closePopup.bind(this)
            }), this.bodyEl) : null;
        }
    }]);

    return PageModal;
}(_react2.default.Component);

var PageModalBody = exports.PageModalBody = function (_React$Component2) {
    _inherits(PageModalBody, _React$Component2);

    function PageModalBody() {
        _classCallCheck(this, PageModalBody);

        return _possibleConstructorReturn(this, (PageModalBody.__proto__ || Object.getPrototypeOf(PageModalBody)).apply(this, arguments));
    }

    _createClass(PageModalBody, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'page-modal-mask js-close-modal', style: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'absolute',
                        alignItems: 'center'
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'page-modal-container' },
                    _utils2.default.cloneChildren(this.props.children, {
                        closePopup: this.props.closePopup
                    })
                )
            );
        }
    }]);

    return PageModalBody;
}(_react2.default.Component);