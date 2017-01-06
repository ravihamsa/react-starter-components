'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormElement2 = require('./FormElement');

var _FormElement3 = _interopRequireDefault(_FormElement2);

var _InlinePopupGroup = require('../common/InlinePopupGroup');

var _InlinePopupGroup2 = _interopRequireDefault(_InlinePopupGroup);

var _selectionManager = require('selection-manager');

var _selectionManager2 = _interopRequireDefault(_selectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/29/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var InlinePopup = _InlinePopupGroup2.default.InlinePopup,
    InlineButton = _InlinePopupGroup2.default.InlineButton,
    InlineBody = _InlinePopupGroup2.default.InlineBody;


console.log(InlinePopup, 'InlinePopup');

var AutoComplete = function (_FormElement) {
    _inherits(AutoComplete, _FormElement);

    function AutoComplete() {
        _classCallCheck(this, AutoComplete);

        var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).apply(this, arguments));

        _this.state.searchString = '';
        _this.selection = new _selectionManager2.default({ multiSelect: _this.props.multiSelect });
        return _this;
    }

    _createClass(AutoComplete, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            _get(AutoComplete.prototype.__proto__ || Object.getPrototypeOf(AutoComplete.prototype), 'componentWillMount', this).call(this);
            this.selection.select(this.getDefaultValue());
            this.unsubscribeSelection = this.selection.on('change', function (selection) {
                _this2.setValue(selection.id);
            });
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            var options = this.props.options;
            var selectedId = this.props.defaultValue;
            var selectedOption = options.find(function (item) {
                return item.id === selectedId;
            });
            if (!selectedOption) {
                var selectText = this.props.selectText || 'Select';
                selectedOption = { id: '-1', name: selectText };
            }
            return selectedOption;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _get(AutoComplete.prototype.__proto__ || Object.getPrototypeOf(AutoComplete.prototype), 'componentWillUnmount', this).call(this);
            if (this.unsubscribeSelection) {
                this.unsubscribeSelection();
            }
        }
    }, {
        key: 'selectOption',
        value: function selectOption(selectedId, event) {
            event.preventDefault();
            this.selection.select(selectedId);
            if (!this.selection.isMultiSelect()) {
                this.refs.popupBody.props.closePopup();
            }
        }
    }, {
        key: 'localOnChange',
        value: function localOnChange(event) {
            this.setState({ searchString: this.getValueFromNode(event.target) });
        }
    }, {
        key: 'onClosePopup',
        value: function onClosePopup() {
            this.setState({ searchString: this.selection.getSelected().name });
        }
    }, {
        key: 'render',
        value: function render() {

            var defaultValue = this.getDefaultValue();
            var selectedOption = this.selection.getSelected();
            var options = this.props.options || [];
            var formClasses = this.getFormClasses();
            var errors = this.getErrors();
            var searchString = this.state.searchString;
            var filteredOptions = options.filter(function (item) {
                return item.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
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
                    InlinePopup,
                    { onClosePopup: this.onClosePopup.bind(this) },
                    _react2.default.createElement(
                        InlineButton,
                        null,
                        _react2.default.createElement(
                            'div',
                            { style: { position: 'relative' } },
                            _react2.default.createElement('input', { className: 'form-control', name: this.props.name, disabled: this.props.disabled,
                                placeholder: this.props.placeholder, onChange: this.localOnChange.bind(this), value: this.state.searchString })
                        )
                    ),
                    _react2.default.createElement(
                        InlineBody,
                        { ref: 'popupBody' },
                        _react2.default.createElement(
                            'ul',
                            { style: { maxHeight: '200px', overflow: 'auto' } },
                            filteredOptions.map(function (option, index) {
                                return _react2.default.createElement(
                                    'li',
                                    { value: option.id, key: index,
                                        onClick: this.selectOption.bind(this, option) },
                                    option.name
                                );
                            }, this)
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

    return AutoComplete;
}(_FormElement3.default);

exports.default = AutoComplete;