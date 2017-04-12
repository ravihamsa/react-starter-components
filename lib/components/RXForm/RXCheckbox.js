'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RXFormElement2 = require('./RXFormElement');

var _RXFormElement3 = _interopRequireDefault(_RXFormElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RXCheckbox = function (_RXFormElement) {
    _inherits(RXCheckbox, _RXFormElement);

    function RXCheckbox() {
        _classCallCheck(this, RXCheckbox);

        return _possibleConstructorReturn(this, (RXCheckbox.__proto__ || Object.getPrototypeOf(RXCheckbox)).apply(this, arguments));
    }

    _createClass(RXCheckbox, [{
        key: 'onChange',
        value: function onChange(e) {
            this.updateValue(e.target.checked, 'update');
        }
    }, {
        key: 'renderElement',
        value: function renderElement() {
            var restProps = this.getRestProps();
            delete restProps.label;
            restProps.defaultChecked = this.getValue() === true;
            return _react2.default.createElement('input', _extends({}, restProps, { onChange: this.onChange.bind(this) }));
        }
    }]);

    return RXCheckbox;
}(_RXFormElement3.default);

exports.default = RXCheckbox;


RXCheckbox.propTypes = _extends({}, _RXFormElement3.default.propTypes, {
    value: _react.PropTypes.bool.isRequired

});

RXCheckbox.defaultProps = _extends({}, _RXFormElement3.default.defaultProps, {
    type: 'checkbox',
    value: false
});