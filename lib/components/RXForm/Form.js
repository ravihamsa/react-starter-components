'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Select2 = exports.Form2Element = undefined;

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/25/17.
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

var ensurePropertyIndex = function ensurePropertyIndex(obj, prop) {
    obj[prop] = obj[prop] || {};
};

var Form2 = function (_Component) {
    _inherits(Form2, _Component);

    function Form2(props) {
        _classCallCheck(this, Form2);

        var _this = _possibleConstructorReturn(this, (Form2.__proto__ || Object.getPrototypeOf(Form2)).call(this, props));

        _this.elementProps$ = new _rxjs2.default.Subject();
        _this.elementValue$ = new _rxjs2.default.Subject();
        _this.elementPropIndex = {};
        _this.valueIndex = {};
        return _this;
    }

    _createClass(Form2, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var read$ = this.elementValue$.filter(function (e) {
                return e.type === 'read';
            });
            var update$ = this.elementValue$.filter(function (e) {
                return e.type === 'update';
            });
            var register$ = this.elementProps$.filter(function (e) {
                return e.type === 'register';
            });
            var other$ = this.elementProps$.filter(function (e) {
                return e.type !== 'register';
            });

            register$.subscribe(function (val) {
                ensurePropertyIndex(_this2.elementPropIndex, val.field);
            });

            other$.subscribe(function (val) {
                ensurePropertyIndex(_this2.elementPropIndex[val.field], val.type);
                _this2.elementPropIndex[val.field][val.type] = val.value;
            });

            read$.merge(update$).subscribe(function (val) {
                _this2.valueIndex[val.field] = val.value;
            });

            update$.subscribe(function (val) {
                _this2.valueChangeHandler(_defineProperty({}, val.field, val.value), _this2.valueIndex);
            });
        }
    }, {
        key: 'valueChangeHandler',
        value: function valueChangeHandler(changed, fullObject) {
            // console.log(changed, fullObject);
            if (this.props.onValueChange) {
                this.props.onValueChange(changed, fullObject);
            }
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                elementProps$: this.elementProps$,
                elementValue$: this.elementValue$,
                elementPropIndex: this.elementPropIndex,
                elementValueIndex: this.valueIndex
            };
        }
    }, {
        key: 'onSubmitHandler',
        value: function onSubmitHandler(e) {
            e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { onSubmit: this.onSubmitHandler.bind(this), className: this.props.className },
                this.props.children
            );
        }
    }]);

    return Form2;
}(_react.Component);

exports.default = Form2;


Form2.childContextTypes = {
    elementProps$: _react.PropTypes.object.isRequired,
    elementValue$: _react.PropTypes.object.isRequired,
    elementPropIndex: _react.PropTypes.object.isRequired,
    elementValueIndex: _react.PropTypes.object.isRequired
};

var emptyArray = [];

var propsList = ['active', 'error', 'disabled', 'valid', 'activeRules'];

var Form2Element = exports.Form2Element = function (_Component2) {
    _inherits(Form2Element, _Component2);

    function Form2Element(props) {
        _classCallCheck(this, Form2Element);

        var _this3 = _possibleConstructorReturn(this, (Form2Element.__proto__ || Object.getPrototypeOf(Form2Element)).call(this, props));

        var _this3$props = _this3.props,
            debounceTime = _this3$props.debounceTime,
            validations = _this3$props.validations,
            activeRules = _this3$props.activeRules;

        _this3.props$ = new _rxjs2.default.Subject();
        _this3.value$ = new _rxjs2.default.Subject().debounceTime(debounceTime);
        _this3.state = _lodash2.default.pick(_this3.props, propsList);
        _this3.validations = validations.map(function (rule, index) {
            return getValidationRule(rule);
        });
        _this3.activeRules = activeRules.map(function (rule) {
            return getActiveRule(rule);
        });
        return _this3;
    }

    _createClass(Form2Element, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            this.props$.subscribe(function (value) {
                return _this4.context.elementProps$.next(value);
            });
            this.value$.subscribe(function (value) {
                return _this4.context.elementValue$.next(value);
            });
            this.addValidationListeners();
            this.addActiveListeners();
            this.propChangeListeners();
            this.updateProps(null, 'register');
            this.updateValue(this.refs.inputElement.value, 'read');
            _lodash2.default.each(propsList, function (prop) {
                _this4.updateProps(_this4.props[prop], prop);
            });
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
            var _this5 = this;

            var propChange$ = this.context.elementProps$.filter(function (e) {
                return e.field === _this5.props.name;
            });
            propChange$.subscribe(function (e) {
                _this5.setIfNotEqualState(_this5.context.elementPropIndex[_this5.props.name]);
            });
        }
    }, {
        key: 'addValidationListeners',
        value: function addValidationListeners() {
            var _this6 = this;

            var validateRequest$ = this.value$.filter(function (val) {
                return val.type === 'update';
            });
            var setError$ = validateRequest$.mergeMap(function (val) {
                return _rxjs2.default.Observable.from(_this6.validations).filter(function (rule) {
                    return rule.func(rule, val.value) !== true;
                }).take(1).defaultIfEmpty(null);
            });
            setError$.subscribe(function (rule, val) {
                _this6.updateProps(rule, 'error');
            });
        }
    }, {
        key: 'addActiveListeners',
        value: function addActiveListeners() {
            var _this7 = this;

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
                return _rxjs2.default.Observable.from(_this7.activeRules).filter(function (rule) {
                    return rule.func({ value: valueIndex[rule.element] }, rule) !== true;
                }).mapTo(false).defaultIfEmpty(true);
            }).subscribe(function (e) {
                _this7.updateProps(e, 'active');
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
            console.log(elementProps, 'elementProps');
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

    return Form2Element;
}(_react.Component);

var Select2 = exports.Select2 = function (_Form2Element) {
    _inherits(Select2, _Form2Element);

    function Select2() {
        _classCallCheck(this, Select2);

        return _possibleConstructorReturn(this, (Select2.__proto__ || Object.getPrototypeOf(Select2)).apply(this, arguments));
    }

    _createClass(Select2, [{
        key: 'renderElement',
        value: function renderElement() {
            var restProps = this.getRestProps();
            var options = this.props.options;
            return _react2.default.createElement(
                'select',
                _extends({}, restProps, { onChange: this.onChange.bind(this) }),
                _react2.default.createElement(
                    'option',
                    { value: '-1' },
                    'Select'
                ),
                options.map(function (option, index) {
                    return _react2.default.createElement(
                        'option',
                        { value: option.id, key: index },
                        option.name
                    );
                }, this)
            );
        }
    }]);

    return Select2;
}(Form2Element);

Form2Element.contextTypes = {
    elementProps$: _react.PropTypes.object.isRequired,
    elementValue$: _react.PropTypes.object.isRequired,
    elementPropIndex: _react.PropTypes.object.isRequired,
    elementValueIndex: _react.PropTypes.object.isRequired
};

Form2Element.propTypes = {
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

Form2Element.defaultProps = {
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

Select2.defaultProps = _extends({}, Form2Element.defaultProps, {
    defaultValue: '-1'
});