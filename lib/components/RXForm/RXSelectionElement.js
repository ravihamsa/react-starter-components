'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RXSelectionItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _selectionManager = require('selection-manager');

var _selectionManager2 = _interopRequireDefault(_selectionManager);

var _RXFormElement2 = require('./RXFormElement');

var _RXFormElement3 = _interopRequireDefault(_RXFormElement2);

var _List = require('../common/List');

var _List2 = _interopRequireDefault(_List);

var _utils = require('../../core/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var returnTrue = function returnTrue() {
    return true;
};

var RXSelectionItem = exports.RXSelectionItem = function (_Component) {
    _inherits(RXSelectionItem, _Component);

    function RXSelectionItem() {
        _classCallCheck(this, RXSelectionItem);

        return _possibleConstructorReturn(this, (RXSelectionItem.__proto__ || Object.getPrototypeOf(RXSelectionItem)).apply(this, arguments));
    }

    _createClass(RXSelectionItem, [{
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

    return RXSelectionItem;
}(_react.Component);

var RXSelectionElement = function (_RXFormElement) {
    _inherits(RXSelectionElement, _RXFormElement);

    function RXSelectionElement(props) {
        _classCallCheck(this, RXSelectionElement);

        var _this2 = _possibleConstructorReturn(this, (RXSelectionElement.__proto__ || Object.getPrototypeOf(RXSelectionElement)).call(this, props));

        _this2.multiSelect = props.multiSelect;
        _this2.selectionManager = new _selectionManager2.default({
            multiSelect: props.multiSelect
        });
        _this2.validateSelection = props.validateSelection || returnTrue;
        _this2.applyValue(_this2.state.value);
        _this2._value = _this2.selectionManager.getSelected();
        _this2.changeSubscription = _this2.selectionManager.on('change', _this2.onChange.bind(_this2));
        return _this2;
    }

    _createClass(RXSelectionElement, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var _this3 = this;

            var newOptions = newProps['options'];
            var selected = this.selectionManager.getSelected();
            if (newOptions && selected) {
                if (newOptions !== this.props.options) {
                    if (this.multiSelect) {
                        _utils._.each(selected, function (item) {
                            var selectedOption = newOptions.find(function (optionItem) {
                                return optionItem.id === item.id;
                            });
                            if (!selectedOption) {
                                _this3.selectionManager.deselect(item);
                            }
                        });
                    } else {
                        var selectedOption = newOptions.find(function (optionItem) {
                            return optionItem.id === selected.id;
                        });
                        if (!selectedOption) {
                            this.selectionManager.deselect(selected);
                        }
                    }
                }
            }
        }
    }, {
        key: 'getPropToStateList',
        value: function getPropToStateList() {
            return ['active', 'error', 'disabled', 'valid', '__shadowValue', 'value', 'type', 'exposeName', 'exposeSelection', 'serverValid', 'serverError'];
        }
    }, {
        key: 'applyValue',
        value: function applyValue() {
            var _this4 = this;

            var toApplyValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var value = toApplyValue;
            var currentSelectionValue = this.getFormattedSelection();
            if (this.props.useSelectionAsValue && value !== '') {
                value = this.getFormattedSelection(value);
            }
            if (value === currentSelectionValue) {
                return;
            } else {
                if (this.multiSelect) {
                    var valueArray = value.split(',');
                    var selectedArray = currentSelectionValue.split(',');
                    var toSelect = _utils._.difference(valueArray, selectedArray);
                    var toDeselect = _utils._.difference(selectedArray, valueArray);
                    _utils._.each(toSelect, function (valueId) {
                        return _this4.findUpdateSelectionById(valueId, 'select');
                    });
                    _utils._.each(toDeselect, function (valueId) {
                        return _this4.findUpdateSelectionById(valueId, 'deselect');
                    });
                } else {
                    this.findUpdateSelectionById(value, 'select');
                }
            }
        }
    }, {
        key: 'selectById',
        value: function selectById(value) {
            var options = this.getOptions();
            var selectionManager = this.selectionManager;

            var toSelectItem = _utils._.find(options, function (item) {
                return item.id === value;
            });
            if (toSelectItem) {
                if (this.multiSelect) {
                    selectionManager.toggle(toSelectItem);
                } else {
                    var isAlreadySelected = selectionManager.isSelected(toSelectItem);
                    if (!isAlreadySelected) {
                        selectionManager.select(toSelectItem);
                    } else {
                        selectionManager.trigger('change', toSelectItem, toSelectItem);
                    }
                }
            }
        }
    }, {
        key: 'findUpdateSelectionById',
        value: function findUpdateSelectionById(id, method) {
            var options = this.getOptions();
            var toSelectItem = _utils._.find(options, function (item) {
                return item.id === id;
            });
            if (toSelectItem) {
                this.selectionManager[method](toSelectItem);
            } else {
                if (!this.multiSelect) {
                    this.selectionManager.clear();
                }
            }
        }
    }, {
        key: 'getFormattedSelection',
        value: function getFormattedSelection() {
            var selection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.selectionManager.getSelected();

            if (this.multiSelect) {
                return _utils._.map(selection, 'id').join(',');
            } else {
                return selection ? selection.id : '';
            }
        }
    }, {
        key: 'getSelectedAttribute',
        value: function getSelectedAttribute(selection, attribute) {
            if (this.multiSelect) {
                return _utils._.map(selection, attribute).join(',');
            } else {
                return selection ? selection[attribute] : null;
            }
        }
    }, {
        key: 'readInputValue',
        value: function readInputValue() {
            this.updateValue(this.getFormattedSelection(), 'read');
            var _props3 = this.props,
                exposeSelection = _props3.exposeSelection,
                exposeName = _props3.exposeName;

            if (exposeSelection || exposeName) {
                var selected = this.selectionManager.getSelected();
                this.selection$.next({
                    field: this.props.name + '_selection', type: 'skipValidateUpdate', value: selected
                });
            }
        }
    }, {
        key: 'exposeNameAndSelection',
        value: function exposeNameAndSelection() {
            var _props4 = this.props,
                exposeSelection = _props4.exposeSelection,
                exposeName = _props4.exposeName;

            var selected = this.selectionManager.getSelected();
            if (exposeSelection) {
                this.selection$.next({
                    field: this.props.name + '_selection', type: 'selection', value: selected
                });
            }
            if (exposeName) {
                this.selection$.next({
                    field: this.props.name + '_name',
                    type: 'name',
                    value: this.getSelectedAttribute(selected, 'name')
                });
            }
        }
    }, {
        key: 'onChangeUpdates',
        value: function onChangeUpdates() {}
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.selectionManager.getSelected();
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            this.updateValue(this.props.useSelectionAsValue ? this.selectionManager.getSelected() : this.getFormattedSelection(), 'update');
            this.exposeNameAndSelection();
            this.onChangeUpdates();
        }
    }, {
        key: 'onClickHandler',
        value: function onClickHandler(e) {
            var curElement = e.target;
            var listRoot = this.ref_listRoot;
            if (this.props.disabled || !this.validateSelection()) {
                return;
            }

            while (curElement !== listRoot && !curElement.classList.contains('list-item')) {
                curElement = curElement.parentNode;
            }
            if (curElement !== listRoot) {
                var dataId = curElement.dataset.id;
                this.selectById(dataId);
            }
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            return this.props.options;
        }
    }, {
        key: 'getFilteredOptions',
        value: function getFilteredOptions() {
            var _props5 = this.props,
                filterQuery = _props5.filterQuery,
                filterField = _props5.filterField;

            var options = this.getOptions();
            return options.filter(function (item) {
                return item[filterField].toLowerCase().indexOf(filterQuery.toLowerCase()) > -1;
            });
        }
    }, {
        key: 'renderElement',
        value: function renderElement() {
            var _this5 = this;

            var _props$ListItem = this.props.ListItem,
                ListItem = _props$ListItem === undefined ? RXSelectionItem : _props$ListItem;

            return _react2.default.createElement(
                'div',
                { onClick: this.onClickHandler.bind(this), ref: function ref(element) {
                        return _this5.ref_listRoot = element;
                    } },
                _react2.default.createElement(_List2.default, { items: this.getFilteredOptions(), selectionManager: this.selectionManager,
                    selection: this.state.__shadowValue, ListItem: ListItem })
            );
        }
    }, {
        key: 'renderElementWithWrapper',
        value: function renderElementWithWrapper() {
            var formClasses = this.getFormClasses();
            formClasses.push(this.props.multiSelect === true ? 'multi-select' : 'single-select');
            var error = this.state.error || this.state.serverError;
            return _react2.default.createElement(
                'fieldset',
                { className: formClasses.join(' ') },
                this.props.showLabel ? _react2.default.createElement(
                    'label',
                    { className: 'element-label' },
                    this.props.label
                ) : null,
                this.renderElement(),
                this.props.helperText ? _react2.default.createElement(
                    'small',
                    { className: 'text-muted' },
                    this.props.helperText
                ) : '',
                error ? _react2.default.createElement(
                    'small',
                    { className: 'text-danger' },
                    error.message
                ) : ''
            );
        }
    }]);

    return RXSelectionElement;
}(_RXFormElement3.default);

exports.default = RXSelectionElement;


RXSelectionElement.propTypes = _extends({}, _RXFormElement3.default.propTypes, {
    options: _propTypes2.default.array.isRequired,
    exposeName: _propTypes2.default.bool.isRequired,
    exposeSelection: _propTypes2.default.bool.isRequired
});

RXSelectionElement.defaultProps = _extends({}, _RXFormElement3.default.defaultProps, {
    type: 'selection',
    placeholder: 'Select',
    label: 'Select',
    options: [],
    valueType: 'idString',
    exposeName: false,
    value: '',
    exposeSelection: false,
    multiSelect: false,
    useSelectionAsValue: false,
    filterQuery: '',
    filterField: 'name'
});