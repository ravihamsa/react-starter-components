'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SimpleElement2 = require('./SimpleElement');

var _SimpleElement3 = _interopRequireDefault(_SimpleElement2);

var _Month = require('../Form/DatePicker/Month');

var _Month2 = _interopRequireDefault(_Month);

var _InlineModalGroup = require('../common/InlineModalGroup');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../core/utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleDatePicker = function (_SimpleElement) {
    _inherits(SimpleDatePicker, _SimpleElement);

    function SimpleDatePicker() {
        _classCallCheck(this, SimpleDatePicker);

        return _possibleConstructorReturn(this, (SimpleDatePicker.__proto__ || Object.getPrototypeOf(SimpleDatePicker)).apply(this, arguments));
    }

    _createClass(SimpleDatePicker, [{
        key: 'onChange',
        value: function onChange(selectedDate) {
            this.updateValue(selectedDate);
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            var inputFormat = _utils2.default.getStarterConfig('dateFormat');
            return (0, _moment2.default)().format(inputFormat);
        }
    }, {
        key: 'applyValue',
        value: function applyValue(value) {
            if (value !== undefined && value !== '') {
                this.updateValue(value);
            } else {
                this.updateValue(this.getDefaultValue());
            }
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            if (this.ref_modal) {
                this.ref_modal.closePopup();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = this.filterDomProps(this.props);
            var inputFormat = _utils2.default.getStarterConfig('dateFormat');
            props.className = 'form-control';
            props.readOnly = true;
            props.value = props.value || this.getDefaultValue();
            var className = this.getClassNames();
            var _props = this.props,
                valign = _props.valign,
                bodyPosition = _props.bodyPosition,
                _props$minDate = _props.minDate,
                minDate = _props$minDate === undefined ? (0, _moment2.default)().format(inputFormat) : _props$minDate,
                _props$maxDate = _props.maxDate,
                maxDate = _props$maxDate === undefined ? (0, _moment2.default)().add(10, 'years').format(inputFormat) : _props$maxDate;


            return _react2.default.createElement(
                'div',
                { className: className },
                _react2.default.createElement(
                    _InlineModalGroup.InlineModal,
                    { ref: function ref(modal) {
                            return _this2.ref_modal = modal;
                        } },
                    _react2.default.createElement(
                        _InlineModalGroup.InlineModalButton,
                        null,
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                props,
                                props.value
                            ),
                            _react2.default.createElement('span', { className: 'calendar icon' })
                        )
                    ),
                    _react2.default.createElement(
                        _InlineModalGroup.InlineModalBody,
                        { valign: valign, bodyPosition: bodyPosition },
                        _react2.default.createElement(_Month2.default, { onDateSelect: this.onChange.bind(this), selectedDate: props.value,
                            displayDate: props.value,
                            minDate: minDate, maxDate: maxDate,
                            closePopup: this.closePopup.bind(this) })
                    )
                )
            );
        }
    }]);

    return SimpleDatePicker;
}(_SimpleElement3.default);

exports.default = SimpleDatePicker;


SimpleDatePicker.defaultProps = _extends({}, _SimpleElement3.default.defaultProps, {
    type: 'date-picker',
    bodyPosition: 'down',
    valign: 'bottom'
});