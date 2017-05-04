"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SimpleEmitter2 = require("../../core/SimpleEmitter");

var _SimpleEmitter3 = _interopRequireDefault(_SimpleEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 5/3/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ElementManager = function (_SimpleEmitter) {
    _inherits(ElementManager, _SimpleEmitter);

    function ElementManager(config) {
        _classCallCheck(this, ElementManager);

        var _this = _possibleConstructorReturn(this, (ElementManager.__proto__ || Object.getPrototypeOf(ElementManager)).call(this, config));

        var _config$value = config.value,
            value = _config$value === undefined ? '' : _config$value,
            _config$valid = config.valid,
            valid = _config$valid === undefined ? true : _config$valid,
            _config$error = config.error,
            error = _config$error === undefined ? null : _config$error;
        return _this;
    }

    _createClass(ElementManager, [{
        key: "setValue",
        value: function setValue() {}
    }, {
        key: "setProp",
        value: function setProp() {}
    }]);

    return ElementManager;
}(_SimpleEmitter3.default);

exports.default = ElementManager;