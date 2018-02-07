'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _core = require('../../core');

var _core2 = _interopRequireDefault(_core);

var _utils = require('../../core/utils');

var _SimpleEmitter2 = require('../../core/SimpleEmitter');

var _SimpleEmitter3 = _interopRequireDefault(_SimpleEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 7/4/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var cloneChildren = _core2.default.utils.cloneChildren;


var tableConfigDetauls = {
    start: 1,
    perPage: 20,
    sortKey: '',
    sortOrder: 'asc',
    filterKey: '',
    filterQuery: '',
    totalRecords: 0
};

var TableConfigManager = function (_SimpleEmitter) {
    _inherits(TableConfigManager, _SimpleEmitter);

    function TableConfigManager(config) {
        _classCallCheck(this, TableConfigManager);

        var _this = _possibleConstructorReturn(this, (TableConfigManager.__proto__ || Object.getPrototypeOf(TableConfigManager)).call(this, config));

        _this.config = _utils._.extend({}, tableConfigDetauls, config);
        _this.computeOtherConfigs();
        return _this;
    }

    _createClass(TableConfigManager, [{
        key: 'setConfig',
        value: function setConfig(map, isSilent) {
            this.config = _utils._.extend(this.config, map);
            this.computeOtherConfigs();
            if (!isSilent) {
                this.triggerChange();
            }
        }
    }, {
        key: 'computeOtherConfigs',
        value: function computeOtherConfigs() {
            var computed = {};
            var _config = this.config,
                start = _config.start,
                perPage = _config.perPage,
                totalProcessedRecords = _config.totalProcessedRecords;

            computed['end'] = Math.min(start + perPage - 1, totalProcessedRecords);
            computed['hasNext'] = computed['end'] < totalProcessedRecords;
            computed['hasPrev'] = start > 1;
            computed['showPagination'] = totalProcessedRecords > perPage;
            computed['curPage'] = Math.floor(start / perPage);
            computed['totalPages'] = Math.ceil(totalProcessedRecords / perPage);
            this.config = _utils._.extend(this.config, computed);
        }
    }, {
        key: 'bumpPage',
        value: function bumpPage(diff) {
            var _config2 = this.config,
                start = _config2.start,
                perPage = _config2.perPage,
                totalPages = _config2.totalPages;

            var newStart = start + diff * perPage;
            newStart = Math.max(1, newStart);
            newStart = Math.min(newStart, (totalPages - 1) * perPage);
            this.setConfig({
                start: newStart
            });
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {
            if (this.config.hasNext) {
                this.bumpPage(1);
            }
        }
    }, {
        key: 'prevPage',
        value: function prevPage() {
            if (this.config.hasPrev) {
                this.bumpPage(-1);
            }
        }
    }, {
        key: 'triggerChange',
        value: function triggerChange() {
            this.trigger('change', this.config);
        }
    }, {
        key: 'getConfig',
        value: function getConfig() {
            return _utils._.clone(this.config);
        }
    }]);

    return TableConfigManager;
}(_SimpleEmitter3.default);

var Pagination = function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination() {
        _classCallCheck(this, Pagination);

        return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
    }

    _createClass(Pagination, [{
        key: 'prevClick',
        value: function prevClick(e) {
            e.preventDefault();
            this.props.paginationManager.prevPage();
        }
    }, {
        key: 'nextClick',
        value: function nextClick(e) {
            e.preventDefault();
            this.props.paginationManager.nextPage();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                paginationManager = _props.paginationManager,
                children = _props.children,
                totalRecords = _props.totalRecords,
                totalProcessedRecords = _props.totalProcessedRecords;

            var props = paginationManager.getConfig();
            if (!props.showPagination) {
                return null;
            }
            return _react2.default.createElement(
                'div',
                { className: 'pagination' },
                _react2.default.createElement(
                    'div',
                    null,
                    props.start,
                    ' to ',
                    props.end,
                    ' of ',
                    totalProcessedRecords,
                    '(',
                    totalRecords,
                    ')'
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    props.hasPrev ? _react2.default.createElement(
                        'a',
                        { href: '#', onClick: this.prevClick.bind(this) },
                        'Prev'
                    ) : null,
                    props.hasNext ? _react2.default.createElement(
                        'a',
                        { href: '#', onClick: this.nextClick.bind(this) },
                        'Next'
                    ) : null
                )
            );
        }
    }]);

    return Pagination;
}(_react.Component);

var PaginationWrapper = function (_Component2) {
    _inherits(PaginationWrapper, _Component2);

    function PaginationWrapper(props) {
        _classCallCheck(this, PaginationWrapper);

        var _this3 = _possibleConstructorReturn(this, (PaginationWrapper.__proto__ || Object.getPrototypeOf(PaginationWrapper)).call(this, props));

        _this3.paginationManager = new TableConfigManager(_extends({}, _utils._.omit(props, 'children', 'records'), {
            totalRecords: props.records.length,
            totalProcessedRecords: props.records.length
        }));
        return _this3;
    }

    _createClass(PaginationWrapper, [{
        key: 'setConfig',
        value: function setConfig(config) {
            if (config.filterQuery || config.filterKey || config.perPage) {
                config.start = 1;
            }
            this.paginationManager.setConfig(config);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var paginationManager = this.paginationManager;
            this.paginationSubscription = paginationManager.on('change', this.paginationChangeHandler.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.paginationSubscription && this.paginationSubscription();
        }
    }, {
        key: 'paginationChangeHandler',
        value: function paginationChangeHandler(changed) {
            this.forceUpdate();
        }
    }, {
        key: 'getFilteredRecords',
        value: function getFilteredRecords(records) {
            var _paginationManager$ge = this.paginationManager.getConfig(),
                filterKey = _paginationManager$ge.filterKey,
                filterQuery = _paginationManager$ge.filterQuery;

            filterQuery = filterQuery.toLowerCase();
            if (filterQuery === '') {
                return records;
            } else if (filterKey === '') {
                return records.filter(function (item) {
                    var values = Object.values(item).join('');
                    return values.toLowerCase().indexOf(filterQuery) > -1;
                });
            } else {
                return records;
            }
        }
    }, {
        key: 'getSortedRecords',
        value: function getSortedRecords(records) {
            var _paginationManager$ge2 = this.paginationManager.getConfig(),
                sortKey = _paginationManager$ge2.sortKey,
                sortOrder = _paginationManager$ge2.sortOrder;

            if (sortKey === '') {
                return records;
            } else {
                return sortOrder === 'asc' ? records.sort(function (a, b) {
                    return a[sortKey] - b[sortKey];
                }) : records.sort(function (b, a) {
                    return a[sortKey] - b[sortKey];
                });
            }
        }
    }, {
        key: 'getPaginatedRecords',
        value: function getPaginatedRecords(records) {
            var _paginationManager$ge3 = this.paginationManager.getConfig(),
                start = _paginationManager$ge3.start,
                end = _paginationManager$ge3.end;

            return records.slice(start - 1, end);
        }
    }, {
        key: 'getProcessedRecords',
        value: function getProcessedRecords() {
            var processedRecords = this.getSortedRecords(this.getFilteredRecords(this.props.records));
            this.paginationManager.setConfig({
                totalProcessedRecords: processedRecords.length
            }, true);
            var getPaginatedRecords = this.getPaginatedRecords(processedRecords);
            return getPaginatedRecords;
        }
    }, {
        key: 'render',
        value: function render() {
            var records = this.getProcessedRecords();
            var props = this.paginationManager.getConfig();
            props.records = records;
            props.paginationManager = this.paginationManager;
            var clonedChildren = cloneChildren(this.props.children, props);
            return clonedChildren;
        }
    }]);

    return PaginationWrapper;
}(_react.Component);

var TH = function (_Component3) {
    _inherits(TH, _Component3);

    function TH() {
        _classCallCheck(this, TH);

        return _possibleConstructorReturn(this, (TH.__proto__ || Object.getPrototypeOf(TH)).apply(this, arguments));
    }

    _createClass(TH, [{
        key: 'getClassNames',
        value: function getClassNames() {
            var classes = [this.props.className];
            if (this.props.enableSort) {
                classes.push('sortable');
            }
            if (this.props.sortKey === '' + this.props.dataKey) {
                classes.push('sorted');
            }
            return classes.join(' ');
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'th',
                { 'data-key': this.props.dataKey, 'data-sortkey': this.props.sortKey, className: this.getClassNames() },
                this.props.label
            );
        }
    }]);

    return TH;
}(_react.Component);

var TD = function (_Component4) {
    _inherits(TD, _Component4);

    function TD() {
        _classCallCheck(this, TD);

        return _possibleConstructorReturn(this, (TD.__proto__ || Object.getPrototypeOf(TD)).apply(this, arguments));
    }

    _createClass(TD, [{
        key: 'getClassNames',
        value: function getClassNames() {
            var classes = [this.props.className];

            if (this.props.sortKey === '' + this.props.dataKey) {
                classes.push('sorted');
            }
            return classes.join(' ');
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            var props = self.props;
            var attributes = props.attributes;
            var record = props.record,
                recordIndex = props.recordIndex,
                dataKey = props.dataKey;

            return _react2.default.createElement(
                'td',
                _extends({}, attributes, { className: this.getClassNames() }),
                record[dataKey]
            );
        }
    }]);

    return TD;
}(_react.Component);

var TR = function (_Component5) {
    _inherits(TR, _Component5);

    function TR() {
        _classCallCheck(this, TR);

        return _possibleConstructorReturn(this, (TR.__proto__ || Object.getPrototypeOf(TR)).apply(this, arguments));
    }

    _createClass(TR, [{
        key: 'render',
        value: function render() {
            var self = this;
            var props = self.props;
            var records = props.records,
                record = props.record,
                sortKey = props.sortKey;

            var attributes = props.attributes;
            var children = cloneChildren(this.props.children, {
                records: records, record: record, sortKey: sortKey
            });
            return _react2.default.createElement(
                'tr',
                attributes,
                children
            );
        }
    }]);

    return TR;
}(_react.Component);

var THEAD = function (_Component6) {
    _inherits(THEAD, _Component6);

    function THEAD() {
        _classCallCheck(this, THEAD);

        return _possibleConstructorReturn(this, (THEAD.__proto__ || Object.getPrototypeOf(THEAD)).apply(this, arguments));
    }

    _createClass(THEAD, [{
        key: 'render',
        value: function render() {
            var self = this;
            var _props2 = this.props,
                records = _props2.records,
                sortKey = _props2.sortKey;

            var children = cloneChildren(this.props.children, {
                records: records,
                sortKey: sortKey
            });
            return _react2.default.createElement(
                'thead',
                null,
                children
            );
        }
    }]);

    return THEAD;
}(_react.Component);

var TBODY = function (_Component7) {
    _inherits(TBODY, _Component7);

    function TBODY() {
        _classCallCheck(this, TBODY);

        return _possibleConstructorReturn(this, (TBODY.__proto__ || Object.getPrototypeOf(TBODY)).apply(this, arguments));
    }

    _createClass(TBODY, [{
        key: 'render',
        value: function render() {
            var self = this;
            var props = self.props;
            var records = props.records,
                sortKey = props.sortKey;

            var children = records.map(function (record, recordIndex) {
                return cloneChildren(this.props.children, {
                    records: records, record: record, recordIndex: recordIndex, key: recordIndex, sortKey: sortKey
                });
            }, this);
            return _react2.default.createElement(
                'tbody',
                null,
                children
            );
        }
    }]);

    return TBODY;
}(_react.Component);

var PaginatedTable = function (_Component8) {
    _inherits(PaginatedTable, _Component8);

    function PaginatedTable() {
        _classCallCheck(this, PaginatedTable);

        var _this9 = _possibleConstructorReturn(this, (PaginatedTable.__proto__ || Object.getPrototypeOf(PaginatedTable)).apply(this, arguments));

        _this9.state = {
            curPage: +_this9.props.curPage || 0,
            perPage: +_this9.props.perPage || 20
        };
        return _this9;
    }

    _createClass(PaginatedTable, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.setState(_utils._.omit(newProps, 'children'));
        }
    }, {
        key: 'computePagination',
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
        key: 'onNext',
        value: function onNext(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            if (this.hasNext()) {
                this.setState({
                    curPage: this.state.curPage + 1
                });
            }
        }
    }, {
        key: 'onPrev',
        value: function onPrev(event) {
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            if (this.hasPrev()) {
                this.setState({
                    curPage: this.state.curPage - 1
                });
            }
        }
    }, {
        key: 'hasNext',
        value: function hasNext() {
            var records = this.props.records;
            var totalFullPages = Math.floor(records.length / this.state.perPage);
            return this.state.curPage < totalFullPages - 1;
        }
    }, {
        key: 'hasPrev',
        value: function hasPrev() {
            return this.state.curPage > 0;
        }
    }, {
        key: 'render',
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
                hasPrev: this.hasPrev()
            });
            return _react2.default.createElement(
                'div',
                { className: 'paginated-table' },
                children
            );
        }
    }]);

    return PaginatedTable;
}(_react.Component);

var reverseSortOrderMap = {
    asc: 'dsc',
    dsc: 'asc'
};

var Table = function (_Component9) {
    _inherits(Table, _Component9);

    function Table() {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
    }

    _createClass(Table, [{
        key: 'renderNoRecords',
        value: function renderNoRecords() {
            var NoRecordsItemProp = this.props.NoRecordsItem;
            return _react2.default.createElement(NoRecordsItemProp, null);
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var _props3 = this.props,
                attributes = _props3.attributes,
                children = _props3.children,
                records = _props3.records;

            children = cloneChildren(children, {
                records: records
            });
            return _react2.default.createElement(
                'table',
                _extends({ className: 'table' }, attributes),
                children
            );
        }
    }, {
        key: 'tableClickHandler',
        value: function tableClickHandler(event) {
            var target = event.target;
            var thNode = target.closest('th.sortable');
            var _props4 = this.props,
                sortKey = _props4.sortKey,
                sortOrder = _props4.sortOrder;

            if (thNode && thNode.dataset.key !== undefined && this.props.paginationManager) {
                var newSortKey = thNode.dataset.key;
                if (sortKey === newSortKey) {
                    this.props.paginationManager.setConfig({
                        sortOrder: reverseSortOrderMap[sortOrder]
                    });
                } else {
                    this.props.paginationManager.setConfig({
                        sortOrder: 'asc',
                        sortKey: newSortKey
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            var props = self.props;
            var records = props.records,
                errors = props.errors,
                attributes = props.attributes,
                sortKey = props.sortKey;

            var zeroLength = records.length === 0;

            if (errors) {
                return _react2.default.createElement(
                    'div',
                    null,
                    errors.message
                );
            } else if (zeroLength) {
                return this.renderNoRecords();
            }

            return this.renderChildren();
        }
    }]);

    return Table;
}(_react.Component);

Table.propTypes = {
    records: _propTypes2.default.array
};

var NoRecordsItem = function (_Component10) {
    _inherits(NoRecordsItem, _Component10);

    function NoRecordsItem() {
        _classCallCheck(this, NoRecordsItem);

        return _possibleConstructorReturn(this, (NoRecordsItem.__proto__ || Object.getPrototypeOf(NoRecordsItem)).apply(this, arguments));
    }

    _createClass(NoRecordsItem, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'no-data' },
                'No Records Returned'
            );
        }
    }]);

    return NoRecordsItem;
}(_react.Component);

Table.defaultProps = {
    records: [],
    NoRecordsItem: NoRecordsItem
};

var DynamicTable = function (_Table) {
    _inherits(DynamicTable, _Table);

    function DynamicTable() {
        _classCallCheck(this, DynamicTable);

        return _possibleConstructorReturn(this, (DynamicTable.__proto__ || Object.getPrototypeOf(DynamicTable)).apply(this, arguments));
    }

    _createClass(DynamicTable, [{
        key: 'renderChildren',
        value: function renderChildren() {
            var _props5 = this.props,
                attributes = _props5.attributes,
                records = _props5.records;

            var columns = this.parseColumns();
            return _react2.default.createElement(
                'table',
                _extends({ className: 'table' }, attributes),
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        columns.map(function (item) {
                            return _react2.default.createElement(
                                'td',
                                { key: item.key },
                                item.label || item.key
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    records.map(function (rowItem) {
                        return _react2.default.createElement(
                            'tr',
                            { key: rowItem.id || rowItem._id },
                            columns.map(function (item) {
                                return _react2.default.createElement(
                                    'td',
                                    { key: item.key },
                                    rowItem[item.key]
                                );
                            })
                        );
                    })
                )
            );
        }
    }, {
        key: 'parseColumns',
        value: function parseColumns() {
            var _props6 = this.props,
                records = _props6.records,
                columnsToHide = _props6.columnsToHide;
            var columns = this.props.columns;

            if (columns.length === 0) {
                columns = Object.keys(records[0]).map(function (item) {
                    return {
                        key: item
                    };
                });
                columns = columns.filter(function (item) {
                    return columnsToHide.indexOf(item.key) === -1;
                });
            }
            return columns;
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            var props = self.props;

            var records = props.records,
                errors = props.errors;

            var zeroLength = records.length === 0;

            if (errors) {
                return _react2.default.createElement(
                    'div',
                    null,
                    errors.message
                );
            } else if (zeroLength) {
                return this.renderNoRecords();
            }
            return this.renderChildren();
        }
    }]);

    return DynamicTable;
}(Table);

DynamicTable.defaultProps = _extends({}, Table.defaultProps, {
    columns: [],
    columnsToHide: ['_id']
});

exports.default = {
    PaginatedTable: PaginatedTable,
    Table: Table,
    DynamicTable: DynamicTable,
    THEAD: THEAD,
    TBODY: TBODY,
    TH: TH,
    TD: TD,
    TR: TR,
    Pagination: Pagination,
    PaginationWrapper: PaginationWrapper
};