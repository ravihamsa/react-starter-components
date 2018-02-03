'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RXElementGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rxutils = require('../../core/rxutils');

var _utils = require('../../core/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ensurePropertyIndex = function ensurePropertyIndex(obj, prop) {
    obj[prop] = obj[prop] || {};
};

var RXForm = function (_Component) {
    _inherits(RXForm, _Component);

    function RXForm(props) {
        _classCallCheck(this, RXForm);

        var _this = _possibleConstructorReturn(this, (RXForm.__proto__ || Object.getPrototypeOf(RXForm)).call(this, props));

        _this.hasController = false;
        _this.elementProps$ = new _rxutils.Rx.Subject();
        _this.elementValue$ = new _rxutils.Rx.Subject();
        _this.communication$ = new _rxutils.Rx.Subject();
        _this.unmount$ = new _rxutils.Rx.Subject();
        _this.elementPropIndex = {};
        _this.valueIndex = {};
        var _this$props = _this.props,
            controllerKey = _this$props.controllerKey,
            controller = _this$props.controller;

        if (controller && controllerKey) {
            _this.valueIndex = controller.toJSON()[controllerKey];
            _this.hasController = true;
        }
        return _this;
    }

    _createClass(RXForm, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var read$ = this.elementValue$.filter(function (e) {
                return e.type === 'read';
            });
            var update$ = this.elementValue$.filter(function (e) {
                return e.type === 'update';
            });
            var skipValidateUpdate$ = this.elementValue$.filter(function (e) {
                return e.type === 'skipValidateUpdate';
            });
            var selection$ = this.elementValue$.filter(function (e) {
                return e.type === 'selection';
            });
            var name$ = this.elementValue$.filter(function (e) {
                return e.type === 'name';
            });
            var register$ = this.elementProps$.filter(function (e) {
                return e.type === 'register';
            });
            var clear$ = this.elementProps$.filter(function (e) {
                return e.type === 'clear';
            });
            var other$ = this.elementProps$.filter(function (e) {
                return e.type !== 'register' && e.type !== 'clear';
            });
            var shadowValue$ = this.elementProps$.filter(function (e) {
                return e.type !== '__shadowValue';
            });
            //&& e.type !== '__shadowValue'

            register$.takeUntil(this.unmount$).subscribe(function (val) {
                ensurePropertyIndex(_this2.elementPropIndex, val.field);
            });

            other$.merge(shadowValue$).takeUntil(this.unmount$).subscribe(function (val) {
                ensurePropertyIndex(_this2.elementPropIndex[val.field], val.type);
                _this2.elementPropIndex[val.field][val.type] = val.value;
            });

            read$.merge(update$, selection$, name$, skipValidateUpdate$).takeUntil(this.unmount$).subscribe(function (val) {
                _this2.valueIndex[val.field] = val.value;
            });

            read$.takeUntil(this.unmount$).subscribe(function (val) {
                _this2.valueReadHandler(_defineProperty({}, val.field, val.value), _this2.valueIndex);
            });

            update$.takeUntil(this.unmount$).subscribe(function (val) {
                _this2.valueChangeHandler(_defineProperty({}, val.field, val.value), _this2.valueIndex);
            });

            skipValidateUpdate$.takeUntil(this.unmount$).subscribe(function (val) {
                _this2.selectionReadHandler(_defineProperty({}, val.field, val.value), _this2.valueIndex);
            });

            other$.takeUntil(this.unmount$).subscribe(function (val) {
                _this2.propChangeHandler(val);
            });

            clear$.takeUntil(this.unmount$).subscribe(function (val) {
                delete _this2.valueIndex[val.field];
                delete _this2.elementPropIndex[val.field];
                _this2.valueChangeHandler(_defineProperty({}, val.field, val.value), _this2.valueIndex);
            });
            // this.elementValue$.subscribe(e => console.log(e))
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unmount$.next();
        }
    }, {
        key: 'propChangeHandler',
        value: function propChangeHandler(changed) {
            // console.log(changed, fullObject);
            if (this.props.onPropChange) {
                this.props.onPropChange(changed);
            }
        }
    }, {
        key: 'valueChangeHandler',
        value: function valueChangeHandler(changed, fullObject) {
            // console.log(changed, fullObject);
            var _props = this.props,
                controller = _props.controller,
                name = _props.name,
                onValueChange = _props.onValueChange;

            if (onValueChange) {
                onValueChange(changed, fullObject);
            }
            if (controller && name && controller.set) {
                controller.set(name, fullObject);
            }
        }
    }, {
        key: 'valueReadHandler',
        value: function valueReadHandler(changed, fullObject) {
            var _props2 = this.props,
                controller = _props2.controller,
                name = _props2.name,
                onValueRead = _props2.onValueRead;

            if (onValueRead) {
                onValueRead(changed, fullObject);
            }
            if (controller && name && controller.set) {
                controller.set(name, fullObject);
            }
        }
    }, {
        key: 'selectionReadHandler',
        value: function selectionReadHandler(changed) {
            // console.log(changed, fullObject);
            var onSelectionRead = this.props.onSelectionRead;

            if (onSelectionRead) {
                onSelectionRead(changed);
            }
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                elementProps$: this.elementProps$,
                elementValue$: this.elementValue$,
                communication$: this.communication$,
                elementPropIndex: this.elementPropIndex,
                elementValueIndex: this.valueIndex,
                hasController: this.hasController
            };
        }
    }, {
        key: 'getValueObject',
        value: function getValueObject() {
            var valueObj = {};
            var errors = [];
            for (var elementName in this.elementPropIndex) {
                var propObject = this.elementPropIndex[elementName];
                if (propObject.active) {
                    this.communication$.next({
                        field: elementName, type: 'validate', value: this.valueIndex[elementName]
                    });
                    if (propObject.valid && propObject.serverValid) {
                        valueObj[elementName] = this.valueIndex[elementName];
                        if (propObject.exposeName) {
                            valueObj[elementName + '_name'] = this.valueIndex[elementName + '_name'];
                        }
                        if (propObject.exposeSelection) {
                            valueObj[elementName + '_selection'] = this.valueIndex[elementName + '_selection'];
                        }
                    } else {
                        var error = propObject.error || propObject.serverError;
                        errors.push([{
                            field: elementName, type: error.type, message: error.message
                        }]);
                    }
                }
            }
            return {
                errors: errors,
                data: valueObj
            };
        }
    }, {
        key: 'setElementValue',
        value: function setElementValue(elementName, value) {
            this.communication$.next({
                field: elementName, type: 'elementValue', value: value
            });
        }
    }, {
        key: 'setElementValues',
        value: function setElementValues(map) {
            for (var elementName in map) {
                this.setElementValue(elementName, map[elementName]);
            }
        }
    }, {
        key: 'setElementProp',
        value: function setElementProp(elementName, prop, value) {
            this.communication$.next({
                field: elementName, type: 'elementProp', prop: prop, value: value
            });
        }
    }, {
        key: 'setElementProps',
        value: function setElementProps(map) {
            for (var elementName in map) {
                this.setElementProp(elementName, map[elementName].prop, map[elementName].value);
            }
        }
    }, {
        key: 'clearFields',
        value: function clearFields(fields) {
            var _this3 = this;

            _utils._.each(fields, function (elementName) {
                _this3.communication$.next({
                    field: elementName,
                    type: 'clearElement'
                });
            });
        }
    }, {
        key: 'forceElementServerValidation',
        value: function forceElementServerValidation(elementName) {
            this.communication$.next({
                field: elementName,
                type: 'elementServerValidation',
                value: this.valueIndex[elementName]
            });
        }
    }, {
        key: 'onSubmitHandler',
        value: function onSubmitHandler(e) {
            e.preventDefault();
            if (this.props.onSubmitHandler) {
                this.props.onSubmitHandler(this.getValueObject());
            }
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

    return RXForm;
}(_react.Component);

exports.default = RXForm;

var RXElementGroup = exports.RXElementGroup = function (_RXForm) {
    _inherits(RXElementGroup, _RXForm);

    function RXElementGroup() {
        _classCallCheck(this, RXElementGroup);

        return _possibleConstructorReturn(this, (RXElementGroup.__proto__ || Object.getPrototypeOf(RXElementGroup)).apply(this, arguments));
    }

    _createClass(RXElementGroup, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                this.props.children
            );
        }
    }]);

    return RXElementGroup;
}(RXForm);

RXForm.childContextTypes = {
    elementProps$: _propTypes2.default.object.isRequired,
    elementValue$: _propTypes2.default.object.isRequired,
    communication$: _propTypes2.default.object.isRequired,
    elementPropIndex: _propTypes2.default.object.isRequired,
    elementValueIndex: _propTypes2.default.object.isRequired,
    hasController: _propTypes2.default.bool.isRequired
};

RXForm.propTypes = _extends({}, _react.Component.propTypes, {
    onSubmitHandler: _propTypes2.default.func
});