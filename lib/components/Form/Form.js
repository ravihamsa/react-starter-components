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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require('../../core');

var _core2 = _interopRequireDefault(_core);

var SimpleModel = _core2['default'].SimpleModel;

var Form = (function (_Component) {
    _inherits(Form, _Component);

    function Form() {
        _classCallCheck(this, Form);

        _get(Object.getPrototypeOf(Form.prototype), 'constructor', this).apply(this, arguments);
        this._valueChangeHandler = this.onValueChange.bind(this);
    }

    _createClass(Form, [{
        key: 'onSubmitHandler',
        value: function onSubmitHandler(event) {
            event.preventDefault();
            var context = this.getChildContext();
            var valueStore = context.valueStore;
            var valueDetailStore = context.valueDetailStore;

            this.props.onSubmitHandler(valueStore.getAll(), valueStore);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'form',
                { onSubmit: this.onSubmitHandler.bind(this) },
                this.props.children
            );
        }
    }, {
        key: 'onValueChange',
        value: function onValueChange(changed, allData) {
            console.log(allData);
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {

            if (!this.store) {
                var store = this.store = this.props.valueStore || new SimpleModel();
                var detailStore = new SimpleModel();
                store.off('change', this._valueChangeHandler);
                store.on('change', this._valueChangeHandler);
                store.detailStore = detailStore;
            }

            return {
                valueStore: this.store,
                valueDetailStore: this.store.detailStore
            };
        }
    }]);

    return Form;
})(_react.Component);

Form.childContextTypes = {
    valueStore: _react.PropTypes.object.isRequired,
    valueDetailStore: _react.PropTypes.object.isRequired
};

exports['default'] = Form;
module.exports = exports['default'];