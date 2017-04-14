'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormElement2 = require('../FormElement');

var _FormElement3 = _interopRequireDefault(_FormElement2);

var _common = require('../../common');

var _common2 = _interopRequireDefault(_common);

var _Month = require('./Month');

var _Month2 = _interopRequireDefault(_Month);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/29/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _common$InlinePopupGr = _common2.default.InlinePopupGroup,
    InlinePopup = _common$InlinePopupGr.InlinePopup,
    InlineButton = _common$InlinePopupGr.InlineButton,
    InlineBody = _common$InlinePopupGr.InlineBody;

var DatePicker = function (_FormElement) {
    _inherits(DatePicker, _FormElement);

    function DatePicker() {
        _classCallCheck(this, DatePicker);

        return _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));
    }

    _createClass(DatePicker, [{
        key: 'onDateSelect',
        value: function onDateSelect(value) {
            var name = this.props.name;
            /*this.context.valueStore.set({[name]: value});
            this.setState({defaultValue:value})
            this.refs.inputField.value = value;*/
            this.setValue(value);
            this.setState({ defaultValue: value });
            this.refs.inputField.value = value;
        }
    }, {
        key: 'render',
        value: function render() {

            var defaultValue = this.getDefaultValue();
            var formClasses = this.getFormClasses();
            var errors = this.getErrors();

            return _react2.default.createElement(
                'fieldset',
                { className: formClasses },
                this.props.showLabel ? _react2.default.createElement(
                    'label',
                    { className: 'element-label' },
                    this.props.label
                ) : null,
                _react2.default.createElement(
                    InlinePopup,
                    null,
                    _react2.default.createElement(
                        InlineButton,
                        null,
                        _react2.default.createElement('input', { type: this.props.type, className: 'form-control', name: this.props.name,
                            placeholder: this.props.placeholder, onChange: this.onChange.bind(this), defaultValue: defaultValue,
                            readOnly: 'true', ref: 'inputField' })
                    ),
                    _react2.default.createElement(
                        InlineBody,
                        null,
                        _react2.default.createElement(_Month2.default, { onDateSelect: this.onDateSelect.bind(this), selectedDate: defaultValue })
                    )
                ),
                this.props.helperText ? _react2.default.createElement(
                    'small',
                    { className: 'text-muted' },
                    this.props.helperText
                ) : '',
                errors.length > 0 ? _react2.default.createElement(
                    'small',
                    { className: 'text-danger' },
                    errors[0].message
                ) : ''
            );
        }
    }]);

    return DatePicker;
}(_FormElement3.default);

exports.default = DatePicker;


DatePicker.defaultProps = _extends({}, _FormElement3.default.defaultProps, {
    type: 'date-picker'
});