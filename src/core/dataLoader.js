/**
 * Created by ravi.hamsa on 6/28/16.
 */

import 'whatwg-fetch';
import Promise from 'bluebird';
import {identity} from './utils'

class DataLoader {
    constructor() {
        this._resourceConfigIndex = {}

        this._commonHeaders = {}

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
        this._commonHeaders = headers
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


            if (config.paramParser) {
                payload = config.paramParser(payload);
            }

            var cache = config.cache || 'session';

            var requestUrl = config.url;
            var requestConfig = {
                method: config.method || 'get',
                headers: self._commonHeaders,
                credentials: 'include'
            }

            config.method.toLowerCase() === 'post' ? requestConfig.body = JSON.stringify(payload) : requestUrl = self.generateGetUrl(requestUrl, payload);
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
                    reject(ex, null, ex);
                })
        });
    }
}


export default new DataLoader();