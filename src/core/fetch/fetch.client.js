/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'whatwg-fetch';

let  _this = this;
let globalObj = null;
if(typeof self !== 'undefined'){
    globalObj = self;
}else{
    globalObj = _this;
}

export default globalObj.fetch.bind(globalObj);
export const Headers = self.Headers;
export const Request = self.Request;
export const Response = self.Response;
