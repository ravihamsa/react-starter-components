"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("../../core");

var _core2 = _interopRequireDefault(_core);

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 7/4/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var cloneChildren = _core2.default.utils.cloneChildren;

var TH = function (_Component) {
    _inherits(TH, _Component);

    function TH() {
        _classCallCheck(this, TH);

        return _possibleConstructorReturn(this, (TH.__proto__ || Object.getPrototypeOf(TH)).apply(this, arguments));
    }

    _createClass(TH, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "th",
                null,
                this.props.label
            );
        }
    }]);

    return TH;
}(_react.Component);

var TD = function (_Component2) {
    _inherits(TD, _Component2);

    function TD() {
        _classCallCheck(this, TD);

        return _possibleConstructorReturn(this, (TD.__proto__ || Object.getPrototypeOf(TD)).apply(this, arguments));
    }

    _createClass(TD, [{
        key: "render",
        value: function render() {
            var self = this;
            var props = self.props;
            var attributes = props.attributes;
            var record = props.record,
                recordIndex = props.recordIndex,
                dataKey = props.dataKey;

            return _react2.default.createElement(
                "td",
                attributes,
                record[dataKey]
            );
        }
    }]);

    return TD;
}(_react.Component);

var TR = function (_Component3) {
    _inherits(TR, _Component3);

    function TR() {
        _classCallCheck(this, TR);

        return _possibleConstructorReturn(this, (TR.__proto__ || Object.getPrototypeOf(TR)).apply(this, arguments));
    }

    _createClass(TR, [{
        key: "render",
        value: function render() {
            var self = this;
            var props = self.props;
            var records = props.records,
                record = props.record;

            var attributes = props.attributes;
            var children = cloneChildren(this.props.children, { records: records, record: record });
            return _react2.default.createElement(
                "tr",
                attributes,
                children
            );
        }
    }]);

    return TR;
}(_react.Component);

var THEAD = function (_Component4) {
    _inherits(THEAD, _Component4);

    function THEAD() {
        _classCallCheck(this, THEAD);

        return _possibleConstructorReturn(this, (THEAD.__proto__ || Object.getPrototypeOf(THEAD)).apply(this, arguments));
    }

    _createClass(THEAD, [{
        key: "render",
        value: function render() {
            var self = this;
            var records = this.props.records;

            var children = cloneChildren(this.props.children, { records: records });
            return _react2.default.createElement(
                "thead",
                null,
                children
            );
        }
    }]);

    return THEAD;
}(_react.Component);

var TBODY = function (_Component5) {
    _inherits(TBODY, _Component5);

    function TBODY() {
        _classCallCheck(this, TBODY);

        return _possibleConstructorReturn(this, (TBODY.__proto__ || Object.getPrototypeOf(TBODY)).apply(this, arguments));
    }

    _createClass(TBODY, [{
        key: "render",
        value: function render() {
            var self = this;
            var props = self.props;
            var records = props.records;

            var children = records.map(function (record, recordIndex) {
                return cloneChildren(this.props.children, { records: records, record: record, recordIndex: recordIndex, key: recordIndex });
            }, this);
            return _react2.default.createElement(
                "tbody",
                null,
                children
            );
        }
    }]);

    return TBODY;
}(_react.Component);

var PaginatedTable = function (_Component6) {
    _inherits(PaginatedTable, _Component6);

    function PaginatedTable() {
        _classCallCheck(this, PaginatedTable);

        var _this6 = _possibleConstructorReturn(this, (PaginatedTable.__proto__ || Object.getPrototypeOf(PaginatedTable)).apply(this, arguments));

        _this6.state = {
            curPage: +_this6.props.curPage || 0,
            perPage: +_this6.props.perPage || 20
        };

        return _this6;
    }

    _createClass(PaginatedTable, [{
        key: "computePagination",
        value: function computePagination() {
            var _state = this.state,
                curPage = _state.curPage,
                perPage = _state.perPage;

            var records = this.props.records;
            this.start = curPage * perPage;
            this.end = Math.min(this.start + perPage, records.length);
            this.renderRecords = records.slice(this.start, this.end);
        }
    }, {
        key: "onNext",
        value: function onNext() {
            if (this.hasNext()) {
                this.setState({
                    curPage: this.state.curPage + 1
                });
            }
        }
    }, {
        key: "onPrev",
        value: function onPrev() {
            if (this.hasPrev()) {
                this.setState({
                    curPage: this.state.curPage - 1
                });
            }
        }
    }, {
        key: "hasNext",
        value: function hasNext() {
            var records = this.props.records;
            var totalFullPages = Math.floor(records.length / this.state.perPage);
            return this.state.curPage < totalFullPages;
        }
    }, {
        key: "hasPrev",
        value: function hasPrev() {
            return this.state.curPage > 0;
        }
    }, {
        key: "render",
        value: function render() {

            var self = this;
            this.computePagination();
            var records = this.props.records;
            var renderRecords = this.renderRecords;
            var totalPages = Math.ceil(records.length / this.state.perPage);
            var children = cloneChildren(this.props.children, {
                records: renderRecords,
                totalPages: totalPages,
                curPage: this.state.curPage,
                perPage: this.state.perPage,
                start: this.start,
                end: this.end,
                totalRecords: records.length,
                onNext: this.onNext.bind(this),
                onPrev: this.onPrev.bind(this),
                hasNext: this.hasNext(),
                hasPrev: this.hasPrev() });
            return _react2.default.createElement(
                "div",
                { className: "paginated-table" },
                children
            );
        }
    }]);

    return PaginatedTable;
}(_react.Component);

var Table = function (_Component7) {
    _inherits(Table, _Component7);

    function Table() {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
    }

    _createClass(Table, [{
        key: "render",
        value: function render() {
            var self = this;
            var props = self.props;
            var attributes = props.attributes;
            var records = props.records,
                errors = props.errors;

            var zeroLength = records.length === 0;

            if (errors) {
                return _react2.default.createElement(
                    "div",
                    null,
                    errors.message
                );
            } else if (zeroLength) {
                var NoRecordsItemProp = self.props.NoRecordsItem;
                return _react2.default.createElement(NoRecordsItemProp, null);
            }

            var children = cloneChildren(this.props.children, { records: records });
            return _react2.default.createElement(
                "table",
                _extends({ className: "table" }, attributes),
                children
            );
        }
    }]);

    return Table;
}(_react.Component);

Table.propTypes = {
    records: _react.PropTypes.array
};

var NoRecordsItem = function (_Component8) {
    _inherits(NoRecordsItem, _Component8);

    function NoRecordsItem() {
        _classCallCheck(this, NoRecordsItem);

        return _possibleConstructorReturn(this, (NoRecordsItem.__proto__ || Object.getPrototypeOf(NoRecordsItem)).apply(this, arguments));
    }

    _createClass(NoRecordsItem, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                "No Records Returned"
            );
        }
    }]);

    return NoRecordsItem;
}(_react.Component);

Table.defaultProps = {
    records: [],
    NoRecordsItem: NoRecordsItem
};

exports.default = {
    PaginatedTable: PaginatedTable,
    Table: Table,
    THEAD: THEAD,
    TBODY: TBODY,
    TH: TH,
    TD: TD,
    TR: TR
};