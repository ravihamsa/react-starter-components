'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _FormElement2 = require('./FormElement');

var _FormElement3 = _interopRequireDefault(_FormElement2);

var _selectionManager = require('selection-manager');

var _selectionManager2 = _interopRequireDefault(_selectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/24/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SelectionFormElement = function (_FormElement) {
    _inherits(SelectionFormElement, _FormElement);

    function SelectionFormElement() {
        _classCallCheck(this, SelectionFormElement);

        var _this = _possibleConstructorReturn(this, (SelectionFormElement.__proto__ || Object.getPrototypeOf(SelectionFormElement)).apply(this, arguments));

        _this.multiSelect = _this.props.multiSelect === true;
        _this.selectionManager = new _selectionManager2.default({ multiSelect: _this.multiSelect });
        _this.changeSubscription = _this.selectionManager.on('change', _this.onChange.bind(_this));
        return _this;
    }

    _createClass(SelectionFormElement, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _get(SelectionFormElement.prototype.__proto__ || Object.getPrototypeOf(SelectionFormElement.prototype), 'componentWillMount', this).call(this);
            var defaultValue = this.getDefaultValue();
            this.applyValue(defaultValue);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.options && newProps.options !== this.props.options) {
                this.selectionManager.clear();
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(selection) {
            var valueToSet = void 0;
            if (!this.selectionManager.isEmpty()) {
                if (this.multiSelect) {
                    valueToSet = _.map(selection, 'id');
                } else {
                    valueToSet = selection.id;
                }
            } else {
                valueToSet = this.props.emptyValue !== undefined ? this.props.emptyValue : selection;
            }
            this.setValue(valueToSet);
            this.onChangeUpdates(valueToSet);
        }
    }, {
        key: 'onChangeUpdates',
        value: function onChangeUpdates() {
            // to be overridden by components
        }
    }, {
        key: 'applyValue',
        value: function applyValue(value) {
            var _this2 = this;

            if (this.multiSelect) {
                value = value || [];
                _.each(value, function (valueId) {
                    _this2.selectById(valueId);
                });
            } else {
                this.selectById(value);
            }
        }
    }, {
        key: 'selectById',
        value: function selectById(value) {
            var options = this.props.options;
            var toSelectItem = _.find(options, function (item) {
                return item.id === value;
            });
            if (toSelectItem) {
                if (this.multiSelect) {
                    this.selectionManager.toggle(toSelectItem);
                } else {
                    this.selectionManager.select(toSelectItem);
                }
            }
        }
    }, {
        key: 'clickHandler',
        value: function clickHandler(event) {
            var target = event.target;
            if (target.classList.contains('list-item')) {
                var dataId = target.dataset.id;
                this.selectById(dataId);
            }
        }
    }, {
        key: 'getFormClasses',
        value: function getFormClasses() {
            var classArray = ['form-group'];
            classArray.push(this.props.className);
            if (this.state.errors.length > 0) {
                classArray.push('has-error');
            }
            return classArray.join(' ');
        }
    }]);

    return SelectionFormElement;
}(_FormElement3.default);

exports.default = SelectionFormElement;