'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SimpleEmitter2 = require('./SimpleEmitter');

var _SimpleEmitter3 = _interopRequireDefault(_SimpleEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 4/10/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


//TODO:full implementation
var SimpleController = function (_SimpleEmitter) {
    _inherits(SimpleController, _SimpleEmitter);

    function SimpleController(config) {
        _classCallCheck(this, SimpleController);

        var _this = _possibleConstructorReturn(this, (SimpleController.__proto__ || Object.getPrototypeOf(SimpleController)).call(this, config));

        config = config || {};
        _this.canGet = config.canGet === true;
        _this.models = {};
        _this._dataIndex = {};
        return _this;
    }

    _createClass(SimpleController, [{
        key: 'addModel',
        value: function addModel(name, newModelFun) {
            this.models[name] = newModelFun;
        }
    }, {
        key: 'createModel',
        value: function createModel(name, modelType) {
            this._dataIndex[name] = this.models[modelType]();
        }
    }, {
        key: 'createCollection',
        value: function createCollection(name, modelType) {
            this._dataIndex[name] = [this.models[modelType]()];
        }
    }, {
        key: 'execute',
        value: function execute(command, payload) {}
    }]);

    return SimpleController;
}(_SimpleEmitter3.default);

exports.default = SimpleController;