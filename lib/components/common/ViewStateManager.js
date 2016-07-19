/**
 * Created by ravi.hamsa on 7/19/16.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var NoStateView = (function (_Component) {
    _inherits(NoStateView, _Component);

    function NoStateView() {
        _classCallCheck(this, NoStateView);

        _get(Object.getPrototypeOf(NoStateView.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(NoStateView, [{
        key: "render",
        value: function render() {
            _react2["default"].createElement(
                "div",
                { className: "no-state" },
                "State Not Defined"
            );
        }
    }]);

    return NoStateView;
})(_react.Component);

var ViewStateManager = (function (_Component2) {
    _inherits(ViewStateManager, _Component2);

    function ViewStateManager() {
        _classCallCheck(this, ViewStateManager);

        _get(Object.getPrototypeOf(ViewStateManager.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ViewStateManager, [{
        key: "render",
        value: function render() {
            var currentState = this.props.currentState;
            var children = this.props.children;
            if (!children.filter) {
                children = [children];
            }
            var stateChild = children.filter(function (child) {
                var stateArray = child.props.stateNames.replace(/\s/g, '').split(',');
                return stateArray.indexOf(currentState) > -1;
            });
            if (stateChild) {
                return _react2["default"].createElement(
                    "div",
                    { className: "state-wrapper" },
                    stateChild
                );
            } else {
                return _react2["default"].createElement(NoStateView, null);
            }
        }
    }]);

    return ViewStateManager;
})(_react.Component);

ViewStateManager.propTypes = {
    currentState: _react.PropTypes.string.isRequired
};

ViewStateManager.defaultProps = {
    currentState: 'default'
};

exports["default"] = ViewStateManager;
module.exports = exports["default"];