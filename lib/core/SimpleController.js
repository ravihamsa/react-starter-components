'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SimpleEmitter2 = require('./SimpleEmitter');

var _SimpleEmitter3 = _interopRequireDefault(_SimpleEmitter2);

var _immutable = require('immutable');

var _utils = require('./utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 4/10/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var update = function update(name, valueMap) {
    var map = undefined._dataIndex[name];
    map = map.merge(valueMap);
    undefined._dataIndex[name] = map;
    undefined.triggerChange();
};

var updateInList = function updateInList(name, valueMap) {
    var list = undefined._dataIndex[name];
    list = list.update(list.findIndex(function (item) {
        return item.get('id') === valueMap.id;
    }), function (item) {
        return item.merge(valueMap);
    });
    undefined._dataIndex[name] = list;
    undefined.triggerChange();
};

var add = function add(Model, name, valueMap) {
    var list = undefined._dataIndex[name];
    list.push(new Model(_lodash2.default.extend({}, valueMap, { id: (0, _utils.getUniqueId)() })));
    undefined._dataIndex[name] = list;
    undefined.triggerChange();
};

var remove = function remove(name, valueMap) {
    var list = undefined._dataIndex[name];
    list = list.remove(list.findIndex(function (item) {
        return item.get('id') === valueMap.id;
    }));
    undefined._dataIndex[name] = list;
    undefined.triggerChange();
};

var createMap = function createMap(name, Model) {
    var valueMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    undefined._dataIndex[name] = new Model(_lodash2.default.extend({}, valueMap, { id: (0, _utils.getUniqueId)() }));
    undefined._commandIndex['update' + name] = update.bind(undefined, name);
};

var createList = function createList(name, Model) {
    undefined._dataIndex[name] = (0, _immutable.List)();
    undefined._commandIndex['update' + name] = updateInList.bind(undefined, name);
    undefined._commandIndex['add' + name] = add.bind(undefined, Model, name);
    undefined._commandIndex['remove' + name] = remove.bind(undefined, name);
};

var SimpleController = function (_SimpleEmitter) {
    _inherits(SimpleController, _SimpleEmitter);

    function SimpleController(config) {
        _classCallCheck(this, SimpleController);

        var _this = _possibleConstructorReturn(this, (SimpleController.__proto__ || Object.getPrototypeOf(SimpleController)).call(this, config));

        _this._dataIndex = {};
        _this._commandIndex = {};
        return _this;
    }

    _createClass(SimpleController, [{
        key: 'registerModel',
        value: function registerModel(name) {
            var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var Model = (0, _immutable.Record)(defaults);
            this._commandIndex['init' + name] = createMap.bind(this, name, Model);
            this._commandIndex['initList' + name] = createList.bind(this, name, Model);
        }
    }, {
        key: 'execute',
        value: function execute(command, payload) {
            var commandToExecute = this._commandIndex[command];
            if (commandToExecute) {
                commandToExecute(payload);
            } else {
                new Error('Command ' + command + ' Not found');
            }
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var toReturn = {};
            for (var modelName in this._dataIndex) {
                toReturn[modelName] = this._dataIndex[modelName].toJSON();
            }
            return toReturn;
        }
    }, {
        key: 'triggerChange',
        value: function triggerChange() {
            this.trigger('change', this.toJSON());
        }
    }]);

    return SimpleController;
}(_SimpleEmitter3.default);

exports.default = SimpleController;