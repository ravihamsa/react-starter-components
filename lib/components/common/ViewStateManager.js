"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ViewState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 7/19/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var NoStateView = function (_Component) {
    _inherits(NoStateView, _Component);

    function NoStateView() {
        _classCallCheck(this, NoStateView);

        return _possibleConstructorReturn(this, (NoStateView.__proto__ || Object.getPrototypeOf(NoStateView)).apply(this, arguments));
    }

    _createClass(NoStateView, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "no-state" },
                "State Not Defined"
            );
        }
    }]);

    return NoStateView;
}(_react.Component);

var ViewState = exports.ViewState = function (_Component2) {
    _inherits(ViewState, _Component2);

    function ViewState() {
        _classCallCheck(this, ViewState);

        return _possibleConstructorReturn(this, (ViewState.__proto__ || Object.getPrototypeOf(ViewState)).apply(this, arguments));
    }

    _createClass(ViewState, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                this.props.children
            );
        }
    }]);

    return ViewState;
}(_react.Component);

var ViewStateManager = function (_Component3) {
    _inherits(ViewStateManager, _Component3);

    function ViewStateManager() {
        _classCallCheck(this, ViewStateManager);

        return _possibleConstructorReturn(this, (ViewStateManager.__proto__ || Object.getPrototypeOf(ViewStateManager)).apply(this, arguments));
    }

    _createClass(ViewStateManager, [{
        key: "render",
        value: function render() {
            var currentState = this.props.currentState;
            var children = this.props.children;
            if (!children.find) {
                children = [children];
            }
            var stateChild = children.find(function (child) {
                var stateArray = child.props.stateNames.replace(/\s/g, '').split(',');
                return stateArray.indexOf(currentState) > -1;
            });
            if (stateChild) {
                return _react2.default.createElement(
                    "div",
                    { className: "state-wrapper" },
                    stateChild
                );
            } else {
                return _react2.default.createElement(
                    "div",
                    null,
                    currentState,
                    " Not Defined"
                );
            }
        }
    }]);

    return ViewStateManager;
}(_react.Component);

ViewStateManager.propTypes = {
    currentState: _propTypes2.default.string.isRequired
};

ViewStateManager.defaultProps = {
    currentState: 'default'
};

exports.default = ViewStateManager;