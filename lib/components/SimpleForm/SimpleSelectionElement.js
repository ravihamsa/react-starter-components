'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectionItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../core/utils');

var _SimpleElement2 = require('./SimpleElement');

var _SimpleElement3 = _interopRequireDefault(_SimpleElement2);

var _selectionManager = require('selection-manager');

var _selectionManager2 = _interopRequireDefault(_selectionManager);

var _List = require('../../components/common/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SelectionItem = exports.SelectionItem = function (_Component) {
    _inherits(SelectionItem, _Component);

    function SelectionItem() {
        _classCallCheck(this, SelectionItem);

        return _possibleConstructorReturn(this, (SelectionItem.__proto__ || Object.getPrototypeOf(SelectionItem)).apply(this, arguments));
    }

    _createClass(SelectionItem, [{
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

    return SelectionItem;
}(_react.Component);

var SimpleSelectionElement = function (_SimpleElement) {
    _inherits(SimpleSelectionElement, _SimpleElement);

    function SimpleSelectionElement(props) {
        _classCallCheck(this, SimpleSelectionElement);

        var _this2 = _possibleConstructorReturn(this, (SimpleSelectionElement.__proto__ || Object.getPrototypeOf(SimpleSelectionElement)).call(this, props));

        _this2.multiSelect = props.multiSelect;
        _this2.selectionManager = new _selectionManager2.default({
            multiSelect: props.multiSelect
        });
        return _this2;
    }

    _createClass(SimpleSelectionElement, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.applyValue(this.props.value);
            this.readInputValue();
            this.changeSubscription = this.selectionManager.on('change', this.onChange.bind(this));
        }
    }, {
        key: 'onChange',
        value: function onChange() {
            this.exposeNameAndSelection();
            this.updateValue(this.props.useSelectionAsValue ? this.selectionManager.getSelected() : this.getFormattedSelection());
            this.onChangeUpdates();
            this.forceUpdate();
        }
    }, {
        key: 'onChangeUpdates',
        value: function onChangeUpdates() {
            //do nothing
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.changeSubscription) {
                this.changeSubscription();
            }
        }
    }, {
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

            if (newProps.value !== undefined) {
                if (newProps.value !== this.props.value) {
                    this.applyValue(newProps.value);
                }
            }
        }
    }, {
        key: 'validateSelection',
        value: function validateSelection() {
            return true;
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
            var _props3 = this.props,
                _props3$filterQuery = _props3.filterQuery,
                filterQuery = _props3$filterQuery === undefined ? '' : _props3$filterQuery,
                _props3$filterField = _props3.filterField,
                filterField = _props3$filterField === undefined ? 'name' : _props3$filterField;

            var options = this.getOptions();
            return options.filter(function (item) {
                return item[filterField].toLowerCase().indexOf(filterQuery.toLowerCase()) > -1;
            });
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
                    var selected = selectionManager.getSelected();
                    var isAlreadySelected = selectionManager.isSelected(toSelectItem);
                    var forceMinimumSelection = this.props.forceMinimumSelection;
                    var forceMaxSelection = this.props.forceMaxSelection;
                    if (!isAlreadySelected) {
                        if (selected.length < forceMaxSelection) {
                            selectionManager.toggle(toSelectItem);
                        }
                    } else {
                        if (selected.length > forceMinimumSelection) {
                            selectionManager.toggle(toSelectItem);
                        }
                    }
                } else {
                    var _isAlreadySelected = selectionManager.isSelected(toSelectItem);
                    if (!_isAlreadySelected) {
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
            var selection = this.getFormattedSelection();
            if (selection === '' && this.props.selectDefaultFirst) {
                var options = this.props.options;

                if (options && options.length > 0) {
                    this.selectionManager.select(options[0]);
                    selection = this.getFormattedSelection();
                }
            }
            var _props4 = this.props,
                exposeSelection = _props4.exposeSelection,
                exposeName = _props4.exposeName;

            if (exposeSelection || exposeName) {
                this.exposeNameAndSelection();
            }
            this.onChange();
        }
    }, {
        key: 'exposeNameAndSelection',
        value: function exposeNameAndSelection() {
            var _props5 = this.props,
                exposeSelection = _props5.exposeSelection,
                name = _props5.name;

            var selected = this.selectionManager.getSelected();
            if (exposeSelection) {
                this.context.collector.mutedUpdateValue(name + '_selection', selected);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var domProps = (0, _utils.getDomProps)(this.props);
            domProps.className = this.getClassNames();
            var _props$ListItem = this.props.ListItem,
                ListItem = _props$ListItem === undefined ? SelectionItem : _props$ListItem;

            var selected = this.selectionManager.getSelected();
            return _react2.default.createElement(
                'div',
                _extends({}, domProps, { onClick: this.onClickHandler.bind(this), ref: function ref(element) {
                        return _this5.ref_listRoot = element;
                    } }),
                _react2.default.createElement(_List2.default, { items: this.getFilteredOptions(), selectionManager: this.selectionManager, selection: selected,
                    ListItem: ListItem })
            );
        }
    }]);

    return SimpleSelectionElement;
}(_SimpleElement3.default);

exports.default = SimpleSelectionElement;


SimpleSelectionElement.defaultProps = _extends({}, _SimpleElement3.default.defaultProps, {
    type: 'selection',
    selectDefaultFirst: false,
    forceMinimumSelection: 0,
    forceMaxSelection: Infinity
});