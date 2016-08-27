'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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


var ListItem = function (_Component) {
    _inherits(ListItem, _Component);

    function ListItem() {
        _classCallCheck(this, ListItem);

        return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
    }

    _createClass(ListItem, [{
        key: 'render',
        value: function render() {
            var itemData = this.props.itemData;
            var ContainerTag = this.props.tagName;
            var tagProps = _lodash2.default.pick(this.props, 'className', 'style');
            return _react2.default.createElement(
                ContainerTag,
                _extends({}, tagProps, { className: 'list-item' }),
                itemData.name
            );
        }
    }]);

    return ListItem;
}(_react.Component);

var List = function (_Component2) {
    _inherits(List, _Component2);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
        key: 'render',
        value: function render() {
            var self = this;
            var itemArray = self.props.items;
            var ContainerTag = self.props.tagName || 'ul';
            var noItemMessage = self.props.noDataMessage || 'No Items Found';
            var ListItemClass = self.props.ListItem || ListItem;

            var tagProps = _lodash2.default.pick(this.props, 'className', 'style');
            var otherProps = _lodash2.default.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'items');
            otherProps.tagName = this.props.itemTagName || 'li';
            otherProps.className = this.props.itemClassName || 'list-item';

            var listItems = itemArray.map(function (item) {
                return _react2.default.createElement(ListItemClass, _extends({ key: item.id, id: item.id, itemData: item }, otherProps));
            });

            if (listItems.length > 0) {
                return _react2.default.createElement(
                    ContainerTag,
                    tagProps,
                    listItems
                );
            } else {
                return _react2.default.createElement(
                    ContainerTag,
                    tagProps,
                    _react2.default.createElement(
                        'li',
                        { className: 'no-data' },
                        noItemMessage
                    )
                );
            }
        }
    }]);

    return List;
}(_react.Component);

exports.default = List;