/**
 * Created by ravi.hamsa on 7/2/16.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var popupStyles = {
    position: 'relative'
};

var bodyStyles = {
    position: 'absolute',
    zIndex: 999
};

var _openPopup = undefined;

var InlinePopup = (function (_Component) {
    _inherits(InlinePopup, _Component);

    function InlinePopup() {
        _classCallCheck(this, InlinePopup);

        _get(Object.getPrototypeOf(InlinePopup.prototype), 'constructor', this).apply(this, arguments);
        this.state = {
            open: false
        };
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

            return _react2['default'].createElement(
                'div',
                { styles: popupStyles },
                this.props.children.map(function (children, index) {
                    return _react2['default'].cloneElement(children, _extends({}, childProps, { key: index }));
                })
            );
        }
    }]);

    return InlinePopup;
})(_react.Component);

var InlineButton = (function (_Component2) {
    _inherits(InlineButton, _Component2);

    function InlineButton() {
        _classCallCheck(this, InlineButton);

        _get(Object.getPrototypeOf(InlineButton.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(InlineButton, [{
        key: 'render',
        value: function render() {
            return _react2['default'].cloneElement(this.props.children, { onClick: this.props.togglePopup });
        }
    }]);

    return InlineButton;
})(_react.Component);

var InlineBody = (function (_Component3) {
    _inherits(InlineBody, _Component3);

    function InlineBody() {
        _classCallCheck(this, InlineBody);

        _get(Object.getPrototypeOf(InlineBody.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(InlineBody, [{
        key: 'render',
        value: function render() {
            return this.props.isOpen ? _react2['default'].createElement(
                'div',
                { style: bodyStyles },
                ' ',
                _react2['default'].cloneElement(this.props.children, { closePopup: this.props.closePopup })
            ) : null;
        }
    }]);

    return InlineBody;
})(_react.Component);

exports['default'] = {
    InlinePopup: InlinePopup,
    InlineButton: InlineButton,
    InlineBody: InlineBody
};
module.exports = exports['default'];