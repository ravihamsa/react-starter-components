/**
 * Created by ravi.hamsa on 6/22/16.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _componentsChild = require('./components/Child');

var _componentsChild2 = _interopRequireDefault(_componentsChild);

var _componentsNameList = require('./components/NameList');

var _componentsNameList2 = _interopRequireDefault(_componentsNameList);

var _fbjsLibEmptyFunction = require('fbjs/lib/emptyFunction');

var _fbjsLibEmptyFunction2 = _interopRequireDefault(_fbjsLibEmptyFunction);

var _requests = require('./requests');

var _requests2 = _interopRequireDefault(_requests);

var _core = require('./core');

var _componentsForm = require('./components/Form');

var _componentsCommon = require('./components/common');

var _core2 = _interopRequireDefault(_core);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

for (var requestId in _requests2['default']) {
    _core.dataLoader.addResource(requestId, _requests2['default'][requestId]);
}

var context = {
    insertCss: function insertCss(styles) {
        return styles._insertCss();
    },
    onSetTitle: function onSetTitle(value) {
        return document.title = value;
    }
};

var App = (function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(App, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var context = this.props.context;
            return {
                insertCss: context.insertCss || _fbjsLibEmptyFunction2['default'],
                onSetTitle: context.onSetTitle || _fbjsLibEmptyFunction2['default']
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

            return _react2['default'].createElement(
                'div',
                null,
                'This is React App ',
                _react2['default'].createElement('br', null),
                _react2['default'].createElement(
                    _core.SmartWrapper,
                    childSmartConfig,
                    _react2['default'].createElement(_componentsCommon.List, null)
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'container' },
                    _react2['default'].createElement(
                        _componentsForm.Form,
                        null,
                        _react2['default'].createElement(_componentsForm.TextInput, { name: 'something', defaultValue: 'default value from attribute' }),
                        _react2['default'].createElement(
                            _core.SmartWrapper,
                            selectSmartConfig,
                            _react2['default'].createElement(_componentsForm.Select, { name: 'otherthing', label: 'Enter Other thing', placeholder: 'This is placeholder', defaultValue: '2' })
                        )
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'container' },
                    _react2['default'].createElement(
                        _componentsForm.Form,
                        { valueStore: new _core.SimpleStore({ otherthing2: 'default value from value store' }) },
                        _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(
                                'span',
                                null,
                                _react2['default'].createElement(_componentsForm.TextInput, { name: 'otherthing2', label: 'Enter Other thing -- 2', placeholder: 'This is placeholder', helperText: 'We will never share your email with anyone else.' })
                            )
                        )
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'container' },
                    _react2['default'].createElement(
                        _componentsCommon.FormCollection,
                        { items: [{ uname: 'ravi', password: 'kavi' }, { uname: 'kavi', password: 'ravi' }] },
                        _react2['default'].createElement(
                            _componentsForm.Form,
                            null,
                            _react2['default'].createElement(
                                'h1',
                                null,
                                'Title'
                            ),
                            _react2['default'].createElement(_componentsForm.TextInput, { name: 'uname', defaultValue: '' }),
                            _react2['default'].createElement(_componentsForm.TextInput, { type: 'password', name: 'password', defaultValue: '' })
                        )
                    )
                ),
                _react2['default'].createElement(
                    _core.SmartWrapper,
                    { activeRules: [{ expr: 'true', prop: 'test' }], test: false },
                    _react2['default'].createElement(_componentsChild2['default'], { view: 'create', text: 'My React App' })
                )
            );
        }
    }]);

    return App;
})(_react.Component);

App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    onSetTitle: _react.PropTypes.func.isRequired
};

window.App = App;
window.appContext = context;

exports['default'] = App;
exports.starterComponents = _components2['default'];
exports.starterCore = _core2['default'];