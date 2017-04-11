'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.starterCore = exports.starterComponents = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Child = require('./components/Child');

var _Child2 = _interopRequireDefault(_Child);

var _NameList = require('./components/NameList');

var _NameList2 = _interopRequireDefault(_NameList);

var _emptyFunction = require('fbjs/lib/emptyFunction');

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _requests = require('./requests');

var _requests2 = _interopRequireDefault(_requests);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _Form = require('./components/Form');

var _common = require('./components/common');

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/22/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

for (var requestId in _requests2.default) {
    _core.dataLoader.addResource(requestId, _requests2.default[requestId]);
}

var context = {
    insertCss: function insertCss(styles) {
        return styles._insertCss();
    },
    onSetTitle: function onSetTitle(value) {
        return document.title = value;
    }
};

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var context = this.props.context;
            return {
                insertCss: context.insertCss || _emptyFunction2.default,
                onSetTitle: context.onSetTitle || _emptyFunction2.default
            };
        }
    }, {
        key: 'render',
        value: function render() {

            var childSmartConfig = {
                dataRequests: [{
                    propKey: 'items',
                    requestId: 'nameList'
                }]
            };

            var selectSmartConfig = {
                dataRequests: [{
                    propKey: 'options',
                    requestId: 'nameList'
                }]
            };

            return _react2.default.createElement(
                'div',
                null,
                'This is React App ',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    _core.SmartWrapper,
                    childSmartConfig,
                    _react2.default.createElement(_common.List, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        _Form.Form,
                        null,
                        _react2.default.createElement(_Form.TextInput, { name: 'something', defaultValue: 'default value from attribute' }),
                        _react2.default.createElement(
                            _core.SmartWrapper,
                            selectSmartConfig,
                            _react2.default.createElement(_Form.Select, { name: 'otherthing', label: 'Enter Other thing', placeholder: 'This is placeholder', defaultValue: '2' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        _Form.Form,
                        { valueStore: new _core.SimpleStore({ otherthing2: 'default value from value store' }) },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement(_Form.TextInput, { name: 'otherthing2', label: 'Enter Other thing -- 2', placeholder: 'This is placeholder', helperText: 'We will never share your email with anyone else.' })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        _common.FormCollection,
                        { items: [{ uname: 'ravi', password: 'kavi' }, { uname: 'kavi', password: 'ravi' }] },
                        _react2.default.createElement(
                            _Form.Form,
                            null,
                            _react2.default.createElement(
                                'h1',
                                null,
                                'Title'
                            ),
                            _react2.default.createElement(_Form.TextInput, { name: 'uname', defaultValue: '' }),
                            _react2.default.createElement(_Form.TextInput, { type: 'password', name: 'password', defaultValue: '' })
                        )
                    )
                ),
                _react2.default.createElement(
                    _core.SmartWrapper,
                    { activeRules: [{ expr: 'true', prop: 'test' }], test: false },
                    _react2.default.createElement(_Child2.default, { view: 'create', text: 'My React App' })
                )
            );
        }
    }]);

    return App;
}(_react.Component);

App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    onSetTitle: _react.PropTypes.func.isRequired
};

window.App = App;
window.appContext = context;

exports.default = App;
exports.starterComponents = _components2.default;
exports.starterCore = _core2.default;