"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectableListItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _selectionManager = require("selection-manager");

var _selectionManager2 = _interopRequireDefault(_selectionManager);

var _FormElement = require("./FormElement");

var _FormElement2 = _interopRequireDefault(_FormElement);

var _SelectionFormElement2 = require("./SelectionFormElement");

var _SelectionFormElement3 = _interopRequireDefault(_SelectionFormElement2);

var _List = require("../common/List");

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 2/24/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SelectableListItem = exports.SelectableListItem = function (_Component) {
    _inherits(SelectableListItem, _Component);

    function SelectableListItem() {
        _classCallCheck(this, SelectableListItem);

        return _possibleConstructorReturn(this, (SelectableListItem.__proto__ || Object.getPrototypeOf(SelectableListItem)).apply(this, arguments));
    }

    _createClass(SelectableListItem, [{
        key: "getClassName",
        value: function getClassName() {
            var itemData = this.props.itemData;
            var selectionManager = this.props.selectionManager;
            var className = 'list-item ';
            if (selectionManager.isSelected(itemData)) {
                className += ' active';
            }
            return className;
        }
    }, {
        key: "deselectItem",
        value: function deselectItem() {
            var _props = this.props,
                itemData = _props.itemData,
                selectionManager = _props.selectionManager;

            selectionManager.deselect(itemData);
        }
    }, {
        key: "deSelect",
        value: function deSelect(event) {
            event.preventDefault();
            this.deselectItem();
        }
    }, {
        key: "render",
        value: function render() {
            var itemData = this.props.itemData;
            var className = this.getClassName();
            return _react2.default.createElement(
                "li",
                { "data-id": itemData.id, className: className },
                itemData.name
            );
        }
    }]);

    return SelectableListItem;
}(_react.Component);

var SelectableList = function (_SelectionFormElement) {
    _inherits(SelectableList, _SelectionFormElement);

    function SelectableList() {
        _classCallCheck(this, SelectableList);

        return _possibleConstructorReturn(this, (SelectableList.__proto__ || Object.getPrototypeOf(SelectableList)).apply(this, arguments));
    }

    _createClass(SelectableList, [{
        key: "render",
        value: function render() {
            var formClasses = this.getFormClasses();
            formClasses = formClasses + ' ' + (this.multiSelect ? 'multi-select' : 'single-select');
            var errors = this.getErrors();
            var options = this.props.options;
            var ListItem = this.props.ListItem || SelectableListItem;

            return _react2.default.createElement(
                "fieldset",
                { className: formClasses + " " + (options.length === 0 ? 'zero-length' : '') },
                this.props.showLabel ? _react2.default.createElement(
                    "label",
                    { className: "element-label" },
                    this.props.label
                ) : null,
                _react2.default.createElement(
                    "div",
                    { className: "form-control", onClick: this.clickHandler.bind(this) },
                    _react2.default.createElement(_List2.default, { ListItem: ListItem, items: options, selection: this.state.selection,
                        selectionManager: this.selectionManager, showName: this.props.showName })
                ),
                this.props.helperText ? _react2.default.createElement(
                    "small",
                    { className: "text-muted" },
                    this.props.helperText
                ) : '',
                errors.length > 0 ? _react2.default.createElement(
                    "small",
                    { className: "text-danger" },
                    errors[0].message
                ) : ''
            );
        }
    }]);

    return SelectableList;
}(_SelectionFormElement3.default);

exports.default = SelectableList;


SelectableList.defaultProps = _extends({}, _FormElement2.default.defaultProps, {
    type: 'selectable-list'
});