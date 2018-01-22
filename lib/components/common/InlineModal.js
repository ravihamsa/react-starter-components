'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InlineModalBody = exports.InlineModalButton = undefined;

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
    position: 'fixed',
    top: 0,
    left: 0
};

var inlineModalRoot = document.createElement('div');
inlineModalRoot.className = 'modal-root';
for (var i in rootStyle) {
    inlineModalRoot.style[i] = rootStyle[i];
}
document.body.appendChild(inlineModalRoot);

var InlineModal = function (_Component) {
    _inherits(InlineModal, _Component);

    function InlineModal(props) {
        _classCallCheck(this, InlineModal);

        var _this = _possibleConstructorReturn(this, (InlineModal.__proto__ || Object.getPrototypeOf(InlineModal)).call(this, props));

        _this.state = {
            isOpen: false
        };
        return _this;
    }

    _createClass(InlineModal, [{
        key: 'setOpen',
        value: function setOpen(bool) {
            this.setState({
                isOpen: bool
            });
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
        key: 'getPosition',
        value: function getPosition() {
            return {
                placeholder: this.placeholderEl.getBoundingClientRect(),
                root: this.modalContainerEl.getBoundingClientRect()
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { style: {
                        position: 'relative'
                    }, className: 'modal-open-' + this.state.isOpen, ref: function ref(element) {
                        return _this2.modalContainerEl = element;
                    } },
                _utils2.default.cloneChildren(this.props.children[0], {
                    togglePopup: this.togglePopup.bind(this)
                }),
                this.state.isOpen ? _utils2.default.cloneChildren(this.props.children[1], {
                    closePopup: this.closePopup.bind(this),
                    getPosition: this.getPosition.bind(this)
                }) : null,
                _react2.default.createElement('div', { ref: function ref(element) {
                        return _this2.placeholderEl = element;
                    } })
            );
        }
    }]);

    return InlineModal;
}(_react.Component);

exports.default = InlineModal;

var InlineModalButton = exports.InlineModalButton = function (_Component2) {
    _inherits(InlineModalButton, _Component2);

    function InlineModalButton() {
        _classCallCheck(this, InlineModalButton);

        return _possibleConstructorReturn(this, (InlineModalButton.__proto__ || Object.getPrototypeOf(InlineModalButton)).apply(this, arguments));
    }

    _createClass(InlineModalButton, [{
        key: 'render',
        value: function render() {
            return _react2.default.cloneElement(this.props.children, {
                onClick: this.props.togglePopup
            });
        }
    }]);

    return InlineModalButton;
}(_react.Component);

var InlineModalBody = exports.InlineModalBody = function (_Component3) {
    _inherits(InlineModalBody, _Component3);

    function InlineModalBody(props) {
        _classCallCheck(this, InlineModalBody);

        var _this4 = _possibleConstructorReturn(this, (InlineModalBody.__proto__ || Object.getPrototypeOf(InlineModalBody)).call(this, props));

        _this4.el = document.createElement('div');
        _this4.el.style.position = 'relative';
        _this4.el.className = _this4.props.className || '';
        return _this4;
    }

    _createClass(InlineModalBody, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this5 = this;

            inlineModalRoot.appendChild(this.el);
            this.positionElement();
            this.clickSubscription = _rxutils.bodyClick$.filter(function (event) {
                return _this5.isClickedOutside(event);
            }).take(1).subscribe(function () {
                return _this5.props.closePopup();
            });
        }
    }, {
        key: 'positionElement',
        value: function positionElement() {
            var _this6 = this;

            setTimeout(function () {
                var _props$getPosition = _this6.props.getPosition(),
                    placeholder = _props$getPosition.placeholder;

                _this6.el.style.left = placeholder.x + 'px';
                _this6.el.style.top = placeholder.y + 'px';
            });
        }
    }, {
        key: 'isClickedOutside',
        value: function isClickedOutside(event) {
            var isWithinPopup = false;
            var target = event.target;
            var bodyRoot = this.el;
            while (target.parentNode && !isWithinPopup) {
                if (target === bodyRoot) {
                    isWithinPopup = true;
                }
                target = target.parentNode;
            }
            return !isWithinPopup;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            inlineModalRoot.removeChild(this.el);
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