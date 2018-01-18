'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
        _this.selection$ = new _rxutils.Rx.Subject();
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
        _this.clearing = false;
        return _this;
    }

    _createClass(RXFormElement, [{
        key: 'getPropToStateList',
        value: function getPropToStateList() {
            return ['active', 'error', 'disabled', 'valid', 'value', 'type', 'serverValid', 'serverError', 'placeholder', 'name', 'autoFocus', 'inProgress', 'isDirty'];
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
            this.selection$.distinctUntilChanged(function (a, b) {
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
            var _context = this.context,
                hasController = _context.hasController,
                valueIndex = _context.valueIndex;

            if (!hasController) {
                this.updateValue(this.props.value, 'read');
            } else {
                this.updateValue(valueIndex[this.props.name], 'read');
            }
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
                if (_this3.context.elementPropIndex[_this3.props.name]) {
                    _this3.setState(_this3.context.elementPropIndex[_this3.props.name]);
                }
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

            var clearElement$ = this.context.communication$.filter(function (val) {
                return val.type === 'clearElement' && val.field === _this4.props.name;
            });
            clearElement$.takeUntil(this.unmount$).subscribe(function (val) {
                _this4.clearing = true;
                _this4.applyValue(_this4.getClearValue());
            });
        }
    }, {
        key: 'getClearValue',
        value: function getClearValue() {
            return '';
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
                }).do(function () {
                    return _this5.updateProps(true, 'inProgress');
                }).do(function () {
                    return _this5.updateProps(true, 'isDirty');
                }).filter(function (val) {
                    return serverValidation.validateRequest(val, _this5.context.elementValueIndex);
                });
                var setError$ = validateRequest$.mergeMap(function (val) {
                    return _rxutils.Rx.Observable.fromPromise(_dataLoader2.default.getRequestDef(serverValidation.requestId, serverValidation.getParams(val, _this5.context.elementValueIndex)));
                }).combineLatest().defaultIfEmpty(null);
                setError$.takeUntil(this.unmount$).subscribe(function (resp) {
                    _this5.updateProps(resp[0], 'serverError');
                    _this5.updateProps(resp[0] ? false : true, 'serverValid');
                    _this5.updateProps(false, 'inProgress');
                }, function (resp) {
                    _this5.updateProps(resp[0], 'serverError');
                    _this5.updateProps(resp[0] ? false : true, 'serverValid');
                    _this5.updateProps(false, 'inProgress');
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
                if (_this6.clearing) {
                    _this6.updateProps(true, 'valid');
                    _this6.updateProps(null, 'error');
                    _this6.clearing = false;
                } else {
                    _this6.updateProps(rule ? false : true, 'valid');
                    _this6.updateProps(rule, 'error');
                }
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
                    return rule.func.call(_this7, {
                        value: valueIndex[rule.element]
                    }, rule) !== true;
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
                        return !memo && rule.func.call(_this8, {
                            value: valueIndex[rule.element]
                        }, rule) === true;
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
        value: function updateValue(raWvalue, type) {
            var value = raWvalue;
            if (this.props.trimValue) {
                value = _utils._.trim(raWvalue);
            }
            this._value = value;
            this.value$.next({
                field: this.props.name, type: type, value: value
            });
            this.updateProps(value, 'value');
        }
    }, {
        key: 'updateProps',
        value: function updateProps(value, type) {
            this.props$.next({
                field: this.props.name, type: type, value: value
            });
        }
    }, {
        key: 'getRestProps',
        value: function getRestProps() {
            var props = _utils._.omit(this.state, 'showLabel', 'debounceTime', 'options', 'helperText', 'active', 'error', 'validations', 'activeRules', 'valid', 'serverValidation', '__shadowValue', 'register', 'clear', 'exposeName', 'exposeSelection', 'serverValid', 'serverError', 'inProgress', 'isDirty');
            props.className = (props.className || '') + ' form-control';
            return props;
        }
    }, {
        key: 'getFormClasses',
        value: function getFormClasses() {
            var classArray = ['form-group'];
            classArray.push('element');
            classArray.push('element-type-' + this.props.type);
            classArray.push('element-' + this.props.name);
            if (this.state.error) {
                classArray.push('has-error');
            }
            if (this.props.disabled) {
                classArray.push('disabled');
            }
            if (this.state.isDirty) {
                classArray.push('changed');
            }
            if (this.state.inProgress) {
                classArray.push('in-progress');
            }
            if (!this.state.inProgress && this.state.isDirty && this.state.serverValid) {
                classArray.push('server-valid');
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
            this.context.communication$.next({
                field: siblingName, type: 'elementValue', value: value
            });
        }
    }, {
        key: 'getSiblingValue',
        value: function getSiblingValue(siblingName) {
            return this.context.elementValueIndex[siblingName];
        }
    }, {
        key: 'renderElementWithWrapper',
        value: function renderElementWithWrapper() {
            var formClasses = this.getFormClasses();
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
                if (this.props.stripWrapper) {
                    return this.renderElement();
                } else {
                    return this.renderElementWithWrapper();
                }
            } else {
                return null;
            }
        }
    }]);

    return RXFormElement;
}(_react.Component);

exports.default = RXFormElement;


RXFormElement.contextTypes = {
    elementProps$: _propTypes2.default.object.isRequired,
    elementValue$: _propTypes2.default.object.isRequired,
    communication$: _propTypes2.default.object.isRequired,
    elementPropIndex: _propTypes2.default.object.isRequired,
    elementValueIndex: _propTypes2.default.object.isRequired,
    hasController: _propTypes2.default.bool.isRequired
};

RXFormElement.propTypes = {
    type: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    helperText: _propTypes2.default.string,
    getPropValue: _propTypes2.default.func.isRequired,
    placeholder: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.string.isRequired,
    showLabel: _propTypes2.default.bool.isRequired,
    active: _propTypes2.default.bool.isRequired,
    disabled: _propTypes2.default.bool.isRequired,
    valid: _propTypes2.default.bool.isRequired,
    serverValid: _propTypes2.default.bool.isRequired,
    isDirty: _propTypes2.default.bool.isRequired,
    inProgress: _propTypes2.default.bool.isRequired,
    trimValue: _propTypes2.default.bool.isRequired,
    stripWrapper: _propTypes2.default.bool.isRequired,
    error: _propTypes2.default.object,
    debounceTime: _propTypes2.default.number.isRequired,
    validations: _propTypes2.default.array,
    activeRules: _propTypes2.default.array,
    propRules: _propTypes2.default.array,
    serverValidation: _propTypes2.default.object
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
    inProgress: false,
    isDirty: false,
    trimValue: false,
    stripWrapper: false,
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