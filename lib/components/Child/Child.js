'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withStyles = require('isomorphic-style-loader/lib/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Child = require('./Child.scss');

var _Child2 = _interopRequireDefault(_Child);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/22/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ChildComponent = function (_Component) {
    _inherits(ChildComponent, _Component);

    function ChildComponent() {
        _classCallCheck(this, ChildComponent);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ChildComponent).apply(this, arguments));
    }

    _createClass(ChildComponent, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: _Child2.default.root },
                'Child Component ',
                this.props.name,
                ' rendered with Style'
            );
        }
    }]);

    return ChildComponent;
}(_react.Component);

exports.default = (0, _withStyles2.default)(_Child2.default)(ChildComponent);