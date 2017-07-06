'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rxutils = require('../../core/rxutils');

var _utils = require('../../core/utils');

var _validationRules = require('./validationRules');

var _validationRules2 = _interopRequireDefault(_validationRules);

var _activeRules = require('./activeRules');

var _activeRules2 = _interopRequireDefault(_activeRules);

var _dataLoader = require('../../core/dataLoader');

var _dataLoader2 = _interopRequireDefault(_dataLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultPropReturnFunction = _utils._.identity;

var returnTrueFunction = function returnTrueFunction() {
    return true;
};

var getValidationRule = function getValidationRule(item) {
    return {
        type: item.expr,
        value: item.value,
        length: item.length,
        func: item.expr === 'function' ? item.func : _validationRules2.default[item.expr],
        message: item.message || item.expr
    };
};

var getActiveRule = function getActiveRule(item) {
    return {
        type: item.expr,
        element: item.element,
        prop: item.prop || 'update',
        value: item.value,
        func: item.expr === 'function' ? item.func : _activeRules2.default[item.expr]
    };
};

var getPropRule = function getPropRule(item) {
    return {
        type: item.expr,
        element: item.element,
        prop: item.prop,
        value: item.value,
        valueFunc: item.valueFunc || defaultPropReturnFunction,
        func: item.expr === 'function' ? item.func : _activeRules2.default[item.expr]
    };
};

var getServerValidationRule = function getServerValidationRule(rule) {
    return {
        requestId: rule.requestId,
        getParams: rule.getParams || _utils._.identity,
        validateRequest: rule.validateRequest || returnTrueFunction
    };
};

var RXFormElement = function (_Component) {
    _inherits(RXFormElement, _Component);

    function RXFormElement(props) {
        _classCallCheck(this, RXFormElement);

        var _this = _possibleConstructorReturn(this, (RXFormElement.__proto__ || Object.getPrototypeOf(RXFormElement)).call(this, props));

        var _this$props = _this.props,
            _this$props$debounceT = _this$props.debounceTime,
            debounceTime = _this$props$debounceT === undefined ? 0 : _this$props$debounceT,
            validations = _this$props.validations,
            activeRules = _this$props.activeRules,
            propRules = _this$props.propRules;

        _this.props$ = new _rxutils.Rx.Subject();
        _this.unmount$ = new _rxutils.Rx.Subject();
        // this.talkToForm$ = new Rx.Subject();
        _this.value$ = new _rxutils.Rx.Subject().debounceTime(debounceTime);
        // this.selection$ = new Rx.Subject();
        _this.state = _utils._.pick(_this.props, _this.getPropToStateList());
        _this.state.__shadowValue = _this.props.value;
        _this._value = _this.props.value;
        _this.validations = validations.map(function (rule) {
            return getValidationRule(rule);
        });
        _this.activeRules = activeRules.map(function (rule) {
            return getActiveRule(rule);
        });
        _this.propRules = propRules.map(function (rule) {
            return getPropRule(rule);
        });
        return _this;
    }

    _createClass(RXFormElement, [{
        key: 'getPropToStateList',
        value: function getPropToStateList() {
            return ['active', 'error', 'disabled', 'valid', 'value', 'type', 'serverValid', 'serverError', 'placeholder'];
        }
    }, {
        key: 'applyValue',
        value: function applyValue(value) {
            this.updateValue(value, 'update');
        }

        /*    componentWillReceiveProps(newProps) {
         _.each(this.getPropToStateList(), (prop) => {
         if (newProps[prop]) {
         if (prop === 'value') {
         this.applyValue(newProps[prop])
         }
         this.updateProps(newProps[prop], prop)
         }
         })
         }*/

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var groupedProps$ = this.props$.groupBy(function (x) {
                return x.type + '--' + x.field;
            });
            groupedProps$.mergeMap(function (group) {
                return group.distinctUntilChanged(function (a, b) {
                    return a.value === b.value;
                });
            }).takeUntil(this.unmount$).subscribe(function (value) {
                return _this2.context.elementProps$.next(value);
            });

            this.value$.distinctUntilChanged(function (a, b) {
                return a.value === b.value;
            }).takeUntil(this.unmount$).subscribe(function (value) {
                return _this2.context.elementValue$.next(value);
            });

            this.addValidationListeners();
            this.addServerValidationListeners();
            this.addActiveListeners();
            this.addPropListeners();
            this.addCommunicationListeners();
            this.propChangeListeners();
            this.updateProps(null, 'register');
            this.readInputValue();
            _utils._.each(this.getPropToStateList(), function (prop) {
                _this2.updateProps(_this2.state[prop], prop);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.updateProps(null, 'clear');
            this.unmount$.next();
        }
    }, {
        key: 'readInputValue',
        value: function readInputValue() {
            this.updateValue(this.props.value, 'read');
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
            propChange$.takeUntil(this.unmount$).subscribe(function (e) {
                _this3.setState(_this3.context.elementPropIndex[_this3.props.name]);
            });
        }
    }, {
        key: 'addCommunicationListeners',
        value: function addCommunicationListeners() {
            var _this4 = this;

            var setSibling$ = this.context.communication$.filter(function (val) {
                return val.type === 'elementValue' && val.field === _this4.props.name;
            });
            setSibling$.takeUntil(this.unmount$).subscribe(function (val) {
                _this4.applyValue(val.value);
            });

            var setSiblingProp$ = this.context.communication$.filter(function (val) {
                return val.type === 'elementProp' && val.field === _this4.props.name;
            });
            setSiblingProp$.takeUntil(this.unmount$).subscribe(function (val) {
                _this4.updateProps(val.value, val.prop);
            });
        }
    }, {
        key: 'addServerValidationListeners',
        value: function addServerValidationListeners() {
            var _this5 = this;

            if (this.props.serverValidation) {
                var forceServerValidation$ = this.context.communication$.filter(function (val) {
                    return val.type === 'elementServerValidation' && val.field === _this5.props.name;
                });
                var serverValidation = getServerValidationRule(this.props.serverValidation);
                var validateRequest$ = this.value$.filter(function (val) {
                    return val.type === 'update';
                }).merge(forceServerValidation$).debounceTime(400).filter(function () {
                    return _this5.state.valid;
                }).filter(function (val) {
                    return serverValidation.validateRequest(val, _this5.context.elementValueIndex);
                });
                var setError$ = validateRequest$.mergeMap(function (val) {
                    return _rxutils.Rx.Observable.fromPromise(_dataLoader2.default.getRequestDef(serverValidation.requestId, serverValidation.getParams(val, _this5.context.elementValueIndex)));
                }).combineLatest().defaultIfEmpty(null);
                setError$.takeUntil(this.unmount$).subscribe(function (resp) {
                    _this5.updateProps(resp[0], 'serverError');
                    _this5.updateProps(resp[0] ? false : true, 'serverValid');
                }, function (resp) {
                    _this5.updateProps(resp[0], 'serverError');
                    _this5.updateProps(resp[0] ? false : true, 'serverValid');
                });
            }
        }
    }, {
        key: 'addValidationListeners',
        value: function addValidationListeners() {
            var _this6 = this;

            var forceValidate$ = this.context.communication$.filter(function (val) {
                return val.type === 'validate' && val.field === _this6.props.name;
            });
            var validateRequest$ = this.value$.filter(function (val) {
                return val.type === 'update';
            }).merge(forceValidate$);
            var setError$ = validateRequest$.mergeMap(function (val) {
                return _rxutils.Rx.Observable.from(_this6.validations).filter(function (rule) {
                    return rule.func.call(_this6, rule, val.value) !== true;
                }).take(1).defaultIfEmpty(null);
            });
            setError$.takeUntil(this.unmount$).subscribe(function (rule, val) {
                _this6.updateProps(rule ? false : true, 'valid');
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

            var elementsToWatchForActive = _utils._.map(this.activeRules, 'element');
            var valueChange$ = this.context.elementValue$;
            var valueIndex = this.context.elementValueIndex;
            valueChange$.filter(function (value) {
                return value.field !== elementName && elementsToWatchForActive.indexOf(value.field) > -1;
            })
            // .do(value=>console.log(value, 'activeCheck'))
            .mergeMap(function (value) {
                return _rxutils.Rx.Observable.from(_this7.activeRules).filter(function (rule) {
                    return rule.func.call(_this7, { value: valueIndex[rule.element] }, rule) !== true;
                }).mapTo(false).defaultIfEmpty(true);
            }).takeUntil(this.unmount$).subscribe(function (e) {
                _this7.updateProps(e, 'active');
            });
        }
    }, {
        key: 'addPropListeners',
        value: function addPropListeners() {
            var _this8 = this;

            var elementName = this.props.name;
            var propRules = this.propRules;

            if (propRules.length === 0) {
                return;
            }

            var groupedPropRules = _utils._.groupBy(propRules, function (e) {
                return e.prop;
            });

            var elementsToWatchForActive = _utils._.map(propRules, 'element');
            var valueChange$ = this.context.elementValue$;
            var valueIndex = this.context.elementValueIndex;

            valueChange$.filter(function (value) {
                return value.field !== elementName && value.type === 'update' && elementsToWatchForActive.indexOf(value.field) > -1;
            })
            // .do(value=>console.log(value, 'activeCheck'))
            .takeUntil(this.unmount$).subscribe(function (value) {
                _utils._.each(groupedPropRules, function (rules, prop) {
                    var propValue = _utils._.reduce(rules, function (memo, rule) {
                        return !memo && rule.func.call(_this8, { value: valueIndex[rule.element] }, rule) === true;
                    }, false);
                    _this8.updateProps(_this8.props.getPropValue(prop, propValue), prop);
                });
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            this.updateValue(e.target.value, 'update');
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this._value;
        }
    }, {
        key: 'updateValue',
        value: function updateValue(value, type) {
            this._value = value;
            this.value$.next({ field: this.props.name, type: type, value: value });
            this.updateProps(value, 'value');
        }
    }, {
        key: 'updateProps',
        value: function updateProps(value, type) {
            this.props$.next({ field: this.props.name, type: type, value: value });
        }
    }, {
        key: 'getRestProps',
        value: function getRestProps() {
            var props = _utils._.omit(this.state, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'error', 'validations', 'activeRules', 'valid', 'serverValidation', '__shadowValue', 'register', 'clear', 'exposeName', 'exposeSelection', 'serverValid', 'serverError');
            props.ref = 'inputElement';
            props.className = (props.className || '') + ' ' + 'form-control';
            return props;
        }
    }, {
        key: 'getFormClasses',
        value: function getFormClasses() {
            var classArray = ['form-group'];
            classArray.push('element');
            classArray.push('element-type-' + this.props.type);
            classArray.push('element-' + this.props.name);
            if (this.state.errors) {
                classArray.push('has-error');
            }
            if (this.props.disabled) {
                classArray.push('disabled');
            }
            return classArray;
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
        key: 'setSiblingValue',
        value: function setSiblingValue(siblingName, value) {
            this.context.communication$.next({ field: siblingName, type: 'elementValue', value: value });
        }
    }, {
        key: 'getSiblingValue',
        value: function getSiblingValue(siblingName) {
            return this.context.valueIndex[siblingName];
        }
    }, {
        key: 'renderElementWithWrapper',
        value: function renderElementWithWrapper() {
            var formClasses = this.getFormClasses();
            var elementProps = this.context.elementPropIndex[this.props.name];
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
    communication$: _react.PropTypes.object.isRequired,
    elementPropIndex: _react.PropTypes.object.isRequired,
    elementValueIndex: _react.PropTypes.object.isRequired
};

RXFormElement.propTypes = {
    type: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string.isRequired,
    label: _react.PropTypes.string.isRequired,
    value: _react.PropTypes.string.isRequired,
    showLabel: _react.PropTypes.bool.isRequired,
    active: _react.PropTypes.bool.isRequired,
    disabled: _react.PropTypes.bool.isRequired,
    valid: _react.PropTypes.bool.isRequired,
    serverValid: _react.PropTypes.bool.isRequired,
    error: _react.PropTypes.object,
    debounceTime: _react.PropTypes.number.isRequired,
    validations: _react.PropTypes.array,
    activeRules: _react.PropTypes.array,
    serverValidation: _react.PropTypes.object
};

RXFormElement.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input',
    value: '',
    showLabel: true,
    active: true,
    disabled: false,
    valid: true,
    serverValid: true,
    debounceTime: 0,
    error: null,
    serverError: null,
    validations: [],
    activeRules: [],
    propRules: [],
    getPropValue: function getPropValue(prop, value) {
        return value;
    },
    serverValidation: null
};