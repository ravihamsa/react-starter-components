'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rxutils = require('./../../core/rxutils');

var _utils = require('./../../core/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 7/2/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var popupStyles = {
    position: 'relative'
};

var bodyStyles = {
    position: 'absolute',
    zIndex: 999
};

var _openPopup = void 0;
var clickSubscription = void 0;
var clickInsideSubscription = void 0;

var InlinePopup = function (_Component) {
    _inherits(InlinePopup, _Component);

    function InlinePopup() {
        _classCallCheck(this, InlinePopup);

        var _this = _possibleConstructorReturn(this, (InlinePopup.__proto__ || Object.getPrototypeOf(InlinePopup)).apply(this, arguments));

        _this.state = {
            open: false
        };
        return _this;
    }

    _createClass(InlinePopup, [{
        key: 'openPopup',
        value: function openPopup() {
            var _this2 = this;

            if (_openPopup && _openPopup !== this) {
                _openPopup.closePopup();
            }
            this.setState({ open: true });
            _openPopup = this;
            clickSubscription = _rxutils.bodyClick$.filter(function (event) {
                return _this2.isClickedOutside(event, _this2);
            }).take(1).subscribe(function () {
                return _this2.closePopup();
            });
        }
    }, {
        key: 'isClickedOutside',
        value: function isClickedOutside(event, popup) {
            var isWithinPopup = false;
            var target = event.target;
            var bodyRoot = popup.refs.inlineBody.portalElement;
            while (target.parentNode && !isWithinPopup) {
                if (target === bodyRoot) {
                    isWithinPopup = true;
                }
                target = target.parentNode;
            }
            return !isWithinPopup;
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            if (clickSubscription) {
                clickSubscription.unsubscribe();
            }
            if (this.props.onClosePopup) {
                this.props.onClosePopup();
            }
            this.setState({ open: false });
        }
    }, {
        key: 'togglePopup',
        value: function togglePopup() {
            if (!this.props.disabled) {
                this.state.open ? this.closePopup() : this.openPopup();
            }
        }
    }, {
        key: 'itemClick',
        value: function itemClick() {
            if (this.props.itemClick) {
                this.props.itemClick(arguments);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (_openPopup && _openPopup === this) {
                _openPopup = null;
            }
        }
    }, {
        key: 'getButtonBounds',
        value: function getButtonBounds() {
            var _refs = this.refs,
                inlineButton = _refs.inlineButton,
                inlineBody = _refs.inlineBody;

            return ReactDOM.findDOMNode(inlineButton).getBoundingClientRect();
        }
    }, {
        key: 'render',
        value: function render() {
            var childProps = {
                togglePopup: this.togglePopup.bind(this),
                closePopup: this.closePopup.bind(this),
                itemClick: this.itemClick.bind(this),
                getButtonBounds: this.getButtonBounds.bind(this),
                isOpen: this.state.open
            };

            var domProps = _utils._.pick(this.props, 'className');
            var refMap = ['inlineButton', 'inlineBody'];

            return _react2.default.createElement(
                'div',
                _extends({ style: popupStyles, ref: 'rootEl' }, domProps),
                this.props.children.map(function (children, index) {
                    return _react2.default.cloneElement(children, _extends({}, childProps, { key: index, ref: refMap[index] }));
                })
            );
        }
    }]);

    return InlinePopup;
}(_react.Component);

var InlineButton = function (_Component2) {
    _inherits(InlineButton, _Component2);

    function InlineButton() {
        _classCallCheck(this, InlineButton);

        return _possibleConstructorReturn(this, (InlineButton.__proto__ || Object.getPrototypeOf(InlineButton)).apply(this, arguments));
    }

    _createClass(InlineButton, [{
        key: 'render',
        value: function render() {
            return _react2.default.cloneElement(this.props.children, { onClick: this.props.togglePopup });
        }
    }]);

    return InlineButton;
}(_react.Component);

var InlineBody = function (_Component3) {
    _inherits(InlineBody, _Component3);

    function InlineBody() {
        _classCallCheck(this, InlineBody);

        return _possibleConstructorReturn(this, (InlineBody.__proto__ || Object.getPrototypeOf(InlineBody)).apply(this, arguments));
    }

    _createClass(InlineBody, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { className: 'inline-popop-body' });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var p = this.portalElement;
            if (!p) {
                p = document.createElement('div');
                document.body.appendChild(p);
                this.portalElement = p;
            }
            this.componentDidUpdate();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.componentDidUpdate();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.removeChild(this.portalElement);
        }
    }, {
        key: 'updatePortalElementPosition',
        value: function updatePortalElementPosition() {
            var p = this.portalElement;
            if (!p) {
                return;
            }
            var refEl = ReactDOM.findDOMNode(this);
            var bounds = refEl.getBoundingClientRect();
            var buttonBounds = this.props.getButtonBounds();
            var style = { position: 'absolute' };
            style.left = bounds.left + 'px';
            style.top = bounds.top + window.scrollY + 'px';
            style.width = buttonBounds.width + 'px';
            for (var i in style) {
                p.style[i] = style[i];
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _props$className = this.props.className,
                className = _props$className === undefined ? '' : _props$className;

            if (this.props.isOpen) {
                this.updatePortalElementPosition();
                var style = { position: 'absolute' };
                var buttonBounds = this.props.getButtonBounds();
                var _props = this.props,
                    halign = _props.halign,
                    valign = _props.valign,
                    bodyPosition = _props.bodyPosition;

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
                        style.top = -buttonBounds.height;
                        break;
                }
                switch (bodyPosition) {
                    case 'up':
                        delete style.top;
                        style.bottom = 0;
                        break;
                }
                ReactDOM.render(_react2.default.createElement(
                    'div',
                    { className: className + " inline-popup-body",
                        style: style },
                    _react2.default.cloneElement(this.props.children, { closePopup: this.props.closePopup })
                ), this.portalElement);
            } else {
                ReactDOM.render(_react2.default.createElement('div', null), this.portalElement);
            }
        }
    }]);

    return InlineBody;
}(_react.Component);

InlineBody.defaultProps = {
    valign: 'bottom',
    halign: 'left',
    bodyPosition: 'down'
};

InlinePopup.defaultProps = {
    disabled: false
};

exports.default = {
    InlinePopup: InlinePopup,
    InlineButton: InlineButton,
    InlineBody: InlineBody
};