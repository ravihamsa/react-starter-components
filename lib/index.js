'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.components = exports.core = undefined;

var _core2 = require('./core');

var _core3 = _interopRequireDefault(_core2);

var _components2 = require('./components');

var _components3 = _interopRequireDefault(_components2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.core = _core3.default; /**
                                * Created by ravi.hamsa on 6/22/16.
                                */

exports.components = _components3.default;

//hacky solution to enable webpack to exclude react-starter-components from building

exports.default = { core: _core3.default, components: _components3.default };