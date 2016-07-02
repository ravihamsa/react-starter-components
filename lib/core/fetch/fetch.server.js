/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _config = require('../../config');

_nodeFetch2['default'].Promise = _bluebird2['default'];
_nodeFetch.Response.Promise = _bluebird2['default'];

function localUrl(url) {
  if (url.startsWith('//')) {
    return 'https:' + url;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return 'http://' + _config.host + url;
}

function localFetch(url, options) {
  return (0, _nodeFetch2['default'])(localUrl(url), options);
}

exports['default'] = localFetch;
exports.Request = _nodeFetch.Request;
exports.Headers = _nodeFetch.Headers;
exports.Response = _nodeFetch.Response;