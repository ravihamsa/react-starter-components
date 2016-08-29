'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 7/2/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var popupStyles = {};

var bodyStyles = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    zIndex: 999

};
var maskStyles = {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
};

var popupContainerStyles = {
    position: 'fixed',
    zIndex: 998,
    backgroundColor: 'rgba(0,0,0,0.5)',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
};

var openPopup = void 0;

var Popup = function (_Component) {
    _inherits(Popup, _Component);

    function Popup() {
        _classCallCheck(this, Popup);

        var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));

        _this.state = {
            open: false
        };
        return _this;
    }

    _createClass(Popup, [{
        key: 'openPopup',
        value: function openPopup() {
            this.setState({ open: true });
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this.setState({ open: false });
        }
    }, {
        key: 'togglePopup',
        value: function togglePopup() {
            this.state.open ? this.closePopup() : this.openPopup();
        }
    }, {
        key: 'itemClick',
        value: function itemClick() {
            if (this.props.itemClick) {
                this.props.itemClick(arguments);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var childProps = {
                togglePopup: this.togglePopup.bind(this),
                closePopup: this.closePopup.bind(this),
                itemClick: this.itemClick.bind(this),
                isOpen: this.state.open,
                isModal: this.props.isModal
            };

            console.log(this.state.open, '*****122');

            return _react2.default.createElement(
                'div',
                _extends({ styles: popupStyles }, this.props),
                this.props.children.map(function (children, index) {
                    return _react2.default.cloneElement(children, _extends({}, childProps, { key: index }));
                })
            );
        }
    }]);

    return Popup;
}(_react.Component);

Popup.defaultProps = {
    isModal: true
};

var PopupButton = function (_Component2) {
    _inherits(PopupButton, _Component2);

    function PopupButton() {
        _classCallCheck(this, PopupButton);

        return _possibleConstructorReturn(this, (PopupButton.__proto__ || Object.getPrototypeOf(PopupButton)).apply(this, arguments));
    }

    _createClass(PopupButton, [{
        key: 'render',
        value: function render() {
            return _react2.default.cloneElement(this.props.children, { onClick: this.props.togglePopup });
        }
    }]);

    return PopupButton;
}(_react.Component);

var PopupBody = function (_Component3) {
    _inherits(PopupBody, _Component3);

    function PopupBody() {
        _classCallCheck(this, PopupBody);

        return _possibleConstructorReturn(this, (PopupBody.__proto__ || Object.getPrototypeOf(PopupBody)).apply(this, arguments));
    }

    _createClass(PopupBody, [{
        key: 'maskClick',
        value: function maskClick() {
            if (this.props.isModal) {
                this.props.closePopup();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props.isOpen, '******');

            if (this.props.isOpen) {
                return _react2.default.createElement(
                    'div',
                    { style: popupContainerStyles },
                    _react2.default.createElement('div', { style: maskStyles, onClick: this.maskClick.bind(this) }),
                    _react2.default.createElement(
                        'div',
                        {
                            style: bodyStyles },
                        ' ',
                        _react2.default.cloneElement(this.props.children, { closePopup: this.props.closePopup })
                    )
                );
            } else {
                return _react2.default.createElement('div', null);
            }
        }
    }]);

    return PopupBody;
}(_react.Component);

exports.default = {
    Popup: Popup,
    PopupButton: PopupButton,
    PopupBody: PopupBody
};