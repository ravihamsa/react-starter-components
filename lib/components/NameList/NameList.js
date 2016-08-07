'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withStyles = require('isomorphic-style-loader/lib/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _NameList = require('./NameList.scss');

var _NameList2 = _interopRequireDefault(_NameList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/22/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NameList = function (_Component) {
    _inherits(NameList, _Component);

    function NameList() {
        _classCallCheck(this, NameList);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NameList).apply(this, arguments));
    }

    _createClass(NameList, [{
        key: 'render',
        value: function render() {

            var names = this.props.names.map(function (nameObject, index) {
                return _react2.default.createElement(
                    'li',
                    { key: index },
                    nameObject.name
                );
            });

            return _react2.default.createElement(
                'ul',
                null,
                names
            );
        }
    }]);

    return NameList;
}(_react.Component);

exports.default = (0, _withStyles2.default)(_NameList2.default)(NameList);