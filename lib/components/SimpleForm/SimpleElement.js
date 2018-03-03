'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CollectorChild = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../core/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var CollectorChild = exports.CollectorChild = function (_Component) {
    _inherits(CollectorChild, _Component);

    function CollectorChild() {
        _classCallCheck(this, CollectorChild);

        return _possibleConstructorReturn(this, (CollectorChild.__proto__ || Object.getPrototypeOf(CollectorChild)).apply(this, arguments));
    }

    _createClass(CollectorChild, [{
        key: 'updateValue',
        value: function updateValue(value) {
            this.context.collector.updateValue(this.props.name, value);
        }
    }, {
        key: 'mutedUpdateValue',
        value: function mutedUpdateValue(value) {
            this.context.collector.mutedUpdateValue(this.props.name, value);
        }
    }, {
        key: 'sendEvent',
        value: function sendEvent(eventName, arg1, arg2, arg3) {
            this.context.collector.receiveEvent(eventName, arg1, arg2, arg3);
        }
    }]);

    return CollectorChild;
}(_react.Component);

var SimpleElement = function (_CollectorChild) {
    _inherits(SimpleElement, _CollectorChild);

    function SimpleElement() {
        _classCallCheck(this, SimpleElement);

        return _possibleConstructorReturn(this, (SimpleElement.__proto__ || Object.getPrototypeOf(SimpleElement)).apply(this, arguments));
    }

    _createClass(SimpleElement, [{
        key: 'getClassNames',
        value: function getClassNames() {
            var _props = this.props,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                name = _props.name,
                type = _props.type;

            var classes = [className, 'simple-element'];
            classes.push('element-' + name);
            classes.push('element-type-' + type);
            return classes.join(' ');
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return '';
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            this.updateValue(event.target.value);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.applyValue(this.props.value);
        }
    }, {
        key: 'applyValue',
        value: function applyValue(value) {
            if (value !== undefined) {
                this.updateValue(value);
            } else {
                this.updateValue(this.getDefaultValue());
            }
        }
    }, {
        key: 'filterDomProps',
        value: function filterDomProps(props) {
            var _this3 = this;

            var filteredProps = (0, _utils.getDomProps)(props);
            var onChangeHandler = filteredProps.onChange;
            if (onChangeHandler !== undefined) {
                filteredProps.onChange = function (event) {
                    _this3.onChange(event);
                    onChangeHandler(event);
                };
            } else {
                filteredProps.onChange = function (event) {
                    _this3.onChange(event);
                };
            }
            return filteredProps;
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.filterDomProps(this.props);
            props.className = 'form-control';
            if (props.value === undefined) {
                props.value = this.getDefaultValue();
            }
            var className = this.getClassNames();
            if (props.type === 'hidden') {
                return _react2.default.createElement('input', props);
            }
            return _react2.default.createElement(
                'div',
                { className: className },
                _react2.default.createElement('input', props)
            );
        }
    }]);

    return SimpleElement;
}(CollectorChild);

exports.default = SimpleElement;


CollectorChild.contextTypes = {
    collector: _propTypes2.default.object.isRequired
};

SimpleElement.propTypes = {
    name: _propTypes2.default.string.isRequired
};

SimpleElement.defaultProps = {
    type: 'text',
    placehodler: 'Enter Text',
    disabled: false
};