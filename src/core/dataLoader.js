/**
 * Created by ravi.hamsa on 6/28/16.
 */

import Promise from 'bluebird';
import fetch from './fetch';
import {identity} from './utils';
import _ from 'lodash';

class DataLoader {
    constructor() {
        this._resourceConfigIndex = {}

        this._commonHeaders = {'X-Requested-With': 'XMLHttpRequest'}
        this._sessionHeaders = {}
        this._requestQue = {}
        this._dataCache = {}

        this._responseParser = function (resp) {
            return {
                data: resp,
                errors: null,
                warnings: null
            }
        };
    }

    getRequestConfig(requestId, propKey, propDependency) {
        return {
            requestId: requestId,
            propKey: propKey,
            propDependency: propDependency
        }
    }

    setResponseParser(fun) {
        this._responseParser = fun;
    }


    generateGetUrl(url, data) {
        if (!data) {
            return url;
        }
        _.each(data, function (value, index) {
            url = url.replace(':' + index, value);
        })

        return url;
    }


    addResource(requestId, config) {
        config = _.defaults(config, {cache:'session', queue:'queue', method:'get'})
        this._resourceConfigIndex[requestId] = config;
    }

    setCommonHeaders(headers) {
        this._commonHeaders = _.extend({}, this._commonHeaders, headers)
    }

    clearSessionHeaders() {
        this._sessionHeaders = {};
    }

    setSessionHeaders(headers) {
        this._sessionHeaders = _.extend({}, this._sessionHeaders, headers)
    }

    _getStaticPromise(config){
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (config.errors) {
                    reject(config.errors, config.warnings, {errors: config.errors});
                } else {
                    resolve(config.data, config.warnings, {data: config.data});
                }
            }, config.responseDelay || 100)
        })
    }

    _getCachedDataPromise(requestHash){
        let cachedData = this._dataCache[requestHash];
        if(cachedData){
            return new Promise((resolve, reject)=>{
                resolve(cachedData.data, cachedData.warnings);
            })
        }
    }

    _getQueuedPromise(requestHash){
        let promise = this._requestQue[requestHash];
        if(promise){
            return promise;
        }
    }

    _getFetchPromise(config, payload, requestHash){
        let self = this;
        let {url, method, queue, cache, paramParser} = config;
        method = method.toLowerCase();

        var payLoadToServer = payload;
        if (paramParser) {
            payLoadToServer = paramParser(payload);
        }

        if (typeof  url === 'function') {
            url = url(payload, payLoadToServer);
        }
        var requestConfig = {
            method:method,
            headers: Object.assign({}, self._commonHeaders, self._sessionHeaders),
            credentials: 'include'
        }

        requestConfig.method = requestConfig.method.toUpperCase();

        url = self.generateGetUrl(url, payLoadToServer)
        if (method === 'post' || method === 'put' || method==='patch' ) {
            requestConfig.body = JSON.stringify(payLoadToServer)
        }

        return new Promise((resolve, reject)=>{
            var fetchPromise = fetch(url, requestConfig);
            fetchPromise
                .then(function (response) {
                    return response.json();
                })
                .then(function (body) {
                    let parsedResponse = self._responseParser(body);
                    if (parsedResponse.data) {
                        if (config.parser) {
                            parsedResponse.data = config.parser(parsedResponse.data);
                        }
                        if(cache !== 'none'){
                            self._dataCache[requestHash] = {...parsedResponse, body}
                        }
                        resolve(parsedResponse.data, parsedResponse.warnings, body);
                    } else {
                        reject(parsedResponse.errors, parsedResponse.warnings, body);
                    }

                })
                .catch(function (ex) {
                    reject([{type: 'error', message: ex.message}], null, ex);
                })
        })
    }

    getRequestDef(requestId, payload) {
        var config = this._resourceConfigIndex[requestId];
        var self = this;

        switch(config.type){
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
                let requestHash = requestId + JSON.stringify(payLoadToServer);
                let cachedDataPromise = this._getCachedDataPromise(requestHash)
                if(cachedDataPromise){
                    return cachedDataPromise;
                }
                let queuePromise = this._getQueuedPromise(requestHash)
                if(queuePromise){
                    return queuePromise;
                }

                let fetchPromise = this._getFetchPromise(config, payload, requestHash);
                if(queue!=='none'){
                    self._requestQue[requestHash]=fetchPromise;
                    fetchPromise.done(()=>{
                        delete self._requestQue[requestHash];
                    })
                }
                return fetchPromise;
                break;
        }


    }
}

let instance = new DataLoader();

export default instance;