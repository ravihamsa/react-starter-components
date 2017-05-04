'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _List = require('../../common/List');

var _List2 = _interopRequireDefault(_List);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 7/2/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DATE_FORMAT = 'DD/MM/YYYY';

var shortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (nm, index) {
    return {
        id: index,
        name: nm
    };
});

var today = (0, _moment2.default)();

var Day = function (_Component) {
    _inherits(Day, _Component);

    function Day() {
        _classCallCheck(this, Day);

        return _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).apply(this, arguments));
    }

    _createClass(Day, [{
        key: 'render',
        value: function render() {
            var item = this.props.itemData;

            var booleanClasses = _lodash2.default.map(['today', 'selected', 'selectable'], function (className) {
                return item[className] === true ? className : '';
            });
            booleanClasses.push('day');
            return _react2.default.createElement(
                'td',
                { id: item.id,
                    onClick: this.onClickHandler.bind(this) },
                _react2.default.createElement(
                    'div',
                    { className: booleanClasses.join(' ') },
                    item.date
                )
            );
        }
    }, {
        key: 'onClickHandler',
        value: function onClickHandler() {
            if (this.props.itemData.selectable) {
                //this.props.selectionStore.onSelect(this.props.itemData);
                this.props.onDateClick(this.props.itemData);
            }
        }
    }]);

    return Day;
}(_react.Component);

var WeekHeading = function (_Component2) {
    _inherits(WeekHeading, _Component2);

    function WeekHeading() {
        _classCallCheck(this, WeekHeading);

        return _possibleConstructorReturn(this, (WeekHeading.__proto__ || Object.getPrototypeOf(WeekHeading)).apply(this, arguments));
    }

    _createClass(WeekHeading, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'td',
                { className: 'day-heading' },
                this.props.itemData.name
            );
        }
    }]);

    return WeekHeading;
}(_react.Component);

var Month = function (_Component3) {
    _inherits(Month, _Component3);

    function Month(props) {
        _classCallCheck(this, Month);

        var _this3 = _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).apply(this, arguments));

        _this3.selectionStore = props.selectionStore;
        _this3.state = {
            displayDate: props.displayDate || today.format(DATE_FORMAT),
            selectedDate: props.selectedDate || null,
            minDate: props.minDate || today.format(DATE_FORMAT),
            maxDate: props.maxDate
        };
        return _this3;
    }

    _createClass(Month, [{
        key: 'bumpMonth',
        value: function bumpMonth(diff) {
            var displayDate = (0, _moment2.default)(this.state.displayDate, DATE_FORMAT);
            this.setState({ 'displayDate': displayDate.add(diff, 'month').format(DATE_FORMAT) });
        }
    }, {
        key: 'nextMonth',
        value: function nextMonth(event) {
            event.preventDefault();
            this.bumpMonth(1);
        }
    }, {
        key: 'prevMonth',
        value: function prevMonth(event) {
            event.preventDefault();
            this.bumpMonth(-1);
        }
    }, {
        key: 'onDateClick',
        value: function onDateClick(dateObject) {
            var dateValue = dateObject.dateObject.format(DATE_FORMAT);
            this.setState({
                selectedDate: dateObject.dateObject.format(DATE_FORMAT)
            });
            this.props.onDateSelect(dateValue);
            this.props.closePopup();
        }
    }, {
        key: 'render',
        value: function render() {
            var displayDate = (0, _moment2.default)(this.state.displayDate, DATE_FORMAT);
            var selectedDate = (0, _moment2.default)(this.state.selectedDate, DATE_FORMAT);
            var minDate = (0, _moment2.default)(this.state.minDate, DATE_FORMAT);
            var maxDate = (0, _moment2.default)(this.state.maxDate, DATE_FORMAT);
            var today = (0, _moment2.default)();

            var startDate = displayDate.clone().startOf('month').startOf('week');

            var rows = [];
            var cols = [];
            rows.push(_react2.default.createElement(_List2.default, { items: shortDays, tagName: 'tr', ListItem: WeekHeading, key: rows.length }));
            for (var i = 0; i < 42; i++) {
                cols.push({
                    id: 7 + i,
                    dateObject: startDate.clone(),
                    today: startDate.isSame(today, 'day'),
                    selected: selectedDate && selectedDate.isSame(startDate),
                    selectable: startDate.isSame(displayDate, 'month') && startDate.diff(minDate, 'day') >= 0 && maxDate.diff(startDate, 'day') >= 0,
                    day: startDate.day(),
                    date: startDate.date()
                });

                startDate.add(1, 'days');

                if (cols.length === 7) {
                    rows.push(_react2.default.createElement(_List2.default, { items: cols, ListItem: Day, tagName: 'tr', key: i, onDateClick: this.onDateClick.bind(this) }));
                    cols = [];
                }
            }

            return _react2.default.createElement(
                'div',
                { className: 'month' },
                _react2.default.createElement(
                    'div',
                    { className: 'month-header' + ' row no-gutters' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-md-3' },
                        _react2.default.createElement(
                            'a',
                            { href: '#', className: 'month-prev',
                                onClick: this.prevMonth.bind(this) },
                            '<'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'month-name' + ' col-md-6' },
                        displayDate.format('MMM - YYYY')
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-md-3' },
                        _react2.default.createElement(
                            'a',
                            { href: '#', className: 'month-next',
                                onClick: this.nextMonth.bind(this) },
                            '>'
                        )
                    )
                ),
                _react2.default.createElement(
                    'table',
                    null,
                    _react2.default.createElement(
                        'tbody',
                        null,
                        rows
                    )
                )
            );
        }
    }]);

    return Month;
}(_react.Component);

exports.default = Month;