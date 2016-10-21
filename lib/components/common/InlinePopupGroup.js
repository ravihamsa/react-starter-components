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


var popupStyles = {
    position: 'relative'
};

var bodyStyles = {
    position: 'absolute',
    zIndex: 999
};

var _openPopup = void 0;

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
            if (_openPopup && _openPopup !== this) {
                _openPopup.closePopup();
            }
            this.setState({ open: true });
            _openPopup = this;
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
                isOpen: this.state.open
            };

            return _react2.default.createElement(
                'div',
                _extends({ style: popupStyles }, this.props),
                this.props.children.map(function (children, index) {
                    return _react2.default.cloneElement(children, _extends({}, childProps, { key: index }));
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
            return this.props.isOpen ? _react2.default.createElement(
                'div',
                { style: bodyStyles },
                ' ',
                _react2.default.cloneElement(this.props.children, { closePopup: this.props.closePopup })
            ) : null;
        }
    }]);

    return InlineBody;
}(_react.Component);

exports.default = {
    InlinePopup: InlinePopup,
    InlineButton: InlineButton,
    InlineBody: InlineBody
};