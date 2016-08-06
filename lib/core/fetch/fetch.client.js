'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = exports.Request = exports.Headers = undefined;

require('whatwg-fetch');

exports.default = self.fetch.bind(self); /**
                                          * React Starter Kit (https://www.reactstarterkit.com/)
                                          *
                                          * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                          *
                                          * This source code is licensed under the MIT license found in the
                                          * LICENSE.txt file in the root directory of this source tree.
                                          */

var Headers = exports.Headers = self.Headers;
var Request = exports.Request = self.Request;
var Response = exports.Response = self.Response;