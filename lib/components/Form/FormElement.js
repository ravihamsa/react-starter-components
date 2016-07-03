/**
 * Created by ravi.hamsa on 6/29/16.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var FormElement = (function (_Component) {
    _inherits(FormElement, _Component);

    function FormElement() {
        _classCallCheck(this, FormElement);

        _get(Object.getPrototypeOf(FormElement.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(FormElement, [{
        key: 'onChange',
        value: function onChange(event) {
            var name = this.props.name;
            var value = this.getValueFromNode(event.target);
            this.context.valueStore.set(_defineProperty({}, name, value));
            if (this.props.options) {
                this.context.valueDetailStore.set(_defineProperty({}, name, this.props.options.find(function (item) {
                    return item.id === value;
                })));
            }
            this.setState({ defaultValue: value });
        }
    }, {
        key: 'getValueFromNode',
        value: function getValueFromNode(node) {
            return node.value;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.defaultValue) {
                this.context.valueStore.set(_defineProperty({}, this.props.name, this.props.defaultValue));
            }
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return this.context.valueStore.get(this.props.name);
        }
    }, {
        key: 'getFormClasses',
        value: function getFormClasses() {
            var classArray = ['form-group'];
            if (this.props.errors !== undefined) {
                classArray.push('has-error');
            }
            return classArray.join(' ');
        }
    }]);

    return FormElement;
})(_react.Component);

FormElement.contextTypes = {
    valueStore: _react.PropTypes.object.isRequired,
    valueDetailStore: _react.PropTypes.object.isRequired
};

FormElement.propTypes = {
    type: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string.isRequired,
    label: _react.PropTypes.string.isRequired,
    defaultValue: _react.PropTypes.string,
    options: _react.PropTypes.array
};

FormElement.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    label: 'Text Input'
};

exports['default'] = FormElement;
module.exports = exports['default'];