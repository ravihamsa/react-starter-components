'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ravi.hamsa on 6/28/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _utils = require('../core/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataLoader = function () {
    function DataLoader() {
        _classCallCheck(this, DataLoader);

        this._resourceConfigIndex = {};

        this._commonHeaders = {
            'X-Requested-With': 'XMLHttpRequest'
        };
        this._sessionHeaders = {};
        this._requestQue = {};
        this._dataCache = {};
        this._middlewares = {};

        this._responseParser = function (body, resp) {
            return {
                data: body,
                statusCode: resp.status,
                errors: null,
                warnings: null
            };
        };
    }

    _createClass(DataLoader, [{
        key: 'getRequestConfig',
        value: function getRequestConfig(requestId, propKey, propDependencies) {
            return {
                requestId: requestId,
                propKey: propKey,
                propDependencies: propDependencies
            };
        }
    }, {
        key: 'setResponseParser',
        value: function setResponseParser(fun) {
            this._responseParser = fun;
        }
    }, {
        key: 'generateGetUrl',
        value: function generateGetUrl(url, data) {
            if (!data) {
                return url;
            }
            _utils._.each(data, function (value, index) {
                url = url.replace(':' + index, value);
            });

            return url;
        }
    }, {
        key: 'addResource',
        value: function addResource(requestId, config) {
            config = _utils._.defaults(config, {
                cache: 'session', queue: 'queue', method: 'get'
            });
            this._resourceConfigIndex[requestId] = config;
        }
    }, {
        key: 'setCommonHeaders',
        value: function setCommonHeaders(headers) {
            this._commonHeaders = _utils._.extend({}, this._commonHeaders, headers);
        }
    }, {
        key: 'clearSessionHeaders',
        value: function clearSessionHeaders() {
            this._sessionHeaders = {};
        }
    }, {
        key: 'setSessionHeaders',
        value: function setSessionHeaders(headers) {
            this._sessionHeaders = _utils._.extend({}, this._sessionHeaders, headers);
        }
    }, {
        key: '_getStaticPromise',
        value: function _getStaticPromise(config) {
            return new _bluebird2.default(function (resolve, reject) {
                setTimeout(function () {
                    if (config.errors) {
                        reject(config.errors, config.warnings, {
                            errors: config.errors
                        });
                    } else {
                        resolve(config.data, config.warnings, {
                            data: config.data
                        });
                    }
                }, config.responseDelay || 100);
            });
        }
    }, {
        key: 'getStaticPromise',
        value: function getStaticPromise(config) {
            return this._getStaticPromise(config);
        }
    }, {
        key: '_getCachedDataPromise',
        value: function _getCachedDataPromise(requestHash) {
            var cachedData = this._dataCache[requestHash];
            if (cachedData) {
                return new _bluebird2.default(function (resolve, reject) {
                    resolve(cachedData.data, cachedData.warnings);
                });
            }
        }
    }, {
        key: '_getQueuedPromise',
        value: function _getQueuedPromise(requestHash) {
            var promise = this._requestQue[requestHash];
            if (promise) {
                return promise;
            }
        }
    }, {
        key: '_executeBeforeMiddleWares',
        value: function _executeBeforeMiddleWares(requestId, payload) {
            var self = this;
            for (var i in self._middlewares) {
                var middleware = self._middlewares[i];
                if (middleware.before) {
                    payload = middleware.before.call(null, requestId, payload);
                }
            }
            return payload;
        }
    }, {
        key: '_executeAfterMiddleWares',
        value: function _executeAfterMiddleWares(requestId, response) {
            var self = this;
            for (var i in self._middlewares) {
                var middleware = self._middlewares[i];
                if (middleware.after) {
                    response = middleware.after.call(null, requestId, response);
                }
            }
            return response;
        }
    }, {
        key: '_getXHRPromise',
        value: function _getXHRPromise(url) {
            var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var onProgress = arguments[2];

            return new _bluebird2.default(function (res, rej) {
                var xhr = new XMLHttpRequest();
                xhr.open(opts.method, url);
                for (var k in opts.headers || {}) {
                    xhr.setRequestHeader(k, opts.headers[k]);
                }xhr.onload = function (e) {
                    return res({
                        ok: true, json: function json() {
                            return new _bluebird2.default(function (res) {
                                res(JSON.parse(e.target.responseText));
                            });
                        }
                    });
                };
                xhr.onerror = rej;
                if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
                xhr.send(opts.body);
            });
        }
    }, {
        key: '_getFetchPromise',
        value: function _getFetchPromise(config, payload, payLoadToServer, requestId, requestHash, onProgress) {
            var _this = this;

            var self = this;
            var url = config.url,
                method = config.method,
                queue = config.queue,
                cache = config.cache;

            method = method.toLowerCase();
            payLoadToServer = this._executeBeforeMiddleWares(requestId, payLoadToServer);
            if (typeof url === 'function') {
                url = url(payload, payLoadToServer);
            }
            var requestConfig = {
                method: method,
                headers: Object.assign({}, self._commonHeaders, self._sessionHeaders),
                credentials: 'include'
            };

            requestConfig.method = requestConfig.method.toUpperCase();

            url = self.generateGetUrl(url, payLoadToServer);
            if (['post', 'delete', 'put', 'patch'].indexOf(method) > -1) {
                requestConfig.body = JSON.stringify(payLoadToServer);
            } else if (method === 'form_post' || method === 'upload') {
                var data = new FormData();
                for (var i in payLoadToServer) {
                    data.append(i, payLoadToServer[i]);
                }
                requestConfig.body = data;
                requestConfig.method = 'POST';
                delete requestConfig.headers['Content-Type'];
            }

            return new _bluebird2.default(function (resolve, reject) {
                var fetchPromise = void 0;
                if (method === 'upload') {
                    fetchPromise = _this._getXHRPromise(url, requestConfig, onProgress);
                } else {
                    fetchPromise = (0, _fetch2.default)(url, requestConfig);
                }

                fetchPromise.then(function (response) {
                    if (!response.ok) {
                        if (!response.json) {
                            throw new Error(response.statusText);
                        }
                    }
                    return response;
                }).then(function (response) {
                    var jsonParser = void 0;
                    jsonParser = response.json();
                    jsonParser.then(function (body) {
                        var parsedResponse = self._responseParser(body, response);
                        parsedResponse = self._executeAfterMiddleWares(requestId, parsedResponse);
                        if (parsedResponse.data) {
                            if (config.parser) {
                                parsedResponse.data = config.parser(parsedResponse.data, parsedResponse.meta);
                            }
                            if (cache !== 'none') {
                                self._dataCache[requestHash] = _extends({}, parsedResponse, { body: body
                                });
                            }
                            resolve(parsedResponse.data, parsedResponse.warnings, body);
                        } else {
                            reject(parsedResponse.errors, parsedResponse.warnings, body);
                        }
                    }).catch(function (ex) {
                        reject([{
                            type: 'error', message: ex.message
                        }], null, ex);
                    });
                }).catch(function (ex) {
                    reject([{
                        type: 'error', message: ex.message
                    }], null, ex);
                });
            });
        }
    }, {
        key: 'getRequestDef',
        value: function getRequestDef(requestId, payload, onProgress) {
            var config = this._resourceConfigIndex[requestId];
            var self = this;

            switch (config.type) {
                case 'static':
                    return self._getStaticPromise(config);
                    break;

                case 'url':
                    var url = config.url,
                        method = config.method,
                        queue = config.queue,
                        cache = config.cache,
                        paramParser = config.paramParser;

                    method = method.toLowerCase();
                    var payLoadToServer = payload;
                    if (paramParser) {
                        payLoadToServer = paramParser(payload);
                    }
                    var requestHash = requestId + JSON.stringify(payLoadToServer);
                    var cachedDataPromise = this._getCachedDataPromise(requestHash);
                    if (cachedDataPromise) {
                        return cachedDataPromise;
                    }
                    var queuePromise = this._getQueuedPromise(requestHash);
                    if (queuePromise) {
                        return queuePromise;
                    }

                    var fetchPromise = this._getFetchPromise(config, payload, payLoadToServer, requestId, requestHash, onProgress);
                    if (queue !== 'none') {
                        self._requestQue[requestHash] = fetchPromise;
                        fetchPromise.finally(function () {
                            delete self._requestQue[requestHash];
                        });
                    }
                    return fetchPromise;
                    break;
            }
        }
    }, {
        key: 'addMiddleWare',
        value: function addMiddleWare(id, paramParser, responseParser) {
            if (this._middlewares[id] !== undefined) {
                throw new Error('Middleware by ' + id + ' already exist');
            }
            this._middlewares[id] = {
                before: paramParser,
                after: responseParser
            };
        }
    }, {
        key: 'removeMiddleWare',
        value: function removeMiddleWare(id) {
            delete this._middlewares[id];
        }
    }]);

    return DataLoader;
}();

var instance = new DataLoader();

exports.default = instance;