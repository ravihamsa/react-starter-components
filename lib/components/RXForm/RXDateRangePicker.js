'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RXDropdown2 = require('./RXDropdown');

var _RXDropdown3 = _interopRequireDefault(_RXDropdown2);

var _Month = require('../Form/DatePicker/Month');

var _Month2 = _interopRequireDefault(_Month);

var _InlinePopupGroup = require('../common/InlinePopupGroup');

var _InlinePopupGroup2 = _interopRequireDefault(_InlinePopupGroup);

var _List = require('../common/List');

var _List2 = _interopRequireDefault(_List);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlinePopup = _InlinePopupGroup2.default.InlinePopup,
    InlineButton = _InlinePopupGroup2.default.InlineButton,
    InlineBody = _InlinePopupGroup2.default.InlineBody;

var RXDateRangePicker = function (_RXDropdown) {
    _inherits(RXDateRangePicker, _RXDropdown);

    function RXDateRangePicker(props) {
        _classCallCheck(this, RXDateRangePicker);

        var _this = _possibleConstructorReturn(this, (RXDateRangePicker.__proto__ || Object.getPrototypeOf(RXDateRangePicker)).call(this, props));

        _this.state.showCalendar = false;
        return _this;
    }

    _createClass(RXDateRangePicker, [{
        key: 'toggleCustomCalendar',
        value: function toggleCustomCalendar() {
            this.setState({
                showCalendar: !this.state.showCalendar
            });
        }
    }, {
        key: 'renderElement',
        value: function renderElement() {
            var _this2 = this;

            var _props = this.props,
                _props$valign = _props.valign,
                valign = _props$valign === undefined ? 'top' : _props$valign,
                bodyPosition = _props.bodyPosition,
                _props$ListItem = _props.ListItem,
                ListItem = _props$ListItem === undefined ? _RXDropdown2.RXDropdownItem : _props$ListItem;

            var filteredOptions = _.filter(this.props.options, function (item) {
                return item.name.toLowerCase().indexOf(_this2.state.query.toLowerCase()) > -1;
            });

            return _react2.default.createElement(
                InlinePopup,
                { ref: function ref(element) {
                        return _this2.ref_inlinePopup = element;
                    }, disabled: this.props.disabled },
                _react2.default.createElement(
                    InlineButton,
                    null,
                    this.renderButton()
                ),
                _react2.default.createElement(
                    InlineBody,
                    { valign: valign, bodyPosition: bodyPosition, className: 'inline-popup-body-fullwidth' },
                    _react2.default.createElement(
                        'div',
                        { className: 'drop-down-body' },
                        this.props.showSearch ? _react2.default.createElement(
                            'div',
                            { className: 'drop-down-search-container' },
                            _react2.default.createElement('input', { type: 'text', autoFocus: true, defaultValue: this.state.query, ref: function ref(element) {
                                    return _this2.ref_searchBox = element;
                                },
                                onChange: this.onKeyPressHandler, className: 'drop-down-input',
                                placeholder: this.props.placeholder })
                        ) : null,
                        _react2.default.createElement(
                            'div',
                            { onClick: this.onClickHandler.bind(this), ref: function ref(element) {
                                    return _this2.ref_listRoot = element;
                                } },
                            _react2.default.createElement(_List2.default, { items: filteredOptions, selectionManager: this.selectionManager,
                                selection: this.state.value, ListItem: ListItem })
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: {
                                    position: 'relative'
                                }, onClick: this.toggleCustomCalendar.bind(this) },
                            _react2.default.createElement(
                                'span',
                                null,
                                'show custom calendar'
                            ),
                            this.state.showCalendar ? _react2.default.createElement(
                                'div',
                                { style: {
                                        position: 'absolute'
                                    } },
                                _react2.default.createElement(_Month2.default, null)
                            ) : null
                        )
                    )
                )
            );
        }
    }]);

    return RXDateRangePicker;
}(_RXDropdown3.default);

exports.default = RXDateRangePicker;