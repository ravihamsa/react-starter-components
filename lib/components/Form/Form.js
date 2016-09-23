'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('../../core');

var _core2 = _interopRequireDefault(_core);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/29/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SimpleModel = _core2.default.SimpleModel;

var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form() {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));

        _this._valueChangeHandler = _this.onValueChange.bind(_this);
        _this._errorHandler = _this.onError.bind(_this);
        return _this;
    }

    _createClass(Form, [{
        key: 'onSubmitHandler',
        value: function onSubmitHandler(event) {
            event.preventDefault();
            var context = this.getChildContext();
            var valueStore = context.valueStore;
            var errorStore = context.errorStore;

            errorStore.trigger('forceValidate');
            var hasErrors = _lodash2.default.values(errorStore.getAll()).filter(function (item) {
                return item.length > 0;
            }).length > 0;
            if (hasErrors) {
                return;
            }
            this.props.onSubmitHandler(valueStore.getAll(), valueStore);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { onSubmit: this.onSubmitHandler.bind(this), className: this.props.className },
                this.props.children
            );
        }
    }, {
        key: 'onValueChange',
        value: function onValueChange(changed, allData) {
            if (this.props.onValueChange) {
                this.props.onValueChange(changed, allData);
            }
        }
    }, {
        key: 'onError',
        value: function onError(error) {
            console.log(error);
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {

            if (!this.store) {
                var store = this.store = this.props.valueStore || new SimpleModel();
                var detailStore = new SimpleModel();
                if (this._unsubscribeChange) {
                    this._unsubscribeChange();
                }
                this._unsubscribeChange = store.on('change', this._valueChangeHandler);
                store.detailStore = detailStore;

                var errorStore = this.errorStore = this.props.errorStore || new SimpleModel();
                if (this._unsubscribeErrorChange) {
                    this._unsubscribeErrorChange();
                }

                this._unsubscribeErrorChange = errorStore.on('change', this._errorHandler);
            }

            return {
                valueStore: this.store,
                errorStore: this.errorStore,
                valueDetailStore: this.store.detailStore
            };
        }
    }]);

    return Form;
}(_react.Component);

Form.childContextTypes = {
    valueStore: _react.PropTypes.object.isRequired,
    errorStore: _react.PropTypes.object.isRequired,
    valueDetailStore: _react.PropTypes.object.isRequired
};

exports.default = Form;