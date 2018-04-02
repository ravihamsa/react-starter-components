/**
 * Created by ravi.hamsa on 6/28/16.
 */

import Promise from 'bluebird';
import fetch from './fetch';
import {_} from '../core/utils';

class DataLoader {
    constructor() {
        this._resourceConfigIndex = {};

        this._commonHeaders = {
            'X-Requested-With': 'XMLHttpRequest'
        };
        this._sessionHeaders = {};
        this._requestQue = {};
        this._dataCache = {};
        this._middlewares = {};

        this._responseParser = function(body, resp) {
            return {
                data: body,
                statusCode: resp.status,
                errors: null,
                warnings: null
            };
        };
    }

    getRequestConfig(requestId, propKey, propDependencies) {
        return {
            requestId,
            propKey,
            propDependencies
        };
    }

    setResponseParser(fun) {
        this._responseParser = fun;
    }


    generateGetUrl(url, data) {
        if (!data) {
            return url;
        }
        _.each(data, (value, index) => {
            url = url.replace(':' + index, value);
        });

        return url;
    }


    addResource(requestId, config) {
        config = _.defaults(config, {
            cache: 'session', queue: 'queue', method: 'get'
        });
        this._resourceConfigIndex[requestId] = config;
    }

    setCommonHeaders(headers) {
        this._commonHeaders = _.extend({}, this._commonHeaders, headers);
    }

    clearSessionHeaders() {
        this._sessionHeaders = {};
    }

    setSessionHeaders(headers) {
        this._sessionHeaders = _.extend({}, this._sessionHeaders, headers);
    }

    _getStaticPromise(config) {
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
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
        }));
    }

    getStaticPromise(config) {
        return this._getStaticPromise(config);
    }

    _getCachedDataPromise(requestHash) {
        const cachedData = this._dataCache[requestHash];
        if (cachedData) {
            return new Promise((resolve, reject) => {
                resolve(cachedData.data, cachedData.warnings);
            });
        }
    }

    _getQueuedPromise(requestHash) {
        const promise = this._requestQue[requestHash];
        if (promise) {
            return promise;
        }
    }

    _executeBeforeMiddleWares(requestId, payload) {
        const self = this;
        for (const i in self._middlewares) {
            const middleware = self._middlewares[i];
            if (middleware.before) {
                payload = middleware.before.call(null, requestId, payload);
            }
        }
        return payload;
    }

    _executeAfterMiddleWares(requestId, response) {
        const self = this;
        for (const i in self._middlewares) {
            const middleware = self._middlewares[i];
            if (middleware.after) {
                response = middleware.after.call(null, requestId, response);
            }
        }
        return response;
    }

    _getXHRPromise(url, opts = {}, onProgress) {
        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();
            xhr.open(opts.method, url);
            for (const k in opts.headers || {})
                xhr.setRequestHeader(k, opts.headers[k]);
            xhr.onload = e => res({
                ok: true, json: () => new Promise(res => {
                    res(JSON.parse(e.target.responseText));
                })
            });
            xhr.onerror = rej;
            if (xhr.upload && onProgress)
                xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
            xhr.send(opts.body);
        });
    }

    _getFetchPromise(config, payload, payLoadToServer, requestId, requestHash, onProgress) {
        const self = this;
        let {url, method, queue, cache} = config;
        method = method.toLowerCase();
	    payLoadToServer = this._executeBeforeMiddleWares(requestId, payLoadToServer);
        if (typeof  url === 'function') {
            url = url(payload, payLoadToServer);
        }
        const requestConfig = {
            method,
            headers: Object.assign({}, self._commonHeaders, self._sessionHeaders),
            credentials: 'include'
        };

        requestConfig.method = requestConfig.method.toUpperCase();

        url = self.generateGetUrl(url, payLoadToServer);
        if (method === 'post' || method === 'put' || method === 'patch' || method === 'delete') {
            requestConfig.body = JSON.stringify(payLoadToServer);
        } else if (method === 'form_post' || method === 'upload') {
            const data = new FormData();
            for (const i in payLoadToServer) {
                data.append(i, payLoadToServer[i]);
            }
            requestConfig.body = data;
            requestConfig.method = 'POST';
            delete requestConfig.headers['Content-Type'];


        }

        return new Promise((resolve, reject) => {
            let fetchPromise;
            if (method === 'upload') {
                fetchPromise = this._getXHRPromise(url, requestConfig, onProgress);
            } else {
                fetchPromise = fetch(url, requestConfig);
            }

            fetchPromise
                .then(response => {
                    if (!response.ok) {
                        if (!response.json) {
                            throw new Error(response.statusText);
                        }
                    }
                    return response;
                })
                .then(response => {
                    let jsonParser;
                    jsonParser = response.json();
                    jsonParser.then(body => {
                        let parsedResponse = self._responseParser(body, response);
                        parsedResponse = self._executeAfterMiddleWares(requestId, parsedResponse);
                        if (parsedResponse.data) {
                            if (config.parser) {
                                parsedResponse.data = config.parser(parsedResponse.data, parsedResponse.meta);
                            }
                            if (cache !== 'none') {
                                self._dataCache[requestHash] = {
                                    ...parsedResponse, body
                                };
                            }
                            resolve(parsedResponse.data, parsedResponse.warnings, body);
                        } else {
                            reject(parsedResponse.errors, parsedResponse.warnings, body);
                        }
                    }).catch(ex => {
                        reject([{
                            type: 'error', message: ex.message
                        }], null, ex);
                    });
                })
                .catch(ex => {
                    reject([{
                        type: 'error', message: ex.message
                    }], null, ex);
                });
        });
    }

    getRequestDef(requestId, payload, onProgress) {
        const config = this._resourceConfigIndex[requestId];
        const self = this;

        switch (config.type) {
            case 'static':
                return self._getStaticPromise(config);
                break;

            case 'url':
                let {url, method, queue, cache, paramParser} = config;
                method = method.toLowerCase();
                var payLoadToServer = payload;
                if (paramParser) {
                    payLoadToServer = paramParser(payload);
                }
                const requestHash = requestId + JSON.stringify(payLoadToServer);
                const cachedDataPromise = this._getCachedDataPromise(requestHash);
                if (cachedDataPromise) {
                    return cachedDataPromise;
                }
                const queuePromise = this._getQueuedPromise(requestHash);
                if (queuePromise) {
                    return queuePromise;
                }

                const fetchPromise = this._getFetchPromise(config, payload, payLoadToServer, requestId, requestHash, onProgress);
                if (queue !== 'none') {
                    self._requestQue[requestHash] = fetchPromise;
                    fetchPromise.finally(() => {
                        delete self._requestQue[requestHash];
                    });
                }
                return fetchPromise;
                break;
        }


    }

    addMiddleWare(id, paramParser, responseParser) {
        if (this._middlewares[id] !== undefined) {
            throw new Error(`Middleware by ${id} already exist`);
        }
        this._middlewares[id] = {
            before: paramParser,
            after: responseParser
        };
    }

    removeMiddleWare(id) {
        delete this._middlewares[id];
    }
}

const instance = new DataLoader();

export default instance;