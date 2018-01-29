'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RXDropdownItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RXSelectionElement2 = require('./RXSelectionElement');

var _RXSelectionElement3 = _interopRequireDefault(_RXSelectionElement2);

var _List = require('../common/List');

var _List2 = _interopRequireDefault(_List);

var _InlinePopupGroup = require('../common/InlinePopupGroup');

var _InlinePopupGroup2 = _interopRequireDefault(_InlinePopupGroup);

var _InlineModal = require('../common/InlineModal');

var _utils = require('../../core/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InlinePopup = _InlinePopupGroup2.default.InlinePopup,
    InlineButton = _InlinePopupGroup2.default.InlineButton,
    InlineBody = _InlinePopupGroup2.default.InlineBody;

var RXDropdownItem = exports.RXDropdownItem = function (_Component) {
    _inherits(RXDropdownItem, _Component);

    function RXDropdownItem() {
        _classCallCheck(this, RXDropdownItem);

        return _possibleConstructorReturn(this, (RXDropdownItem.__proto__ || Object.getPrototypeOf(RXDropdownItem)).apply(this, arguments));
    }

    _createClass(RXDropdownItem, [{
        key: 'getClassName',
        value: function getClassName() {
            var _props = this.props,
                itemData = _props.itemData,
                selectionManager = _props.selectionManager;

            var className = 'list-item ';
            if (selectionManager.isSelected(itemData)) {
                className += ' active';
            }
            return className;
        }
    }, {
        key: 'deselectItem',
        value: function deselectItem() {
            var _props2 = this.props,
                itemData = _props2.itemData,
                selectionManager = _props2.selectionManager;

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

    return RXDropdownItem;
}(_react.Component);

var RXDropdown = function (_RXSelectionElement) {
    _inherits(RXDropdown, _RXSelectionElement);

    function RXDropdown(props) {
        _classCallCheck(this, RXDropdown);

        var _this2 = _possibleConstructorReturn(this, (RXDropdown.__proto__ || Object.getPrototypeOf(RXDropdown)).call(this, props));

        _this2.onKeyPressHandler = _utils._.debounce(_this2._onKeyPressHandler.bind(_this2), 300);
        _this2.state.query = '';
        return _this2;
    }

    _createClass(RXDropdown, [{
        key: '_onKeyPressHandler',
        value: function _onKeyPressHandler() {
            var target = this.ref_searchBox;
            var value = target.value;
            this.setState({
                query: value
            });
        }
    }, {
        key: 'getSummaryText',
        value: function getSummaryText() {
            var selectionManager = this.selectionManager,
                multiSelect = this.multiSelect;

            var options = this.getOptions();
            if (options === undefined || options.length === 0) {
                return this.props.noOptionsLabel;
            }

            var selected = selectionManager.getSelected();
            if (!selected) {
                return this.props.noSelectionLabel;
            }
            if (!multiSelect) {
                return selected.name;
            } else {
                if (selected.length === options.length) {
                    return this.props.allSelectedLabel;
                } else {
                    return selected.length + ' ' + this.props.optionsSelectedLabel;
                }
            }
        }
    }, {
        key: 'onChangeUpdates',
        value: function onChangeUpdates(value) {
            if (!this.multiSelect) {
                if (this.ref_inlinePopup) {
                    this.ref_inlinePopup.closePopup();
                }
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
        key: 'getFilteredOptions',
        value: function getFilteredOptions() {
            var _this3 = this;

            var options = this.getOptions();
            return options.filter(function (item) {
                return item.name.toLowerCase().indexOf(_this3.state.query.toLowerCase()) > -1;
            });
        }
    }, {
        key: 'renderElement',
        value: function renderElement() {
            var _this4 = this;

            var _props3 = this.props,
                _props3$valign = _props3.valign,
                valign = _props3$valign === undefined ? 'top' : _props3$valign,
                bodyPosition = _props3.bodyPosition,
                _props3$ListItem = _props3.ListItem,
                ListItem = _props3$ListItem === undefined ? RXDropdownItem : _props3$ListItem,
                listBodyClassName = _props3.listBodyClassName;

            var filteredOptions = this.getFilteredOptions();

            return _react2.default.createElement(
                _InlineModal.InlineModal,
                { ref: function ref(inlinePopup) {
                        return _this4.ref_inlinePopup = inlinePopup;
                    }, disabled: this.props.disabled },
                _react2.default.createElement(
                    _InlineModal.InlineModalButton,
                    null,
                    this.renderButton()
                ),
                _react2.default.createElement(
                    _InlineModal.InlineModalBody,
                    { valign: valign, bodyPosition: bodyPosition, className: listBodyClassName },
                    _react2.default.createElement(
                        'div',
                        { className: 'drop-down-body' },
                        this.props.showSearch ? _react2.default.createElement(
                            'div',
                            { className: 'drop-down-search-container' },
                            _react2.default.createElement('input', { type: 'text', autoFocus: true, defaultValue: this.state.query, ref: function ref(searchBox) {
                                    return _this4.ref_searchBox = searchBox;
                                },
                                onChange: this.onKeyPressHandler, className: 'drop-down-input',
                                placeholder: this.props.placeholder })
                        ) : null,
                        _react2.default.createElement(
                            'div',
                            { onClick: this.onClickHandler.bind(this), ref: function ref(listRoot) {
                                    return _this4.ref_listRoot = listRoot;
                                } },
                            _react2.default.createElement(_List2.default, { items: filteredOptions, selectionManager: this.selectionManager,
                                selection: this.state.value, ListItem: ListItem })
                        )
                    )
                )
            );
        }
    }]);

    return RXDropdown;
}(_RXSelectionElement3.default);

exports.default = RXDropdown;


RXDropdown.defaultProps = _extends({}, _RXSelectionElement3.default.defaultProps, {
    type: 'drop-down',
    noOptionsLabel: 'No Options',
    noSelectionLabel: 'Select',
    allSelectedLabel: 'All Selected',
    optionsSelectedLabel: 'Options Selected',
    bodyPosition: 'down',
    listBodyClassName: 'inline-popup-body-fullwidth'
});