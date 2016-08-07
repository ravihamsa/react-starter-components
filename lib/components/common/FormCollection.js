'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('../../core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/30/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FormCollection = function (_Component) {
    _inherits(FormCollection, _Component);

    function FormCollection() {
        _classCallCheck(this, FormCollection);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FormCollection).apply(this, arguments));

        _this._dataCollection = _this.props.items || [];
        return _this;
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
                var valueStore = new _core.SimpleModel(formItem);
                valueStore.on('change', this.onFormChange.bind(this, index));
                return _react2.default.cloneElement(this.props.children, { key: index, valueStore: valueStore });
            }, this);

            return _react2.default.createElement(
                'div',
                { className: 'form-collection' },
                forms
            );
        }
    }]);

    return FormCollection;
}(_react.Component);

exports.default = FormCollection;