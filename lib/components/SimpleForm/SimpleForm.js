'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Collector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../core/utils');

var _immutable = require('immutable');

var _SimpleControllerV = require('../../core/SimpleControllerV2');

var _SimpleControllerV2 = _interopRequireDefault(_SimpleControllerV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Collector = exports.Collector = function (_Component) {
    _inherits(Collector, _Component);

    function Collector(props) {
        _classCallCheck(this, Collector);

        var _this = _possibleConstructorReturn(this, (Collector.__proto__ || Object.getPrototypeOf(Collector)).call(this, props));

        _this.model = new _immutable.Map();
        return _this;
    }

    _createClass(Collector, [{
        key: 'afterUpdate',
        value: function afterUpdate(key, value) {
            var fullObject = this.model.toJSON();
            var _props = this.props,
                controller = _props.controller,
                onValueChange = _props.onValueChange,
                name = _props.name;

            if (controller) {
                controller.set(name, fullObject);
            }
            if (onValueChange) {
                onValueChange(_defineProperty({}, key, value), fullObject);
            }
        }
    }, {
        key: 'updateValue',
        value: function updateValue(key, value) {
            this.model = this.model.set(key, value);
            this.afterUpdate(key, value);
        }
    }, {
        key: 'mutedUpdateValue',
        value: function mutedUpdateValue(key, value) {
            this.model = this.model.set(key, value);
        }
    }, {
        key: 'receiveEvent',
        value: function receiveEvent(eventName, arg1, arg2, arg3) {
            var onEvent = this.props.onEvent;

            if (onEvent) {
                onEvent(eventName, arg1, arg2, arg3);
            }
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                collector: this
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.children;
        }
    }]);

    return Collector;
}(_react.Component);

Collector.propTypes = {
    name: _propTypes2.default.string.isRequired,
    controller: _propTypes2.default.object,
    onValueChange: _propTypes2.default.func
};

Collector.childContextTypes = {
    collector: _propTypes2.default.object
};

var SimpleForm = function (_Collector) {
    _inherits(SimpleForm, _Collector);

    function SimpleForm() {
        _classCallCheck(this, SimpleForm);

        return _possibleConstructorReturn(this, (SimpleForm.__proto__ || Object.getPrototypeOf(SimpleForm)).apply(this, arguments));
    }

    _createClass(SimpleForm, [{
        key: 'filterDomProps',
        value: function filterDomProps(props) {
            return (0, _utils.getDomProps)(props);
        }
    }, {
        key: 'getClassNames',
        value: function getClassNames() {
            var _props2 = this.props,
                _props2$className = _props2.className,
                className = _props2$className === undefined ? '' : _props2$className,
                name = _props2.name;

            var classes = [className, 'simple-form'];
            classes.push('form-' + name);
            return classes.join(' ');
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.filterDomProps(this.props);
            props.className = this.getClassNames();
            return _react2.default.createElement(
                'div',
                props,
                this.props.children
            );
        }
    }]);

    return SimpleForm;
}(Collector);

exports.default = SimpleForm;