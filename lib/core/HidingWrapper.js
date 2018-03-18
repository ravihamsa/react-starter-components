'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by rhamsa on 18/07/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var HidingWrapper = function (_Component) {
    _inherits(HidingWrapper, _Component);

    function HidingWrapper() {
        _classCallCheck(this, HidingWrapper);

        return _possibleConstructorReturn(this, (HidingWrapper.__proto__ || Object.getPrototypeOf(HidingWrapper)).apply(this, arguments));
    }

    _createClass(HidingWrapper, [{
        key: 'render',
        value: function render() {
            var _props$className = this.props.className,
                className = _props$className === undefined ? '' : _props$className;

            if (!this.props.active) {
                className += ' hidden';
            }
            return _react2.default.createElement(
                'div',
                { className: className },
                this.props.children
            );
        }
    }]);

    return HidingWrapper;
}(_react.Component);

exports.default = HidingWrapper;


HidingWrapper.propTypes = {
    active: _propTypes2.default.bool.isRequired,
    className: _propTypes2.default.string
};

HidingWrapper.defaultProps = {
    active: true,
    className: ''
};