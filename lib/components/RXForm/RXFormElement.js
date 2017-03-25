'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _validationRules = require('./validationRules');

var _validationRules2 = _interopRequireDefault(_validationRules);

var _activeRules = require('./activeRules');

var _activeRules2 = _interopRequireDefault(_activeRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var getValidationRule = function getValidationRule(item) {
    return {
        type: item.expr,
        value: item.value,
        length: item.length,
        func: _validationRules2.default[item.expr],
        message: item.message || item.expr
    };
};

var getActiveRule = function getActiveRule(item) {
    return {
        type: item.expr,
        element: item.element,
        prop: item.prop || 'update',
        value: item.value,
        func: _activeRules2.default[item.expr]
    };
};

var propsList = ['active', 'error', 'disabled', 'valid', 'activeRules', 'defaultValue'];

var RXFormElement = function (_Component) {
    _inherits(RXFormElement, _Component);

    function RXFormElement(props) {
        _classCallCheck(this, RXFormElement);

        var _this = _possibleConstructorReturn(this, (RXFormElement.__proto__ || Object.getPrototypeOf(RXFormElement)).call(this, props));

        var _this$props = _this.props,
            debounceTime = _this$props.debounceTime,
            validations = _this$props.validations,
            activeRules = _this$props.activeRules;

        _this.props$ = new _rxjs2.default.Subject();
        _this.value$ = new _rxjs2.default.Subject().debounceTime(debounceTime);
        _this.state = _lodash2.default.pick(_this.props, propsList);
        _this.validations = validations.map(function (rule, index) {
            return getValidationRule(rule);
        });
        _this.activeRules = activeRules.map(function (rule) {
            return getActiveRule(rule);
        });
        return _this;
    }

    _createClass(RXFormElement, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.props$.subscribe(function (value) {
                return _this2.context.elementProps$.next(value);
            });
            this.value$.subscribe(function (value) {
                return _this2.context.elementValue$.next(value);
            });
            this.addValidationListeners();
            this.addActiveListeners();
            this.propChangeListeners();
            this.updateProps(null, 'register');
            this.readInputValue();
            _lodash2.default.each(propsList, function (prop) {
                _this2.updateProps(_this2.props[prop], prop);
            });
        }
    }, {
        key: 'readInputValue',
        value: function readInputValue() {
            this.updateValue(this.refs.inputElement.value, 'read');
        }
    }, {
        key: 'setIfNotEqualState',
        value: function setIfNotEqualState(newStateMap) {
            for (var newState in newStateMap) {
                var value = newStateMap[newState];
                if (this.state[newState] !== value) {
                    this.setState(_defineProperty({}, newState, value));
                }
            }
        }
    }, {
        key: 'propChangeListeners',
        value: function propChangeListeners() {
            var _this3 = this;

            var propChange$ = this.context.elementProps$.filter(function (e) {
                return e.field === _this3.props.name;
            });
            propChange$.subscribe(function (e) {
                _this3.setIfNotEqualState(_this3.context.elementPropIndex[_this3.props.name]);
            });
        }
    }, {
        key: 'addValidationListeners',
        value: function addValidationListeners() {
            var _this4 = this;

            var validateRequest$ = this.value$.filter(function (val) {
                return val.type === 'update';
            });
            var setError$ = validateRequest$.mergeMap(function (val) {
                return _rxjs2.default.Observable.from(_this4.validations).filter(function (rule) {
                    return rule.func(rule, val.value) !== true;
                }).take(1).defaultIfEmpty(null);
            });
            setError$.subscribe(function (rule, val) {
                _this4.updateProps(rule, 'error');
            });
        }
    }, {
        key: 'addActiveListeners',
        value: function addActiveListeners() {
            var _this5 = this;

            var elementName = this.props.name;
            if (this.activeRules.length === 0) {
                return;
            }

            var elementsToWatchForActive = _lodash2.default.map(this.activeRules, 'element');
            var valueChange$ = this.context.elementValue$;
            var valueIndex = this.context.elementValueIndex;
            valueChange$.filter(function (value) {
                return value.field !== elementName && elementsToWatchForActive.indexOf(value.field) > -1;
            }).mergeMap(function (value) {
                return _rxjs2.default.Observable.from(_this5.activeRules).filter(function (rule) {
                    return rule.func({ value: valueIndex[rule.element] }, rule) !== true;
                }).mapTo(false).defaultIfEmpty(true);
            }).subscribe(function (e) {
                _this5.updateProps(e, 'active');
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            e.preventDefault();
            this.updateValue(e.target.value, 'update');
        }
    }, {
        key: 'updateValue',
        value: function updateValue(value, type) {
            this.value$.next({ field: this.props.name, type: type, value: value });
        }
    }, {
        key: 'updateProps',
        value: function updateProps(value, type) {
            this.props$.next({ field: this.props.name, type: type, value: value });
        }
    }, {
        key: 'getRestProps',
        value: function getRestProps() {
            var props = _lodash2.default.omit(this.props, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'error', 'validations', 'activeRules', 'valid');
            props.ref = 'inputElement';
            return props;
        }
    }, {
        key: 'getFormClasses',
        value: function getFormClasses() {
            var classArray = ['form-group'];
            if (this.state.errors) {
                classArray.push('has-error');
            }
            return classArray.join(' ');
        }
    }, {
        key: 'renderElement',
        value: function renderElement() {
            var restProps = this.getRestProps();
            return _react2.default.createElement('input', _extends({}, restProps, { onChange: this.onChange.bind(this) }));
        }
    }, {
        key: 'getErrors',
        value: function getErrors() {
            return this.state.errors;
        }
    }, {
        key: 'renderElementWithWrapper',
        value: function renderElementWithWrapper() {
            var formClasses = this.getFormClasses();
            var elementProps = this.context.elementPropIndex[this.props.name];
            var error = this.state.error;
            return _react2.default.createElement(
                'fieldset',
                { className: formClasses },
                this.props.showLabel ? _react2.default.createElement(
                    'label',
                    null,
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
    }, {
        key: 'render',
        value: function render() {
            if (this.state.active) {
                return this.renderElementWithWrapper();
            } else {
                return null;
            }
        }
    }]);

    return RXFormElement;
}(_react.Component);

exports.default = RXFormElement;


RXFormElement.contextTypes = {
    elementProps$: _react.PropTypes.object.isRequired,
    elementValue$: _react.PropTypes.object.isRequired,
    elementPropIndex: _react.PropTypes.object.isRequired,
    elementValueIndex: _react.PropTypes.object.isRequired
};

RXFormElement.propTypes = {
    type: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string.isRequired,
    label: _react.PropTypes.string.isRequired,
    defaultValue: _react.PropTypes.string.isRequired,
    showLabel: _react.PropTypes.bool.isRequired,
    active: _react.PropTypes.bool.isRequired,
    disabled: _react.PropTypes.bool.isRequired,
    valid: _react.PropTypes.bool.isRequired,
    error: _react.PropTypes.object,
    debounceTime: _react.PropTypes.number.isRequired,
    validations: _react.PropTypes.array,
    activeRules: _react.PropTypes.array
};

RXFormElement.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input',
    showLabel: true,
    active: true,
    disabled: false,
    valid: true,
    defaultValue: '',
    debounceTime: 0,
    error: null,
    validations: [],
    activeRules: []
};