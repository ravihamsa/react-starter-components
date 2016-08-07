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

        this._commonHeaders = {}
        this._sessionHeaders = {}

        this._responseParser = function (resp) {
            return {
                data: resp,
                errors: null,
                warnings: null
            }
        };
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
        this._resourceConfigIndex[requestId] = config;
    }

    setCommonHeaders(headers) {
        this._commonHeaders = _.extend({},this._commonHeaders, headers)
    }

    clearSessionHeaders(){
        this._sessionHeaders = {};
    }

    setSessionHeaders(headers){
        this._sessionHeaders = _.extend({},this._sessionHeaders, headers)
    }

    getRequestDef(requestId, payload) {
        var config = this._resourceConfigIndex[requestId];
        var self = this;

        return new Promise(function (resolve, reject) {
            if (config.type === 'static') {
                setTimeout(function(){
                    if(config.errors){
                        reject(config.errors, config.warnings, {errors:config.errors});
                    }else{
                        resolve(config.data, config.warnings, {data:config.data});
                    }
                },config.responseDelay || 100)
                return;
            }

            var payLoadToServer = payload;
            if (config.paramParser) {
                payLoadToServer = config.paramParser(payload);
            }

            var cache = config.cache || 'session';

            var requestUrl = config.url;
            if(typeof  requestUrl ==='function'){
                requestUrl =  requestUrl(payload, payLoadToServer);
            }
            var requestConfig = {
                method: config.method || 'get',
                headers: Object.assign({}, self._commonHeaders, self._sessionHeaders),
                credentials: 'include'
            }


            let method = config.method || 'get';
            method = method.toLowerCase();
            requestUrl = self.generateGetUrl(requestUrl, payLoadToServer)
            if(method === 'post' || method === 'put'){
                requestConfig.body = JSON.stringify(payLoadToServer)
            }
            var fetchPromise = fetch(requestUrl, requestConfig);
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
                        resolve(parsedResponse.data, parsedResponse.warnings, body);
                    } else {
                        reject(parsedResponse.errors, parsedResponse.warnings, body);
                    }

                })
                .catch(function (ex) {
                    reject([{type:'error', message:ex.message}], null, ex);
                })
        });
    }
}


export default new DataLoader();