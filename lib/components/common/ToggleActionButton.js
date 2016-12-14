'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _collectionManager = require('collection-manager');

var _collectionManager2 = _interopRequireDefault(_collectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 10/22/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ToggleActionButton = function (_Component) {
    _inherits(ToggleActionButton, _Component);

    function ToggleActionButton() {
        _classCallCheck(this, ToggleActionButton);

        var _this = _possibleConstructorReturn(this, (ToggleActionButton.__proto__ || Object.getPrototypeOf(ToggleActionButton)).apply(this, arguments));

        _this.collectionManager = new _collectionManager2.default(_this.props.actions, { circular: true });
        return _this;
    }

    _createClass(ToggleActionButton, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.unsubscribeCollection = this.collectionManager.on('change', function (element) {
                return _this2.setState({ currentElement: element });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.unsubscribeCollection) {
                this.unsubscribeCollection();
            }
        }
    }, {
        key: 'onClick',
        value: function onClick(event) {
            event.preventDefault();
            this.props.controller.onAction(this.collectionManager.getActiveElement(), _lodash2.default.omit(this.props, ['action', 'controller', 'children']));
            this.collectionManager.next();
        }
    }, {
        key: 'render',
        value: function render() {

            var props = { onClick: this.onClick.bind(this) };
            return _react2.default.cloneElement(this.props.children[this.collectionManager.getActiveIndex()], props);
            {/*return <ContainerTag className={this.props.className}  onClick={this.onClick.bind(this)}>{this.props.children[this.state.actionIndex]}</ContainerTag>*/}
        }
    }]);

    return ToggleActionButton;
}(_react.Component);

exports.default = ToggleActionButton;