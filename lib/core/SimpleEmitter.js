'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/29/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var modelCounter = 0;

var SimpleEmitter = function (_EventEmitter) {
    _inherits(SimpleEmitter, _EventEmitter);

    function SimpleEmitter(attributes) {
        _classCallCheck(this, SimpleEmitter);

        return _possibleConstructorReturn(this, (SimpleEmitter.__proto__ || Object.getPrototypeOf(SimpleEmitter)).apply(this, arguments));
    }

    _createClass(SimpleEmitter, [{
        key: 'off',
        value: function off(event, handler) {
            this.removeListener(event, handler);
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            _get(SimpleEmitter.prototype.__proto__ || Object.getPrototypeOf(SimpleEmitter.prototype), 'on', this).call(this, event, callback);
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

    return SimpleEmitter;
}(_events.EventEmitter);

exports.default = SimpleEmitter;