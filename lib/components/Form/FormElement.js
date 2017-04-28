'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/29/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var validatorMap = {
    'req': function req(rule, value) {
        return !_lodash2.default.isEmpty(value);
    },
    'selReq': function selReq(rule, value) {
        return value !== '-1';
    },
    'digits': function digits(rule, value) {
        return (/^\d{5}$/.test(value)
        );
    },
    'alphanumeric': function alphanumeric(rule, value) {
        var ck_alphaNumeric = /^\w+$/;
        return ck_alphaNumeric.test(value);
    },
    'number': function number(rule, value) {
        if (value === undefined) {
            return true;
        }
        var numberVal = +value;
        return numberVal === numberVal;
    },
    'email': function email(rule, value) {
        var ck_email = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\\+]+)*@[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\+]+)*(\.[A-Za-z]{2,})$/i;
        return ck_email.test($.trim(value));
    },
    'minlen': function minlen(rule, value) {
        var min = rule.length;
        return $.trim(String(value)).length >= min;
    },
    'maxlen': function maxlen(rule, value) {
        var max = rule.length;
        return $.trim(String(value)).length <= max;
    },
    'lt': function lt(rule, value) {
        var target = parseFloat(rule.value);
        var curvalue = parseFloat(value);
        return curvalue < target;
    },
    'gt': function gt(rule, value) {
        var target = parseFloat(rule.value);
        var curvalue = parseFloat(value);
        return curvalue > target;
    },
    'eq': function eq(rule, value) {
        return rule.value === value;
    },
    'neq': function neq(rule, value) {
        return rule.value !== value;
    },
    'url': function url(rule, value) {
        if (value === '') {
            return true;
        }
        var ck_url = /(http|https|market):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
        return ck_url.test($.trim(value));
    },
    'emaillist': function emaillist(rule, value) {
        var emails = value.split(',');
        var ck_email = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        for (var i = 0; i < emails.length; i++) {
            if ($.trim(emails[i]) !== '' && !ck_email.test($.trim(emails[i]))) {
                return false;
            }
        }
        return true;
    },
    'function': function _function(rule, value) {
        var func = rule.func;
        return func.call(this, value, rule);
    }
};

var getRuleValue = function getRuleValue(item) {
    return {
        type: item.expr,
        value: item.value,
        element: item.element,
        func: item.expr === 'function' ? item.func : validatorMap[item.expr],
        message: item.message || item.expr
    };
};

var getPropRule = function getPropRule(item) {
    return {
        type: item.expr,
        element: item.element,
        prop: item.prop,
        value: item.value,
        valueFunc: item.valueFunc || _lodash2.default.identity,
        func: item.expr === 'function' ? item.func : activeRulesMap[item.expr]
    };
};

var FormElement = function (_Component) {
    _inherits(FormElement, _Component);

    function FormElement() {
        _classCallCheck(this, FormElement);

        var _this = _possibleConstructorReturn(this, (FormElement.__proto__ || Object.getPrototypeOf(FormElement)).apply(this, arguments));

        var _this$props = _this.props,
            _this$props$validatio = _this$props.validations,
            validations = _this$props$validatio === undefined ? [] : _this$props$validatio,
            _this$props$propRules = _this$props.propRules,
            propRules = _this$props$propRules === undefined ? [] : _this$props$propRules;

        _this.change$ = new _rxjs2.default.Subject();
        _this._changing = false;
        _this.state = {
            errors: []
        };
        _this.validations = _lodash2.default.filter(validations, function (item) {
            return item.element === undefined;
        }).map(function (rule, index) {
            return getRuleValue(rule);
        });

        _this.siblingValidations = _lodash2.default.filter(validations, function (item) {
            return item.element !== undefined;
        }).map(function (rule, index) {
            return getRuleValue(rule);
        });

        _this.propRules = propRules.map(function (rule, index) {
            return getRuleValue(rule);
        });
        return _this;
    }

    _createClass(FormElement, [{
        key: 'setState',
        value: function setState(arg1, arg2) {
            if (this.props.name === 'stateIds') {
                console.log(arg1, arg2, 'stateIds');
            }
            _get(FormElement.prototype.__proto__ || Object.getPrototypeOf(FormElement.prototype), 'setState', this).call(this, arg1, arg2);
        }
    }, {
        key: 'subscribeToChange',
        value: function subscribeToChange() {
            var _this2 = this;

            var debounceTime = this.props.debounceTime;
            if (debounceTime !== undefined) {
                this.changeSubscription = this.change$.debounceTime(debounceTime).subscribe(function (value) {
                    _this2.updateValueStore(value);
                    _this2._changing = false;
                });
            } else {
                this.changeSubscription = this.change$.subscribe(function (value) {
                    return _this2.updateValueStore(value);
                });
            }
        }
    }, {
        key: 'subscribeToValidation',
        value: function subscribeToValidation() {
            var siblingsToBeValidated = this.siblingValidations;
            if (siblingsToBeValidated.length === 0) {
                return;
            }
            var self = this;
            this.validationSubscription = this.context.valueStore.on('change', function (changed, fullObject) {
                self.validateSiblingsOnChange(changed);
                self.handlePropRules(changed, fullObject);
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            this.setValue(this.getValueFromNode(event.target));
        }
    }, {
        key: 'setValue',
        value: function setValue(value, skipValidate) {
            var name = this.props.name;
            var toSet = _defineProperty({}, name, value);

            if (this.props.options) {
                var multiSelect = this.multiSelect;
                var selectedOption = multiSelect ? _lodash2.default.filter(this.props.options, function (item) {
                    return value.indexOf(item.id) > -1;
                }) : this.props.options.find(function (item) {
                    return item.id === value;
                });
                this.context.valueDetailStore.set(_defineProperty({}, name, selectedOption));
                if (this.props.exposeSelection) {
                    toSet[name + '_selection'] = selectedOption;
                }
                if (this.props.exposeName && selectedOption) {
                    toSet[name + '_name'] = multiSelect ? _lodash2.default.map(selectedOption, 'name') : selectedOption.name;
                }
            }

            if (value === null) {
                if (this.props.exposeSelection) {
                    toSet[name + '_selection'] = undefined;
                }
                if (this.props.exposeName) {
                    toSet[name + '_name'] = undefined;
                }
            }
            // this.updateValueStore(toSet);
            // this.context.valueStore.set(toSet);
            this._changing = true;
            this.change$.next(toSet);
            if (skipValidate !== true) {
                this.validateValue(value);
            }
            this.setState({ defaultValue: value });
        }
    }, {
        key: 'updateValueStore',
        value: function updateValueStore(toSet) {
            this.context.valueStore.set(toSet);
        }
    }, {
        key: 'validateSiblingsOnChange',
        value: function validateSiblingsOnChange(changed) {
            var _this3 = this;

            var toValidateIds = this.siblingValidations.map(function (item) {
                return item.element;
            });
            var changedKey = _lodash2.default.keys(changed)[0];
            if (toValidateIds.indexOf(changedKey) > -1) {
                var errors = this.siblingValidations.filter(function (item) {
                    return item.element === changedKey && item.func.call(_this3, item, changed[changedKey]) === false;
                });
                this.context.errorStore.set(_defineProperty({}, changedKey, errors));
                this.setState({ siblingErrors: errors });
            }
        }
    }, {
        key: 'handlePropRules',
        value: function handlePropRules(changed, fullObjecdt) {
            var _this4 = this;

            var toValidateIds = this.propRules.map(function (item) {
                return item.element;
            });
            var changedKey = _lodash2.default.keys(changed)[0];
            if (toValidateIds.indexOf(changedKey) > -1) {
                var propValue = _lodash2.default.reduce(this.propRules, function (memo, rule) {
                    return !memo && rule.func.call(_this4, { value: fullObjecdt[rule.element] }, rule) === true;
                }, false);
                console.log(propValue);
            }
        }
    }, {
        key: 'validateSiblings',
        value: function validateSiblings() {
            var _this5 = this;

            var changedKey = this.props.name;
            var valueStore = this.context.valueStore;
            var errors = this.siblingValidations.filter(function (item) {
                return item.func.call(_this5, item, valueStore.get(item.element)) === false;
            });
            this.context.errorStore.set(_defineProperty({}, changedKey, errors));
            this.setState({ errors: errors });
        }
    }, {
        key: 'validateValue',
        value: function validateValue(value) {
            var _this6 = this;

            var name = this.props.name;
            var errors = this.validations.filter(function (item) {
                return item.func.call(_this6, item, value) === false;
            });
            this.context.errorStore.set(_defineProperty({}, name, errors));
            this.setState({ errors: errors });
            if (errors.length === 0) {
                this.validateSiblings();
            }
        }
    }, {
        key: 'getValueFromNode',
        value: function getValueFromNode(node) {
            return node.value;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var self = this;
            var name = self.props.name;
            var valueStoreValue = this.context.valueStore.get(this.props.name);
            if (valueStoreValue === undefined) {
                self.context.valueStore.set(_defineProperty({}, name, self.props.defaultValue));
            }
            self.context.elementIndex[name] = self;
            this.unsubscribeErrorStore = this.context.errorStore.on('forceValidate', function () {
                self.validateValue(self.context.valueStore.get(name));
            });
            this.subscribeToChange();
            this.subscribeToValidation();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.unsubscribeErrorStore) {
                this.unsubscribeErrorStore();
            }
            if (this.validationSubscription) {
                this.validationSubscription();
            }
            if (this.changeSubscription) {
                this.changeSubscription.unsubscribe();
            }
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return this._changing ? this.state.defaultValue : this.context.valueStore.get(this.props.name);
        }
    }, {
        key: 'getFormClasses',
        value: function getFormClasses() {
            var classArray = ['form-group'];
            classArray.push('element');
            classArray.push('element-type-' + this.props.type);
            classArray.push('element-' + this.props.name);
            var errors = this.getErrors();
            if (errors.length > 0) {
                classArray.push('has-error');
            }
            if (this.props.disabled) {
                classArray.push('disabled');
            }
            return classArray.join(' ');
        }
    }, {
        key: 'getErrors',
        value: function getErrors() {
            var errors = this.state && this.state.errors || [];
            var siblingErrors = this.state && this.state.siblingErrors || [];
            return errors.concat(siblingErrors);
        }
    }, {
        key: 'getSiblingValue',
        value: function getSiblingValue(siblingName) {
            return this.context.valueStore.get(siblingName);
        }
    }]);

    return FormElement;
}(_react.Component);

FormElement.contextTypes = {
    valueStore: _react.PropTypes.object.isRequired,
    valueDetailStore: _react.PropTypes.object.isRequired,
    errorStore: _react.PropTypes.object.isRequired,
    elementIndex: _react.PropTypes.object.isRequired
};

FormElement.propTypes = {
    type: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string.isRequired,
    label: _react.PropTypes.string.isRequired,
    defaultValue: _react.PropTypes.string,
    options: _react.PropTypes.array,
    exposeSelection: _react.PropTypes.bool,
    exposeName: _react.PropTypes.bool,
    showLabel: _react.PropTypes.bool.isRequired
};

FormElement.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input',
    showLabel: true,
    exposeSelection: false,
    exposeName: false
};

exports.default = FormElement;