'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RXFormElement2 = require('./RXFormElement');

var _RXFormElement3 = _interopRequireDefault(_RXFormElement2);

var _Month = require('../common/Month');

var _Month2 = _interopRequireDefault(_Month);

var _InlinePopupGroup = require('../common/InlinePopupGroup');

var _InlinePopupGroup2 = _interopRequireDefault(_InlinePopupGroup);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlinePopup = _InlinePopupGroup2.default.InlinePopup,
    InlineButton = _InlinePopupGroup2.default.InlineButton,
    InlineBody = _InlinePopupGroup2.default.InlineBody;


var inputFormat = 'DD/MM/YYYY';

var RXDatePicker = function (_RXFormElement) {
    _inherits(RXDatePicker, _RXFormElement);

    function RXDatePicker() {
        _classCallCheck(this, RXDatePicker);

        return _possibleConstructorReturn(this, (RXDatePicker.__proto__ || Object.getPrototypeOf(RXDatePicker)).apply(this, arguments));
    }

    _createClass(RXDatePicker, [{
        key: 'onChange',
        value: function onChange(selectedDate) {
            this.updateValue(selectedDate, 'update');
        }
    }, {
        key: 'getRestProps',
        value: function getRestProps() {
            var props = _lodash2.default.omit(this.state, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'error', 'validations', 'activeRules', 'valid', 'serverValidation', '__shadowValue', 'register', 'clear', 'exposeName', 'exposeSelection', 'serverValid', 'serverError', 'displayDate', 'selectedDate');
            props.className = (props.className || '') + ' form-control';
            return props;
        }
    }, {
        key: 'getFormattedDate',
        value: function getFormattedDate(value) {
            if (value !== '') {
                return (0, _moment2.default)(value, inputFormat).format(this.props.displayFormat);
            } else {
                return value;
            }
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {}
    }, {
        key: 'renderElement',
        value: function renderElement() {
            var restProps = this.getRestProps();
            var value = restProps.value;
            restProps.value = this.getFormattedDate(value);
            var _props = this.props,
                _props$valign = _props.valign,
                valign = _props$valign === undefined ? 'top' : _props$valign,
                bodyPosition = _props.bodyPosition;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    InlinePopup,
                    null,
                    _react2.default.createElement(
                        InlineButton,
                        null,
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('input', restProps),
                            _react2.default.createElement('span', { className: 'calendar icon' })
                        )
                    ),
                    _react2.default.createElement(
                        InlineBody,
                        { valign: valign, bodyPosition: bodyPosition },
                        _react2.default.createElement(_Month2.default, { onDateSelect: this.onChange.bind(this), selectedDate: value,
                            displayDate: value,
                            minDate: this.props.minDate, maxDate: this.props.maxDate,
                            closePopup: this.closePopup.bind(this) })
                    )
                )
            );
        }
    }]);

    return RXDatePicker;
}(_RXFormElement3.default);

exports.default = RXDatePicker;


RXDatePicker.defaultProps = _extends({}, _RXFormElement3.default.defaultProps, {
    type: 'date-picker',
    bodyPosition: 'down',
    displayFormat: inputFormat,
    minDate: (0, _moment2.default)().format(inputFormat),
    selectedDate: (0, _moment2.default)().format(inputFormat),
    displayDate: (0, _moment2.default)().format(inputFormat),
    maxDate: (0, _moment2.default)().add(10, 'years').format(inputFormat)
});