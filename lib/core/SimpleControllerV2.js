'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SimpleEmitter2 = require('./SimpleEmitter');

var _SimpleEmitter3 = _interopRequireDefault(_SimpleEmitter2);

var _immutable = require('immutable');

var _selectionManager = require('selection-manager');

var _selectionManager2 = _interopRequireDefault(_selectionManager);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getFormattedSelection = function getFormattedSelection(selection) {
    var selected = selection.getSelected();
    if (selection.isMultiSelect()) {
        return _.map(selected, 'id').join(',');
    } else {
        return selected ? selected.id : '';
    }
};

var SimpleControllerV2 = function (_SimpleEmitter) {
    _inherits(SimpleControllerV2, _SimpleEmitter);

    function SimpleControllerV2(config) {
        _classCallCheck(this, SimpleControllerV2);

        var _this = _possibleConstructorReturn(this, (SimpleControllerV2.__proto__ || Object.getPrototypeOf(SimpleControllerV2)).call(this, config));

        _this._dataIndex = {};
        _this._selectionIndex = {};
        _this.setDefaults();
        _this._changing = false;
        ['singleSelect', 'multiSelect', 'clearSelection', 'setError', 'update', 'clear', 'setList', 'addToList', 'removeFromList', 'updateInList', 'resetInList'].forEach(function (methodName) {
            var oldMethod = _this[methodName];
            _this[methodName] = function (arg1, arg2, arg3, arg4) {
                oldMethod.call(_this, arg1, arg2, arg3, arg4);
                _this.triggerChange();
            };
        });

        return _this;
    }

    _createClass(SimpleControllerV2, [{
        key: 'setDefaults',
        value: function setDefaults() {
            //do nothing to be extended
        }
    }, {
        key: 'mute',
        value: function mute() {
            this._changing = true;
        }
    }, {
        key: 'unmute',
        value: function unmute() {
            this._changing = false;
        }
    }, {
        key: 'execute',
        value: function execute(action, arg1, arg2, arg3, arg4) {
            if (typeof this[action] === 'function') {
                this[action](arg1, arg2, arg3, arg4);
            } else {
                throw new Error('unhandled action ' + action);
            }
        }
    }, {
        key: 'ensureSelection',
        value: function ensureSelection(keyName, multiSelect) {
            this._selectionIndex[keyName] = this._selectionIndex[keyName] || new _selectionManager2.default({ multiSelect: multiSelect });
        }
    }, {
        key: 'ensureList',
        value: function ensureList(keyName) {
            if (!this._dataIndex[keyName]) {
                this.setList(keyName, []);
            }
        }
    }, {
        key: 'singleSelect',
        value: function singleSelect(keyName, data) {
            this.ensureSelection(keyName);
            this._selectionIndex[keyName].select(data);
        }
    }, {
        key: 'multiSelect',
        value: function multiSelect(keyName, data) {
            this.ensureSelection(keyName, true);
            this._selectionIndex[keyName].select(data);
        }
    }, {
        key: 'clearSelection',
        value: function clearSelection(keyName) {
            delete this._selectionIndex[keyName];
        }
    }, {
        key: 'isSelected',
        value: function isSelected(keyName, data) {
            return this._selectionIndex[keyName] && this._selectionIndex[keyName].isSelected(data);
        }
    }, {
        key: 'set',
        value: function set(keyName, data) {
            this._clear(keyName + 'Error');
            if ((0, _isArray2.default)(data)) {
                this._setList(keyName, data);
            } else {
                this._dataIndex[keyName] = (0, _immutable.fromJS)(data);
            }
            this.triggerChange();
        }
    }, {
        key: 'setError',
        value: function setError(keyName, error) {
            this._clear(keyName);
            this._dataIndex[keyName + 'Error'] = error;
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
            this._clear(keyName);
            this._clear(keyName + 'Error');
        }
    }, {
        key: '_clear',
        value: function _clear(keyName) {
            delete this._dataIndex[keyName];
        }
    }, {
        key: '_setList',
        value: function _setList(listName, data) {
            if (!(0, _isArray2.default)(data)) {
                return this.set.apply(this, arguments);
            }
            this._dataIndex[listName] = (0, _immutable.fromJS)(data);
        }
    }, {
        key: 'setList',
        value: function setList(listName, data) {
            this._setList(listName, data);
        }
    }, {
        key: 'addToList',
        value: function addToList(listName, data) {
            this.ensureList(listName);
            this._dataIndex[listName] = this._dataIndex[listName].push((0, _immutable.fromJS)(data));
        }
    }, {
        key: 'removeFromList',
        value: function removeFromList(listName, id) {
            var idList = id;
            if (!(0, _isArray2.default)(idList)) {
                idList = [id];
            }
            this._dataIndex[listName] = this._dataIndex[listName].filter(function (item) {
                return idList.indexOf(item.get('id')) === -1;
            });
        }
    }, {
        key: 'updateInList',
        value: function updateInList(listName, data) {
            var list = this._dataIndex[listName];
            var recordIndex = list.findIndex(function (item) {
                return item.get('id') === data.id;
            });
            this._dataIndex[listName] = list.update(recordIndex, function (item) {
                return item.merge((0, _immutable.fromJS)(data));
            });
        }
    }, {
        key: 'resetInList',
        value: function resetInList(listName, data) {
            var list = this._dataIndex[listName];
            var recordIndex = list.findIndex(function (item) {
                return item.get('id') === data.id;
            });
            this._dataIndex[listName] = list.update(recordIndex, function () {
                return (0, _immutable.fromJS)(data);
            });
        }
    }, {
        key: 'hasKey',
        value: function hasKey(keyName) {
            return this._dataIndex[keyName] !== undefined;
        }
    }, {
        key: 'hasErrorKey',
        value: function hasErrorKey(keyName) {
            return this._dataIndex[keyName + 'Error'] !== undefined;
        }
    }, {
        key: 'getError',
        value: function getError(keyName) {
            return this._dataIndex[keyName + 'Error'].toJSON();
        }
    }, {
        key: 'get',
        value: function get(keyName) {
            return this._dataIndex[keyName].toJSON();
        }
    }, {
        key: 'getSelection',
        value: function getSelection(keyName) {
            return this._selectionIndex[keyName].getSelected();
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var json = {};
            for (var keyName in this._dataIndex) {
                json[keyName] = this._dataIndex[keyName].toJSON();
            }

            for (var _keyName in this._selectionIndex) {
                var selection = this._selectionIndex[_keyName];
                json[_keyName] = selection.getSelected();
                json[_keyName + 'Id'] = getFormattedSelection(selection);
            }
            return json;
        }
    }, {
        key: 'triggerChange',
        value: function triggerChange() {
            if (!this._changing) {
                this.trigger('change', this.toJSON());
            } else {
                console.log('trigger change muted');
            }
        }
    }]);

    return SimpleControllerV2;
}(_SimpleEmitter3.default);

exports.default = SimpleControllerV2;