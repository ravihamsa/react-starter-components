'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RXFormElement2 = require('./RXFormElement');

var _RXFormElement3 = _interopRequireDefault(_RXFormElement2);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RXCheckboxList = function (_RXFormElement) {
    _inherits(RXCheckboxList, _RXFormElement);

    function RXCheckboxList() {
        _classCallCheck(this, RXCheckboxList);

        return _possibleConstructorReturn(this, (RXCheckboxList.__proto__ || Object.getPrototypeOf(RXCheckboxList)).apply(this, arguments));
    }

    _createClass(RXCheckboxList, [{
        key: 'readInputValue',
        value: function readInputValue() {
            var valueRead = this.getSelectedValues();
            this.updateProps(valueRead, 'defaultValue');
            this.updateValue(valueRead, 'read');
        }
    }, {
        key: 'getSelectedValues',
        value: function getSelectedValues() {
            var rootNode = _reactDom2.default.findDOMNode(this);
            var selectedInput = rootNode.querySelectorAll('input:checked');
            return _lodash2.default.map(selectedInput, function (el) {
                return el.value;
            }).join(',');
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var valueRead = this.getSelectedValues();
            this.updateProps(valueRead, 'defaultValue');
            this.updateValue(valueRead, 'update');
        }
    }, {
        key: 'renderElement',
        value: function renderElement() {
            var _props = this.props,
                options = _props.options,
                name = _props.name;

            return React.createElement(
                'div',
                { onChange: this.onChange.bind(this) },
                options.map(function (option, index) {
                    var selectedOptions = this.state.defaultValue.split(',');
                    var checked = selectedOptions.indexOf(option.id) > -1;
                    return React.createElement(
                        'label',
                        { key: index },
                        React.createElement('input', { type: 'checkbox', name: name,
                            value: option.id,
                            defaultChecked: checked,
                            id: "radio-" + name + "-" + option.id }),
                        React.createElement(
                            'label',
                            { htmlFor: "radio-" + name + "-" + option.id },
                            option.name
                        )
                    );
                }, this)
            );
        }
    }]);

    return RXCheckboxList;
}(_RXFormElement3.default);

exports.default = RXCheckboxList;