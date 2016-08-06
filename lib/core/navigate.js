'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = navigate;

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function navigate(pageId, params) {

    var paramString = [];
    for (var key in params) {
        paramString.push(key + '=' + params[key]);
    }

    _history2.default.push({
        pathname: '/',
        hash: '#/' + pageId + (paramString.length ? '/' + paramString.join(';') : '')
    });
} /**
   * Created by ravi.hamsa on 7/14/16.
   */