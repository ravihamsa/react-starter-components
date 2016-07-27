/**
 * Created by ravi.hamsa on 6/29/16.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var SimpleModel = (function (_EventEmitter) {
    _inherits(SimpleModel, _EventEmitter);

    function SimpleModel(attributes) {
        _classCallCheck(this, SimpleModel);

        _get(Object.getPrototypeOf(SimpleModel.prototype), 'constructor', this).apply(this, arguments);
        this._dataIndex = {};
        if (attributes) {
            this.set(attributes);
        }
    }

    _createClass(SimpleModel, [{
        key: 'set',
        value: function set(map) {
            this._changed = {};
            for (var prop in map) {
                var oldValue = this._dataIndex[prop];
                var value = map[prop];
                if (oldValue !== value) {
                    this._dataIndex[prop] = value;
                    this.triggerPropChange(prop, value, oldValue);
                }
            }

            if (Object.keys(this._changed).length !== 0) {
                this.triggerChange(this._changed, this._dataIndex);
            }
        }
    }, {
        key: 'get',
        value: function get(prop) {
            return this._dataIndex[prop];
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            return this._dataIndex;
        }
    }, {
        key: 'triggerPropChange',
        value: function triggerPropChange(prop, value, oldValue) {
            this._changed[prop] = value;
            this.emit('change:' + prop, value, oldValue);
        }
    }, {
        key: 'triggerChange',
        value: function triggerChange(changed, allData) {
            this.emit('change', changed, allData);
        }
    }, {
        key: 'off',
        value: function off(event, handler) {
            this.removeListener(event, handler);
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            _get(Object.getPrototypeOf(SimpleModel.prototype), 'on', this).call(this, event, callback);
            var self = this;
            return function () {
                self.removeListener(event, callback);
            };
        }
    }, {
        key: 'trigger',
        value: function trigger() {
            this.emit.apply(this, arguments);
        }
    }]);

    return SimpleModel;
})(_events.EventEmitter);

exports['default'] = SimpleModel;
module.exports = exports['default'];