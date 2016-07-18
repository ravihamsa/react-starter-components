/**
 * Created by ravi.hamsa on 6/28/16.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var identity = function identity(arg1) {
    return arg1;
};

var cloneChildren = function cloneChildren(children, props) {
    if (children.map) {
        return children.map(function (child, index) {
            var key = props.key;
            if (key === undefined) {
                key = index;
            }
            return _react2["default"].cloneElement(child, _extends({}, props, { key: key }));
        });
    } else {
        return _react2["default"].cloneElement(children, _extends({}, props));
    }
};

exports["default"] = { identity: identity, cloneChildren: cloneChildren };
module.exports = exports["default"];