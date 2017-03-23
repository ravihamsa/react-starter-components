"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FormElement2 = require("./FormElement");

var _FormElement3 = _interopRequireDefault(_FormElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioList = function (_FormElement) {
    _inherits(RadioList, _FormElement);

    function RadioList() {
        _classCallCheck(this, RadioList);

        return _possibleConstructorReturn(this, (RadioList.__proto__ || Object.getPrototypeOf(RadioList)).apply(this, arguments));
    }

    _createClass(RadioList, [{
        key: "render",
        value: function render() {
            var defaultValue = this.getDefaultValue();
            var options = this.props.options || [];
            var formClasses = this.getFormClasses();
            var errors = this.getErrors();
            var name = this.props.name;

            return _react2.default.createElement(
                "fieldset",
                { className: formClasses, onChange: this.onChange.bind(this) },
                this.props.showLabel ? _react2.default.createElement(
                    "label",
                    null,
                    this.props.label
                ) : null,
                options.map(function (option, index) {
                    return _react2.default.createElement(
                        "label",
                        { className: "form-control", key: index },
                        _react2.default.createElement("input", { type: "radio", name: name,
                            defaultChecked: defaultValue === option.id,
                            id: "radio-" + name + "-" + option.id, value: option.id }),
                        _react2.default.createElement(
                            "label",
                            { htmlFor: "radio-" + name + "-" + option.id },
                            option.label
                        )
                    );
                }, this),
                this.props.helperText ? _react2.default.createElement(
                    "small",
                    { className: "text-muted" },
                    this.props.helperText
                ) : '',
                errors.length > 0 ? _react2.default.createElement(
                    "small",
                    { className: "text-danger" },
                    errors[0].message
                ) : ''
            );
        }
    }]);

    return RadioList;
}(_FormElement3.default);

exports.default = RadioList;