/**
 * Created by ravi.hamsa on 6/30/16.
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

var FormCollection = (function (_Component) {
    _inherits(FormCollection, _Component);

    function FormCollection() {
        _classCallCheck(this, FormCollection);

        _get(Object.getPrototypeOf(FormCollection.prototype), 'constructor', this).apply(this, arguments);
        this._dataCollection = this.props.items || [];
    }

    _createClass(FormCollection, [{
        key: 'onFormChange',
        value: function onFormChange(index, changed, allData) {
            this._dataCollection[index] = allData;
            console.log(this._dataCollection);
        }
    }, {
        key: 'render',
        value: function render() {

            var forms = this._dataCollection.map(function (formItem, index) {
                var valueStore = new _core.SimpleStore(formItem);
                valueStore.on('change', this.onFormChange.bind(this, index));
                return _react2['default'].cloneElement(this.props.children, { key: index, valueStore: valueStore });
            }, this);

            return _react2['default'].createElement(
                'div',
                { className: 'form-collection' },
                forms
            );
        }
    }]);

    return FormCollection;
})(_react.Component);

exports['default'] = FormCollection;
module.exports = exports['default'];