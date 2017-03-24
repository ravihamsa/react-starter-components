'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectableListItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _selectionManager = require('selection-manager');

var _selectionManager2 = _interopRequireDefault(_selectionManager);

var _FormElement = require('./FormElement');

var _FormElement2 = _interopRequireDefault(_FormElement);

var _SelectionFormElement2 = require('./SelectionFormElement');

var _SelectionFormElement3 = _interopRequireDefault(_SelectionFormElement2);

var _List = require('../common/List');

var _List2 = _interopRequireDefault(_List);

var _InlinePopupGroup = require('../common/InlinePopupGroup');

var _InlinePopupGroup2 = _interopRequireDefault(_InlinePopupGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 2/24/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InlinePopup = _InlinePopupGroup2.default.InlinePopup,
    InlineButton = _InlinePopupGroup2.default.InlineButton,
    InlineBody = _InlinePopupGroup2.default.InlineBody;

var SelectableListItem = exports.SelectableListItem = function (_Component) {
    _inherits(SelectableListItem, _Component);

    function SelectableListItem() {
        _classCallCheck(this, SelectableListItem);

        return _possibleConstructorReturn(this, (SelectableListItem.__proto__ || Object.getPrototypeOf(SelectableListItem)).apply(this, arguments));
    }

    _createClass(SelectableListItem, [{
        key: 'getClassName',
        value: function getClassName() {
            var itemData = this.props.itemData;

            var selectionManager = this.props.selectionManager;
            var className = 'list-item ';

            if (selectionManager._selected) {
                if (selectionManager.isSelected(itemData)) {
                    className += ' active';
                } else {
                    className += ' not-active';
                }
            }
            return className;
        }
    }, {
        key: 'deselectItem',
        value: function deselectItem() {
            var _props = this.props,
                itemData = _props.itemData,
                selectionManager = _props.selectionManager;

            selectionManager.deselect(itemData);
        }
    }, {
        key: 'deSelect',
        value: function deSelect(event) {
            event.preventDefault();
            this.deselectItem();
        }
    }, {
        key: 'render',
        value: function render() {
            var itemData = this.props.itemData;
            var className = this.getClassName();
            return _react2.default.createElement(
                'li',
                { 'data-id': itemData.id, className: className },
                itemData.name
            );
        }
    }]);

    return SelectableListItem;
}(_react.Component);

var Dropdown = function (_SelectionFormElement) {
    _inherits(Dropdown, _SelectionFormElement);

    function Dropdown() {
        _classCallCheck(this, Dropdown);

        var _this2 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));

        _this2.onKeyPressHandler = _.debounce(_this2._onKeyPressHandler.bind(_this2), 300);
        _this2.state.query = '';
        return _this2;
    }

    _createClass(Dropdown, [{
        key: 'onChangeUpdates',
        value: function onChangeUpdates(value) {
            if (!this.multiSelect) {
                if (this.refs['inlinePopup']) {
                    this.refs['inlinePopup'].closePopup();
                }
            }
        }
    }, {
        key: '_onKeyPressHandler',
        value: function _onKeyPressHandler() {
            var target = this.refs.searchBox;
            var value = target.value;
            this.setState({ query: value });
        }
    }, {
        key: 'getSummaryText',
        value: function getSummaryText(placeholder) {
            var selectionManager = this.selectionManager,
                multiSelect = this.multiSelect;

            var selected = selectionManager.getSelected();
            if (!selected) {
                return placeholder || '--Select-- ';
            }
            if (!multiSelect) {
                return selected.name;
            } else {
                return selected.length + ' Selected';
            }
        }
    }, {
        key: 'renderButton',
        value: function renderButton() {
            var selectionSummary = this.getSummaryText(this.props.placeholder);
            return _react2.default.createElement(
                'div',
                { className: 'drop-down-button' },
                _react2.default.createElement(
                    'span',
                    { className: 'drop-down-text' },
                    ' ',
                    selectionSummary
                ),
                _react2.default.createElement('span', { className: 'glyphicon glyphicon-chevron-down drop-down-icon' })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var formClasses = this.getFormClasses();
            var errors = this.getErrors();
            var options = this.props.options;
            var ListItem = this.props.ListItem || SelectableListItem;
            var placeholder = this.props.placeholder || "Please Enter Text";

            var filteredOptions = _.filter(options, function (item) {
                return item.name.toLowerCase().indexOf(_this3.state.query.toLowerCase()) > -1;
            });

            return _react2.default.createElement(
                'fieldset',
                { className: formClasses },
                this.props.showLabel ? _react2.default.createElement(
                    'label',
                    null,
                    this.props.label
                ) : null,
                _react2.default.createElement(
                    'div',
                    { className: 'form-control drop-down' },
                    _react2.default.createElement(
                        InlinePopup,
                        { ref: 'inlinePopup' },
                        _react2.default.createElement(
                            InlineButton,
                            null,
                            this.renderButton()
                        ),
                        _react2.default.createElement(
                            InlineBody,
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'drop-down-body' },
                                _react2.default.createElement('input', { type: 'text', autoFocus: true, defaultValue: this.state.query, ref: 'searchBox', onChange: this.onKeyPressHandler, className: 'drop-down-input', placeholder: placeholder }),
                                _react2.default.createElement(
                                    'div',
                                    { onClick: this.clickHandler.bind(this) },
                                    _react2.default.createElement(_List2.default, { ListItem: ListItem, items: filteredOptions, selection: this.state.selection,
                                        selectionManager: this.selectionManager })
                                )
                            )
                        )
                    )
                ),
                this.props.helperText ? _react2.default.createElement(
                    'small',
                    { className: 'text-muted' },
                    this.props.helperText
                ) : '',
                errors.length > 0 ? _react2.default.createElement(
                    'small',
                    { className: 'text-danger' },
                    errors[0].message
                ) : ''
            );
        }
    }]);

    return Dropdown;
}(_SelectionFormElement3.default);

exports.default = Dropdown;