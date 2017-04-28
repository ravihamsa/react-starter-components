/**
 * Created by ravi.hamsa on 6/28/16.
 */

import Promise from 'bluebird';
import fetch from './fetch';
import _ from 'lodash';

class DataLoader {
    constructor() {
        this._resourceConfigIndex = {}

        this._commonHeaders = {'X-Requested-With': 'XMLHttpRequest'}
        this._sessionHeaders = {}
        this._requestQue = {}
        this._dataCache = {}
        this._middlewares = {};

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
        config = _.defaults(config, {cache: 'session', queue: 'queue', method: 'get'})
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

    _getStaticPromise(config) {
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

    getStaticPromise(config) {
        return this._getStaticPromise(config)
    }

    _getCachedDataPromise(requestHash) {
        let cachedData = this._dataCache[requestHash];
        if (cachedData) {
            return new Promise((resolve, reject) => {
                resolve(cachedData.data, cachedData.warnings);
            })
        }
    }

    _getQueuedPromise(requestHash) {
        let promise = this._requestQue[requestHash];
        if (promise) {
            return promise;
        }
    }

    _executeBeforeMiddleWares(requestId, payload){
        let self = this;
        for(var i in self._middlewares){
            let middleware = self._middlewares[i];
            if(middleware.before){
                payload = middleware.before.call(null, requestId, payload);
            }
        }
        return payload;
    }

    _executeAfterMiddleWares(requestId, response){
        let self = this;
        for(var i in self._middlewares){
            let middleware = self._middlewares[i];
            if(middleware.after){
                response = middleware.after.call(null, requestId, response);
            }
        }
        return response;
    }

    _getXHRPromise(url, opts={}, onProgress){
        return new Promise( (res, rej)=>{
            var xhr = new XMLHttpRequest();
            xhr.open(opts.method, url);
            for (var k in opts.headers||{})
                xhr.setRequestHeader(k, opts.headers[k]);
            xhr.onload = e => {
                return res({ok:true, json:()=>JSON.parse(e.target.responseText)})
            };
            xhr.onerror = rej;
            if (xhr.upload && onProgress)
                xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
            xhr.send(opts.body);
        });
    }

    _getFetchPromise(config, payload,requestId,requestHash, onProgress) {
        let self = this;
        let {url, method, queue, cache, paramParser} = config;
        method = method.toLowerCase();

        payload = this._executeBeforeMiddleWares(requestId,payload);

        var payLoadToServer = payload;
        if (paramParser) {
            payLoadToServer = paramParser(payload);
        }

        if (typeof  url === 'function') {
            url = url(payload, payLoadToServer);
        }
        var requestConfig = {
            method: method,
            headers: Object.assign({}, self._commonHeaders, self._sessionHeaders),
            credentials: 'include'
        }

        requestConfig.method = requestConfig.method.toUpperCase();

        url = self.generateGetUrl(url, payLoadToServer)
        if (method === 'post' || method === 'put' || method === 'patch') {
            requestConfig.body = JSON.stringify(payLoadToServer)
        }else if(method==='form_post' || method==='upload'){
            var data = new FormData()
            for(var i in payLoadToServer){
                data.append(i, payLoadToServer[i])
            }
            requestConfig.body = data
            requestConfig.method = 'POST';
            delete requestConfig.headers['Content-Type'];


        }

        return new Promise((resolve, reject) => {
            var fetchPromise;
            if(method === 'upload'){
                fetchPromise = this._getXHRPromise(url, requestConfig, onProgress);
            }else{
                fetchPromise = fetch(url, requestConfig);
            }

            fetchPromise
                .then(function (response) {
                    if (!response.ok) {
                        if(!response.json){
                            throw new Error(response.statusText)
                        }
                    }
                    return response;
                })
                .then(function (response) {
                    let json ={data:{}}; //gracefully handling exception when response is empty, and sending empty object
                    try{
                        json = response.json();
                    }
                    catch(e){
                        console.warn(e);
                    }
                    return json;
                })
                .then(function (body) {
                    let parsedResponse = self._responseParser(body);
                    parsedResponse = self._executeAfterMiddleWares(requestId,parsedResponse);
                    if (parsedResponse.data) {
                        if (config.parser) {
                            parsedResponse.data = config.parser(parsedResponse.data);
                        }
                        if (cache !== 'none') {
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

    getRequestDef(requestId, payload, onProgress) {
        var config = this._resourceConfigIndex[requestId];
        var self = this;

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
                let requestHash = requestId + JSON.stringify(payLoadToServer);
                let cachedDataPromise = this._getCachedDataPromise(requestHash)
                if (cachedDataPromise) {
                    return cachedDataPromise;
                }
                let queuePromise = this._getQueuedPromise(requestHash)
                if (queuePromise) {
                    return queuePromise;
                }

                let fetchPromise = this._getFetchPromise(config, payload, requestId, requestHash, onProgress);
                if (queue !== 'none') {
                    self._requestQue[requestHash] = fetchPromise;
                    fetchPromise.finally(() => {
                        delete self._requestQue[requestHash];
                    })
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
            before:paramParser,
            after:responseParser
        };
    }

    removeMiddleWare(id) {
        delete this._middlewares[id]
    }
}

let instance = new DataLoader();

export default instance;