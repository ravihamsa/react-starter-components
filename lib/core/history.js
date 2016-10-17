'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _history = require('history');

if (global._history === undefined) {
  global._history = (0, _history.createHistory)();
} /**
   * Created by ravi.hamsa on 7/14/16.
   */

exports.default = global._history;