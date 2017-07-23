'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SimpleEmitter2 = require('./SimpleEmitter');

var _SimpleEmitter3 = _interopRequireDefault(_SimpleEmitter2);

var _immutable = require('immutable');

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleControllerV2 = function (_SimpleEmitter) {
    _inherits(SimpleControllerV2, _SimpleEmitter);

    function SimpleControllerV2(config) {
        _classCallCheck(this, SimpleControllerV2);

        var _this = _possibleConstructorReturn(this, (SimpleControllerV2.__proto__ || Object.getPrototypeOf(SimpleControllerV2)).call(this, config));

        _this._dataIndex = {};
        _this._commandIndex = {};
        return _this;
    }

    _createClass(SimpleControllerV2, [{
        key: 'set',
        value: function set(keyName, data) {
            if ((0, _isArray2.default)(data)) {
                throw new Error('Object expected, got Array');
            }
        }
    }, {
        key: 'update',
        value: function update(keyName, data) {
            if ((0, _isArray2.default)(data)) {
                throw new Error('Object expected, got Array');
            }
            this._dataIndex[keyName] = this._dataIndex[keyName].merge(data);
        }
    }, {
        key: 'clear',
        value: function clear(keyName) {
            delete this._dataIndex[keyName];
        }
    }, {
        key: 'setList',
        value: function setList(listName, data) {
            if (!(0, _isArray2.default)(data)) {
                return this.set.apply(this, arguments);
            }
            this._dataIndex[listName] = (0, _immutable.List)(data);
        }
    }, {
        key: 'addToList',
        value: function addToList(listName, data) {
            this._dataIndex[listName] = this._dataIndex[listName].push(data);
        }
    }, {
        key: 'removeFromList',
        value: function removeFromList(listName, id) {
            var idList = id;
            if (!(0, _isArray2.default)(idList)) {
                idList = [id];
            }
            this._dataIndex[listName] = this._dataIndex[listName].filter(function (item) {
                return idList.indexOf(item.get('id')) > -1;
            });
        }
    }, {
        key: 'updateInList',
        value: function updateInList(listName, data) {
            this._dataIndex[listName] = this._dataIndex[listName].update(list.findIndex(function (item) {
                return item.get('id') === data.id;
            }), function (item) {
                return item.merge(data);
            });
        }
    }]);

    return SimpleControllerV2;
}(_SimpleEmitter3.default);

exports.default = SimpleControllerV2;