'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RXElementGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

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

        _this.elementProps$ = new _rxjs2.default.Subject();
        _this.elementValue$ = new _rxjs2.default.Subject();
        _this.communication$ = new _rxjs2.default.Subject();
        _this.elementPropIndex = {};
        _this.valueIndex = {};
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

            register$.subscribe(function (val) {
                ensurePropertyIndex(_this2.elementPropIndex, val.field);
            });

            other$.merge(shadowValue$).subscribe(function (val) {
                ensurePropertyIndex(_this2.elementPropIndex[val.field], val.type);
                _this2.elementPropIndex[val.field][val.type] = val.value;
            });

            read$.merge(update$, selection$, name$).subscribe(function (val) {
                _this2.valueIndex[val.field] = val.value;
            });

            update$.subscribe(function (val) {
                _this2.valueChangeHandler(_defineProperty({}, val.field, val.value), _this2.valueIndex);
            });

            other$.subscribe(function (val) {
                _this2.propChangeHandler(val);
            });

            clear$.subscribe(function (val) {
                delete _this2.valueIndex[val.field];
                _this2.valueChangeHandler(_defineProperty({}, val.field, val.value), _this2.valueIndex);
            });
            // selection$.subscribe(e => console.log(e))
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
                communication$: this.communication$,
                elementPropIndex: this.elementPropIndex,
                elementValueIndex: this.valueIndex
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
                    this.communication$.next({ field: elementName, type: 'validate', value: this.valueIndex[elementName] });
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
                        errors.push([{ field: elementName, type: error.type, message: error.message }]);
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
            this.communication$.next({ field: elementName, type: 'elementValue', value: value });
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
            this.communication$.next({ field: elementName, type: 'elementProp', prop: prop, value: value });
        }
    }, {
        key: 'forceElementServerValidation',
        value: function forceElementServerValidation(elementName) {
            this.communication$.next({ field: elementName, type: 'elementServerValidation', value: this.valueIndex[elementName] });
        }
    }, {
        key: 'setElementProps',
        value: function setElementProps(map) {
            for (var elementName in map) {
                this.setElementValue(elementName, map[elementName].prop, map[elementName].value);
            }
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
    elementProps$: _react.PropTypes.object.isRequired,
    elementValue$: _react.PropTypes.object.isRequired,
    communication$: _react.PropTypes.object.isRequired,
    elementPropIndex: _react.PropTypes.object.isRequired,
    elementValueIndex: _react.PropTypes.object.isRequired
};