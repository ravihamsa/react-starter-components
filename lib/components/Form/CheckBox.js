/**
 * Created by ravi.hamsa on 6/29/16.
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

var _FormElement2 = require('./FormElement');

var _FormElement3 = _interopRequireDefault(_FormElement2);

var CheckBox = (function (_FormElement) {
    _inherits(CheckBox, _FormElement);

    function CheckBox() {
        _classCallCheck(this, CheckBox);

        _get(Object.getPrototypeOf(CheckBox.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(CheckBox, [{
        key: "getValueFromNode",
        value: function getValueFromNode(node) {
            return node.checked;
        }
    }, {
        key: "render",
        value: function render() {

            var defaultValue = this.getDefaultValue();
            var formClasses = this.getFormClasses();

            return _react2["default"].createElement(
                "fieldset",
                { className: formClasses },
                _react2["default"].createElement(
                    "div",
                    { "class": "checkbox" },
                    _react2["default"].createElement(
                        "label",
                        null,
                        _react2["default"].createElement("input", { type: "checkbox", name: this.props.name,
                            placeholder: this.props.placeholder, onChange: this.onChange.bind(this),
                            defaultChecked: defaultValue }),
                        " ",
                        this.props.label
                    ),
                    this.props.helperText ? _react2["default"].createElement(
                        "small",
                        { className: "text-muted" },
                        this.props.helperText
                    ) : '',
                    this.props.errors ? _react2["default"].createElement(
                        "small",
                        { className: "text-muted" },
                        this.props.errors
                    ) : ''
                )
            );
        }
    }]);

    return CheckBox;
})(_FormElement3["default"]);

CheckBox.propTypes = {
    type: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string.isRequired,
    label: _react.PropTypes.string.isRequired,
    defaultValue: _react.PropTypes.bool,
    options: _react.PropTypes.array
};

exports["default"] = CheckBox;
module.exports = exports["default"];