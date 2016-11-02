'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectableList = exports.SelectableItem = exports.PaginatedLayoutList = exports.LayoutList = exports.ListItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/30/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ListItem = exports.ListItem = function (_Component) {
    _inherits(ListItem, _Component);

    function ListItem() {
        _classCallCheck(this, ListItem);

        return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
    }

    _createClass(ListItem, [{
        key: 'render',
        value: function render() {
            return this.renderContent();
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var itemData = this.props.itemData;
            var ContainerTag = this.props.tagName;
            var tagProps = this.getTagProps();
            return _react2.default.createElement(
                ContainerTag,
                tagProps,
                itemData.name
            );
        }
    }, {
        key: 'getTagProps',
        value: function getTagProps() {
            return _lodash2.default.pick(this.props, 'className', 'style');
        }
    }]);

    return ListItem;
}(_react.Component);

var LayoutList = exports.LayoutList = function (_Component2) {
    _inherits(LayoutList, _Component2);

    function LayoutList() {
        _classCallCheck(this, LayoutList);

        return _possibleConstructorReturn(this, (LayoutList.__proto__ || Object.getPrototypeOf(LayoutList)).apply(this, arguments));
    }

    _createClass(LayoutList, [{
        key: 'render',
        value: function render() {

            var columns = this.props.columns;
            var colClassName = 'col-md-' + Math.round(12 / columns);
            var itemClassName = this.props.itemClassName || 'list-item';
            var rowClassName = this.props.rowClassName || '';
            var items = this.props.items;
            var otherProps = _lodash2.default.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
            var ListItemClass = this.props.ListItem || ListItem;
            var children = [];
            for (var i = 0; i < items.length; i += columns) {
                var colChildren = [];
                for (var j = 0; j < columns; j++) {
                    var item = items[i + j];
                    if (item) {
                        colChildren.push(_react2.default.createElement(ListItemClass, _extends({ key: item.id, ref: item.id, itemData: item, itemIndex: i + j,
                            className: colClassName + ' ' + itemClassName,
                            tagName: 'div' }, otherProps)));
                    }
                }

                children.push(_react2.default.createElement(
                    'div',
                    { className: 'row ' + rowClassName, key: i },
                    colChildren
                ));
            }

            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                children
            );
        }
    }]);

    return LayoutList;
}(_react.Component);

var PaginatedLayoutList = exports.PaginatedLayoutList = function (_Component3) {
    _inherits(PaginatedLayoutList, _Component3);

    function PaginatedLayoutList() {
        _classCallCheck(this, PaginatedLayoutList);

        var _this3 = _possibleConstructorReturn(this, (PaginatedLayoutList.__proto__ || Object.getPrototypeOf(PaginatedLayoutList)).apply(this, arguments));

        _this3.state = {
            curPage: _this3.props.curPage | 0,
            perPage: _this3.props.perPage || 9
        };
        return _this3;
    }

    _createClass(PaginatedLayoutList, [{
        key: 'render',
        value: function render() {

            var columns = this.props.columns;
            var colClassName = 'col-md-' + Math.round(12 / columns);
            var itemClassName = this.props.itemClassName || 'list-item';
            var rowClassName = this.props.rowClassName || '';
            var otherProps = _lodash2.default.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
            var ListItemClass = this.props.ListItem || ListItem;
            var children = [];

            var _state = this.state,
                curPage = _state.curPage,
                perPage = _state.perPage;

            var start = curPage * perPage;
            var end = start + perPage;
            end = Math.max(end, items.length);
            var paginatedItems = items.slice(start, perPage);

            for (var i = 0; i < paginatedItems.length; i += columns) {
                var colChildren = [];
                for (var j = 0; j < columns; j++) {
                    var item = paginatedItems[i + j];
                    if (item) {
                        colChildren.push(_react2.default.createElement(ListItemClass, _extends({ key: item.id, ref: item.id, itemData: item, itemIndex: i + j,
                            className: colClassName + ' ' + itemClassName,
                            tagName: 'div' }, otherProps)));
                    }
                }

                children.push(_react2.default.createElement(
                    'div',
                    { className: 'row ' + rowClassName, key: i },
                    colChildren
                ));
            }

            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                children
            );
        }
    }]);

    return PaginatedLayoutList;
}(_react.Component);

var List = function (_Component4) {
    _inherits(List, _Component4);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
        key: 'renderNoItems',
        value: function renderNoItems() {
            var noItemMessage = this.props.noDataMessage || 'No Items Found';
            return _react2.default.createElement(
                'li',
                { className: 'no-data' },
                noItemMessage
            );
        }
    }, {
        key: 'renderItems',
        value: function renderItems(items) {
            return items;
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(items) {
            var tagProps = this.getTagProps();
            tagProps.className = tagProps.className || 'list';
            if (items.length === 0) {
                tagProps.className += ' zero-length';
            }
            var ContainerTag = this.props.tagName || 'ul';

            return _react2.default.createElement(
                ContainerTag,
                tagProps,
                items.length > 0 ? this.renderItems(items) : this.renderNoItems()
            );
        }
    }, {
        key: 'getTagProps',
        value: function getTagProps() {
            return _lodash2.default.pick(this.props, 'className', 'style');
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            var itemArray = self.props.items;

            var ListItemClass = self.props.ListItem || ListItem;

            var otherProps = _lodash2.default.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
            otherProps.tagName = this.props.itemTagName || 'li';
            otherProps.className = this.props.itemClassName || 'list-item';

            var listItems = itemArray.map(function (item, index) {
                return _react2.default.createElement(ListItemClass, _extends({ key: item.id, ref: item.id, itemIndex: index, itemData: item }, otherProps));
            });

            return this.renderChildren(listItems);
        }
    }]);

    return List;
}(_react.Component);

exports.default = List;

var SelectableItem = exports.SelectableItem = function (_ListItem) {
    _inherits(SelectableItem, _ListItem);

    function SelectableItem() {
        _classCallCheck(this, SelectableItem);

        var _this5 = _possibleConstructorReturn(this, (SelectableItem.__proto__ || Object.getPrototypeOf(SelectableItem)).apply(this, arguments));

        var _this5$props = _this5.props,
            itemData = _this5$props.itemData,
            selectionManager = _this5$props.selectionManager;

        _this5.state = {
            selected: selectionManager.isSelected(itemData)
        };

        return _this5;
    }

    _createClass(SelectableItem, [{
        key: 'updateSelectionState',
        value: function updateSelectionState() {
            var _props = this.props,
                itemData = _props.itemData,
                selectionManager = _props.selectionManager;

            this.setState({
                selected: selectionManager.isSelected(itemData)
            });
        }
    }, {
        key: 'selectItem',
        value: function selectItem(event) {
            event.preventDefault();
            var _props2 = this.props,
                itemData = _props2.itemData,
                selectionManager = _props2.selectionManager;

            if (selectionManager._multiSelect) {
                selectionManager.toggle(itemData);
            } else {
                selectionManager.select(itemData);
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var itemData = this.props.itemData;
            var ContainerTag = this.props.tagName;
            var tagProps = this.getTagProps();
            return _react2.default.createElement(
                ContainerTag,
                tagProps,
                _react2.default.createElement(
                    'a',
                    { href: '#select', onClick: this.selectItem.bind(this) },
                    itemData.name
                )
            );
        }
    }, {
        key: 'getTagProps',
        value: function getTagProps() {
            return {
                className: this.state.selected ? 'active list-item' : 'list-item'
            };
        }
    }]);

    return SelectableItem;
}(ListItem);

var SelectableList = exports.SelectableList = function (_List) {
    _inherits(SelectableList, _List);

    function SelectableList() {
        _classCallCheck(this, SelectableList);

        return _possibleConstructorReturn(this, (SelectableList.__proto__ || Object.getPrototypeOf(SelectableList)).apply(this, arguments));
    }

    _createClass(SelectableList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var selectionManager = this.props.selectionManager;
            var self = this;
            if (selectionManager) {
                this.unsubscribeSelection = selectionManager.on('change', function (selection, prevSelection) {
                    var fullList = _lodash2.default.flatten([selection, prevSelection]);
                    _lodash2.default.each(fullList, function (item) {
                        if (item) {
                            self.refs[item.id].updateSelectionState();
                        }
                    });
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.unsubscribeSelection) {
                this.unsubscribeSelection();
            }
        }
    }]);

    return SelectableList;
}(List);