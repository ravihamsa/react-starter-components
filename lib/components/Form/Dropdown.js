'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _SelectableList = require('./SelectableList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 2/24/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InlinePopup = _InlinePopupGroup2.default.InlinePopup,
    InlineButton = _InlinePopupGroup2.default.InlineButton,
    InlineBody = _InlinePopupGroup2.default.InlineBody;

/*export class SelectableListItem extends Component {

    getClassName() {
        let itemData = this.props.itemData;

        let selectionManager = this.props.selectionManager;
        let className = 'list-item ';

        if (selectionManager._selected) {
            if (selectionManager.isSelected(itemData)) {
                className += ' active';
            } else {
                className += ' not-active';
            }
        }
        return className;
    }

    deselectItem() {
        let {itemData, selectionManager} = this.props;
        selectionManager.deselect(itemData);
    }

    deSelect(event) {
        event.preventDefault();
        this.deselectItem();
    }

    render() {
        let itemData = this.props.itemData;
        let className = this.getClassName();
        return <li data-id={itemData.id} className={className}>
            {itemData.name}
        </li>;
    }
}*/

var Dropdown = function (_SelectionFormElement) {
    _inherits(Dropdown, _SelectionFormElement);

    function Dropdown() {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));

        _this.onKeyPressHandler = _.debounce(_this._onKeyPressHandler.bind(_this), 300);
        _this.state.query = '';
        return _this;
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
        value: function getSummaryText() {
            var selectionManager = this.selectionManager,
                multiSelect = this.multiSelect;
            var options = this.props.options;

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
                    if (selected.length === 0) {
                        return this.props.noSelectionLabel;
                    }
                    return selected.length + ' ' + this.props.optionsSelectedLabel;
                }
            }
        }
    }, {
        key: 'renderButton',
        value: function renderButton() {
            var getSummaryText = this.getSummaryText;
            var _props = this.props,
                placeholder = _props.placeholder,
                _props$dropDownSummar = _props.dropDownSummary,
                dropDownSummary = _props$dropDownSummar === undefined ? getSummaryText : _props$dropDownSummar;

            dropDownSummary = dropDownSummary.bind(this);
            var selectionSummary = dropDownSummary(placeholder);
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
            var _this2 = this;

            var formClasses = this.getFormClasses();
            formClasses = formClasses;
            var errors = this.getErrors();
            var options = this.props.options;
            var ListItem = this.props.ListItem || _SelectableList.SelectableListItem;
            var placeholder = this.props.placeholder || "Please Enter Text";
            var _props$valign = this.props.valign,
                valign = _props$valign === undefined ? "top" : _props$valign;


            var filteredOptions = _.filter(options, function (item) {
                return item.name.toLowerCase().indexOf(_this2.state.query.toLowerCase()) > -1;
            });

            if (filteredOptions.length > 500 && this.state.query === '') {
                filteredOptions = [];
            }

            return _react2.default.createElement(
                'fieldset',
                { className: formClasses },
                this.props.showLabel ? _react2.default.createElement(
                    'label',
                    { className: 'element-label' },
                    this.props.label
                ) : null,
                _react2.default.createElement(
                    'div',
                    { className: 'form-control drop-down' },
                    _react2.default.createElement(
                        InlinePopup,
                        { ref: 'inlinePopup', disabled: this.props.disabled },
                        _react2.default.createElement(
                            InlineButton,
                            null,
                            this.renderButton()
                        ),
                        _react2.default.createElement(
                            InlineBody,
                            { valign: valign, className: 'inline-popup-body-fullwidth' },
                            _react2.default.createElement(
                                'div',
                                { className: 'drop-down-body' },
                                this.props.showSearch ? _react2.default.createElement(
                                    'div',
                                    { className: 'drop-down-search-container' },
                                    _react2.default.createElement('input', { type: 'text', autoFocus: true, defaultValue: this.state.query, ref: 'searchBox', onChange: this.onKeyPressHandler, className: 'drop-down-input', placeholder: placeholder }),
                                    ' '
                                ) : null,
                                _react2.default.createElement(
                                    'div',
                                    { onClick: this.clickHandler.bind(this) },
                                    _react2.default.createElement(_List2.default, { ListItem: ListItem,
                                        className: this.multiSelect ? 'multi-select list' : 'single-select list',
                                        items: filteredOptions,
                                        selection: this.state.selection,
                                        hideNoItems: this.props.hideNoItems === true,
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


Dropdown.defaultProps = _extends({}, _FormElement2.default.defaultProps, {
    type: 'drop-down',
    showSearch: false,
    noOptionsLabel: 'No Options',
    noSelectionLabel: 'Select',
    allSelectedLabel: 'All Selected',
    optionsSelectedLabel: 'Options Selected'
});