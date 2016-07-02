/**
 * Created by ravi.hamsa on 6/30/16.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var ListItem = (function (_Component) {
    _inherits(ListItem, _Component);

    function ListItem() {
        _classCallCheck(this, ListItem);

        _get(Object.getPrototypeOf(ListItem.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ListItem, [{
        key: "render",
        value: function render() {
            var itemData = this.props.itemData;
            var ContainerTag = this.props.tagName || 'li';
            return _react2["default"].createElement(
                ContainerTag,
                _extends({}, this.props, { className: "list-item" }),
                itemData.name
            );
        }
    }]);

    return ListItem;
})(_react.Component);

var List = (function (_Component2) {
    _inherits(List, _Component2);

    function List() {
        _classCallCheck(this, List);

        _get(Object.getPrototypeOf(List.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(List, [{
        key: "render",
        value: function render() {
            var self = this;
            var itemArray = self.props.items;
            var ContainerTag = self.props.tagName || 'ul';
            var noItemMessage = self.props.noDataMessage || 'No Items Found';
            var ListItemClass = self.props.ListItem || ListItem;
            var listItems = itemArray.map(function (item) {
                return _react2["default"].createElement(ListItemClass, _extends({ key: item.id, id: item.id, itemData: item }, self.props));
            });

            if (listItems.length > 0) {
                return _react2["default"].createElement(
                    ContainerTag,
                    this.props,
                    listItems
                );
            } else {
                return _react2["default"].createElement(
                    ContainerTag,
                    this.props,
                    _react2["default"].createElement(
                        "li",
                        { className: "no-data" },
                        noItemMessage
                    )
                );
            }
        }
    }]);

    return List;
})(_react.Component);

exports["default"] = List;
module.exports = exports["default"];