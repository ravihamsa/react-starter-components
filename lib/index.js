module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./src/index.js */1);


/***/ },
/* 1 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./core */ 2), __webpack_require__(/*! ./components */ 13)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./core'), require('./components'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.core, global.components);
	    global.index = mod.exports;
	  }
	})(this, function (exports, _core2, _components2) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.components = exports.core = undefined;
	
	  var _core3 = _interopRequireDefault(_core2);
	
	  var _components3 = _interopRequireDefault(_components2);
	
	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }
	
	  exports.default = {
	    name: 'Ravi'
	  };
	  exports.core = _core3.default;
	  exports.components = _components3.default;
	});

/***/ },
/* 2 */
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ./dataLoader */ 3), __webpack_require__(/*! ./SimpleModel */ 7), __webpack_require__(/*! ./SmartWrapper */ 9), __webpack_require__(/*! ./utils */ 12)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports, require('./dataLoader'), require('./SimpleModel'), require('./SmartWrapper'), require('./utils'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports, global.dataLoader, global.SimpleModel, global.SmartWrapper, global.utils);
	    global.index = mod.exports;
	  }
	})(this, function (module, exports, _dataLoader, _SimpleModel, _SmartWrapper, _utils) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	
	  var _dataLoader2 = _interopRequireDefault(_dataLoader);
	
	  var _SimpleModel2 = _interopRequireDefault(_SimpleModel);
	
	  var _SmartWrapper2 = _interopRequireDefault(_SmartWrapper);
	
	  var _utils2 = _interopRequireDefault(_utils);
	
	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }
	
	  exports.default = { dataLoader: _dataLoader2.default, SimpleStore: _SimpleModel2.default, SmartWrapper: _SmartWrapper2.default, utils: _utils2.default };
	  module.exports = exports['default'];
	});

/***/ },
/* 3 */
/*!********************************!*\
  !*** ./src/core/dataLoader.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ./fetch/fetch.client */ 4), __webpack_require__(/*! bluebird */ 6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('./fetch/fetch.client'), require('bluebird'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.fetch, global.bluebird);
	        global.dataLoader = mod.exports;
	    }
	})(this, function (module, exports, _fetch, _bluebird) {
	    'use strict';
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _fetch2 = _interopRequireDefault(_fetch);
	
	    var _bluebird2 = _interopRequireDefault(_bluebird);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    var DataLoader = function () {
	        function DataLoader() {
	            _classCallCheck(this, DataLoader);
	
	            this._resourceConfigIndex = {};
	
	            this._commonHeaders = {};
	        }
	
	        _createClass(DataLoader, [{
	            key: 'generateGetUrl',
	            value: function generateGetUrl(url, data) {
	                if (!data) {
	                    return url;
	                }
	                _.each(data, function (value, index) {
	                    url = url.replace(':' + index, value);
	                });
	
	                return url;
	            }
	        }, {
	            key: 'addResource',
	            value: function addResource(requestId, config) {
	                this._resourceConfigIndex[requestId] = config;
	            }
	        }, {
	            key: 'setCommonHeaders',
	            value: function setCommonHeaders(headers) {
	                this._commonHeaders = headers;
	            }
	        }, {
	            key: 'getRequestDef',
	            value: function getRequestDef(requestId, payload) {
	                var config = this._resourceConfigIndex[requestId];
	
	                return new _bluebird2.default(function (resolve, reject) {
	                    if (config.type === 'static') {
	                        resolve(config.data);
	                        return;
	                    }
	
	                    if (config.paramParser) {
	                        payload = config.paramParser(payload);
	                    }
	
	                    var cache = config.cache || 'session';
	
	                    var requestUrl = config.url;
	                    var requestConfig = {
	                        method: config.method || 'get',
	                        headers: this._commonHeaders,
	                        credentials: 'include'
	                    };
	
	                    config.method === 'post' ? requestConfig.body = JSON.stringify(payload) : requestUrl = this.generateGetUrl(requestUrl, payload);
	                    var fetchPromise = (0, _fetch2.default)(requestUrl, requestConfig);
	                    fetchPromise.then(function (response) {
	                        return response.json();
	                    }).then(function (body) {
	                        if (config.parser) {
	                            body = config.parser(body);
	                        }
	                        resolve(body);
	                    }).catch(function (ex) {
	                        console.log('parsing failed', ex);
	                    });
	                });
	            }
	        }]);
	
	        return DataLoader;
	    }();
	
	    exports.default = new DataLoader();
	    module.exports = exports['default'];
	});

/***/ },
/* 4 */
/*!****************************************!*\
  !*** ./src/core/fetch/fetch.client.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! whatwg-fetch */ 5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('whatwg-fetch'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.whatwgFetch);
	    global.fetchClient = mod.exports;
	  }
	})(this, function (exports) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.Response = exports.Request = exports.Headers = undefined;
	  exports.default = self.fetch.bind(self);
	  var Headers = exports.Headers = self.Headers;
	  var Request = exports.Request = self.Request;
	  var Response = exports.Response = self.Response;
	});

/***/ },
/* 5 */
/*!*******************************!*\
  !*** external "whatwg-fetch" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("whatwg-fetch");

/***/ },
/* 6 */
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 7 */
/*!*********************************!*\
  !*** ./src/core/SimpleModel.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! events */ 8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('events'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.events);
	        global.SimpleModel = mod.exports;
	    }
	})(this, function (module, exports, _events) {
	    'use strict';
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var SimpleModel = function (_EventEmitter) {
	        _inherits(SimpleModel, _EventEmitter);
	
	        function SimpleModel(attributes) {
	            _classCallCheck(this, SimpleModel);
	
	            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleModel).apply(this, arguments));
	
	            _this._dataIndex = {};
	            if (attributes) {
	                _this.set(attributes);
	            }
	            return _this;
	        }
	
	        _createClass(SimpleModel, [{
	            key: 'set',
	            value: function set(map) {
	                this._changed = {};
	                for (var prop in map) {
	                    var oldValue = this._dataIndex[prop];
	                    var value = map[prop];
	                    if (oldValue !== value) {
	                        this._dataIndex[prop] = value;
	                        this.triggerPropChange(prop, value, oldValue);
	                    }
	                }
	
	                if (Object.keys(this._changed).length !== 0) {
	                    this.triggerChange(this._changed, this._dataIndex);
	                }
	            }
	        }, {
	            key: 'get',
	            value: function get(prop) {
	                return this._dataIndex[prop];
	            }
	        }, {
	            key: 'getAll',
	            value: function getAll() {
	                return this._dataIndex;
	            }
	        }, {
	            key: 'triggerPropChange',
	            value: function triggerPropChange(prop, value, oldValue) {
	                this._changed[prop] = value;
	                this.emit('change:' + prop, value, oldValue);
	            }
	        }, {
	            key: 'triggerChange',
	            value: function triggerChange(changed, allData) {
	                this.emit('change', changed, allData);
	            }
	        }]);
	
	        return SimpleModel;
	    }(_events.EventEmitter);
	
	    exports.default = SimpleModel;
	    module.exports = exports['default'];
	});

/***/ },
/* 8 */
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 9 */
/*!**********************************!*\
  !*** ./src/core/SmartWrapper.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! react */ 10), __webpack_require__(/*! ./dataLoader */ 3), __webpack_require__(/*! ./Loader */ 11), __webpack_require__(/*! ./utils */ 12)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('react'), require('./dataLoader'), require('./Loader'), require('./utils'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.react, global.dataLoader, global.Loader, global.utils);
	        global.SmartWrapper = mod.exports;
	    }
	})(this, function (module, exports, _react, _dataLoader, _Loader, _utils) {
	    'use strict';
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _react2 = _interopRequireDefault(_react);
	
	    var _dataLoader2 = _interopRequireDefault(_dataLoader);
	
	    var _Loader2 = _interopRequireDefault(_Loader);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    var _extends = Object.assign || function (target) {
	        for (var i = 1; i < arguments.length; i++) {
	            var source = arguments[i];
	
	            for (var key in source) {
	                if (Object.prototype.hasOwnProperty.call(source, key)) {
	                    target[key] = source[key];
	                }
	            }
	        }
	
	        return target;
	    };
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var SmartWrapper = function (_Component) {
	        _inherits(SmartWrapper, _Component);
	
	        function SmartWrapper() {
	            _classCallCheck(this, SmartWrapper);
	
	            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SmartWrapper).apply(this, arguments));
	
	            _this._loadingCount = 0;
	            _this.dataIndex = {};
	            _this.state = {
	                loading: false
	            };
	            return _this;
	        }
	
	        _createClass(SmartWrapper, [{
	            key: 'componentWillMount',
	            value: function componentWillMount() {
	                var stores = this.props.dataRequests;
	                if (stores) {
	                    for (var i = 0; i < stores.length; i++) {
	                        var storeConfig = stores[i];
	                        var getParams = storeConfig.getDataParams || _utils.identity;
	                        this.addRequest(storeConfig.propKey, storeConfig.requestId, getParams.call(this, storeConfig));
	                        // this.loadStore(storeConfig.propKey, storeConfig.store, getParams.call(this, storeConfig), true)
	                    }
	                }
	            }
	        }, {
	            key: 'addRequest',
	            value: function addRequest(propName, requestId, payload) {
	                var self = this;
	                var def = _dataLoader2.default.getRequestDef(requestId, payload);
	
	                def.done(function (data) {
	                    self.dataIndex[propName] = data;
	                });
	
	                def.finally(function () {
	                    self.bumpAndCheckLoading(-1);
	                });
	
	                def.catch(function (e) {
	                    console.log(e);
	                });
	
	                self.bumpAndCheckLoading(1);
	            }
	        }, {
	            key: 'bumpAndCheckLoading',
	            value: function bumpAndCheckLoading(diff) {
	                this._loadingCount += diff;
	                this.setState({ loading: this._loadingCount > 0 });
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                return this.state.loading ? _react2.default.createElement(_Loader2.default, null) : _react2.default.cloneElement(this.props.children, _extends({}, this.dataIndex));
	            }
	        }]);
	
	        return SmartWrapper;
	    }(_react.Component);
	
	    exports.default = SmartWrapper;
	    module.exports = exports['default'];
	});

/***/ },
/* 10 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 11 */
/*!****************************!*\
  !*** ./src/core/Loader.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! react */ 10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require("react"));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.react);
	        global.Loader = mod.exports;
	    }
	})(this, function (module, exports, _react) {
	    "use strict";
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _react2 = _interopRequireDefault(_react);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var Loader = function (_Component) {
	        _inherits(Loader, _Component);
	
	        function Loader() {
	            _classCallCheck(this, Loader);
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(Loader).apply(this, arguments));
	        }
	
	        _createClass(Loader, [{
	            key: "render",
	            value: function render() {
	                return _react2.default.createElement(
	                    "div",
	                    { className: "loading" },
	                    "Loading"
	                );
	            }
	        }]);
	
	        return Loader;
	    }(_react.Component);
	
	    exports.default = Loader;
	    module.exports = exports["default"];
	});

/***/ },
/* 12 */
/*!***************************!*\
  !*** ./src/core/utils.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports);
	    global.utils = mod.exports;
	  }
	})(this, function (module, exports) {
	  "use strict";
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  /**
	   * Created by ravi.hamsa on 6/28/16.
	   */
	
	  var identity = function identity(arg1) {
	    return arg1;
	  };
	
	  exports.default = { identity: identity };
	  module.exports = exports["default"];
	});

/***/ },
/* 13 */
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ./Form */ 14), __webpack_require__(/*! ./common */ 19)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports, require('./Form'), require('./common'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports, global.Form, global.common);
	    global.index = mod.exports;
	  }
	})(this, function (module, exports, _Form, _common) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	
	  var _Form2 = _interopRequireDefault(_Form);
	
	  var _common2 = _interopRequireDefault(_common);
	
	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }
	
	  exports.default = {
	    Form: _Form2.default,
	    common: _common2.default
	  };
	  module.exports = exports['default'];
	});

/***/ },
/* 14 */
/*!**************************************!*\
  !*** ./src/components/Form/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ./Form */ 15), __webpack_require__(/*! ./FormElement */ 16), __webpack_require__(/*! ./TextInput */ 17), __webpack_require__(/*! ./Select */ 18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('./Form'), require('./FormElement'), require('./TextInput'), require('./Select'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.Form, global.FormElement, global.TextInput, global.Select);
	        global.index = mod.exports;
	    }
	})(this, function (module, exports, _Form, _FormElement, _TextInput, _Select) {
	    'use strict';
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _Form2 = _interopRequireDefault(_Form);
	
	    var _FormElement2 = _interopRequireDefault(_FormElement);
	
	    var _TextInput2 = _interopRequireDefault(_TextInput);
	
	    var _Select2 = _interopRequireDefault(_Select);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    exports.default = {
	        Form: _Form2.default,
	        FormElement: _FormElement2.default,
	        TextInput: _TextInput2.default,
	        Select: _Select2.default
	    };
	    module.exports = exports['default'];
	});

/***/ },
/* 15 */
/*!*************************************!*\
  !*** ./src/components/Form/Form.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! react */ 10), __webpack_require__(/*! ../../core */ 2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('react'), require('../../core'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.react, global.core);
	        global.Form = mod.exports;
	    }
	})(this, function (module, exports, _react, _core) {
	    'use strict';
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _react2 = _interopRequireDefault(_react);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var Form = function (_Component) {
	        _inherits(Form, _Component);
	
	        function Form() {
	            _classCallCheck(this, Form);
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).apply(this, arguments));
	        }
	
	        _createClass(Form, [{
	            key: 'render',
	            value: function render() {
	                return _react2.default.createElement(
	                    'form',
	                    null,
	                    this.props.children
	                );
	            }
	        }, {
	            key: 'onValueChange',
	            value: function onValueChange(changed, allData) {
	                console.log(allData);
	            }
	        }, {
	            key: 'getChildContext',
	            value: function getChildContext() {
	
	                var store = this.props.valueStore || new _core.SimpleStore();
	                store.on('change', this.onValueChange.bind(this));
	
	                return {
	                    valueStore: store
	                };
	            }
	        }]);
	
	        return Form;
	    }(_react.Component);
	
	    Form.childContextTypes = {
	        valueStore: _react.PropTypes.object.isRequired
	    };
	
	    exports.default = Form;
	    module.exports = exports['default'];
	});

/***/ },
/* 16 */
/*!********************************************!*\
  !*** ./src/components/Form/FormElement.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! react */ 10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('react'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.react);
	        global.FormElement = mod.exports;
	    }
	})(this, function (module, exports, _react) {
	    'use strict';
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _react2 = _interopRequireDefault(_react);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    function _defineProperty(obj, key, value) {
	        if (key in obj) {
	            Object.defineProperty(obj, key, {
	                value: value,
	                enumerable: true,
	                configurable: true,
	                writable: true
	            });
	        } else {
	            obj[key] = value;
	        }
	
	        return obj;
	    }
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var FormElement = function (_Component) {
	        _inherits(FormElement, _Component);
	
	        function FormElement() {
	            _classCallCheck(this, FormElement);
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(FormElement).apply(this, arguments));
	        }
	
	        _createClass(FormElement, [{
	            key: 'onChange',
	            value: function onChange(event) {
	                var name = this.props.name;
	                this.context.valueStore.set(_defineProperty({}, name, event.target.value));
	            }
	        }, {
	            key: 'componentWillMount',
	            value: function componentWillMount() {
	                if (this.props.defaultValue) {
	                    this.context.valueStore.set(_defineProperty({}, this.props.name, this.props.defaultValue));
	                }
	            }
	        }, {
	            key: 'getDefaultValue',
	            value: function getDefaultValue() {
	                return this.context.valueStore.get(this.props.name);
	            }
	        }]);
	
	        return FormElement;
	    }(_react.Component);
	
	    FormElement.contextTypes = {
	        valueStore: _react.PropTypes.object.isRequired
	    };
	
	    FormElement.propTypes = {
	        type: _react.PropTypes.string.isRequired,
	        placeholder: _react.PropTypes.string.isRequired,
	        label: _react.PropTypes.string.isRequired,
	        defaultValue: _react.PropTypes.string,
	        options: _react.PropTypes.array
	    };
	
	    FormElement.defaultProps = {
	        type: 'text',
	        placeholder: 'Enter Text',
	        label: 'Text Input'
	    };
	
	    exports.default = FormElement;
	    module.exports = exports['default'];
	});

/***/ },
/* 17 */
/*!******************************************!*\
  !*** ./src/components/Form/TextInput.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! react */ 10), __webpack_require__(/*! ./FormElement */ 16)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require("react"), require("./FormElement"));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.react, global.FormElement);
	        global.TextInput = mod.exports;
	    }
	})(this, function (module, exports, _react, _FormElement2) {
	    "use strict";
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _react2 = _interopRequireDefault(_react);
	
	    var _FormElement3 = _interopRequireDefault(_FormElement2);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var TextInput = function (_FormElement) {
	        _inherits(TextInput, _FormElement);
	
	        function TextInput() {
	            _classCallCheck(this, TextInput);
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(TextInput).apply(this, arguments));
	        }
	
	        _createClass(TextInput, [{
	            key: "render",
	            value: function render() {
	
	                var defaultValue = this.getDefaultValue();
	
	                return _react2.default.createElement(
	                    "fieldset",
	                    { className: "form-group" },
	                    _react2.default.createElement(
	                        "label",
	                        null,
	                        this.props.label
	                    ),
	                    _react2.default.createElement("input", { type: this.props.type, className: "form-control", name: this.props.name,
	                        placeholder: this.props.placeholder, onChange: this.onChange.bind(this), defaultValue: defaultValue }),
	                    this.props.helperText ? _react2.default.createElement(
	                        "small",
	                        { className: "text-muted" },
	                        this.props.helperText
	                    ) : ''
	                );
	            }
	        }]);
	
	        return TextInput;
	    }(_FormElement3.default);
	
	    exports.default = TextInput;
	    module.exports = exports["default"];
	});

/***/ },
/* 18 */
/*!***************************************!*\
  !*** ./src/components/Form/Select.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! react */ 10), __webpack_require__(/*! ./FormElement */ 16)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require("react"), require("./FormElement"));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.react, global.FormElement);
	        global.Select = mod.exports;
	    }
	})(this, function (module, exports, _react, _FormElement2) {
	    "use strict";
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _react2 = _interopRequireDefault(_react);
	
	    var _FormElement3 = _interopRequireDefault(_FormElement2);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var Select = function (_FormElement) {
	        _inherits(Select, _FormElement);
	
	        function Select() {
	            _classCallCheck(this, Select);
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(Select).apply(this, arguments));
	        }
	
	        _createClass(Select, [{
	            key: "render",
	            value: function render() {
	
	                var defaultValue = this.getDefaultValue();
	
	                return _react2.default.createElement(
	                    "fieldset",
	                    { className: "form-group" },
	                    _react2.default.createElement(
	                        "label",
	                        null,
	                        this.props.label
	                    ),
	                    _react2.default.createElement(
	                        "select",
	                        { className: "form-control", name: this.props.name,
	                            placeholder: this.props.placeholder, onChange: this.onChange.bind(this), defaultValue: defaultValue },
	                        this.props.options.map(function (option, index) {
	                            return _react2.default.createElement(
	                                "option",
	                                { value: option.id, key: index },
	                                option.name
	                            );
	                        }, this)
	                    ),
	                    this.props.helperText ? _react2.default.createElement(
	                        "small",
	                        { className: "text-muted" },
	                        this.props.helperText
	                    ) : ''
	                );
	            }
	        }]);
	
	        return Select;
	    }(_FormElement3.default);
	
	    exports.default = Select;
	    module.exports = exports["default"];
	});

/***/ },
/* 19 */
/*!****************************************!*\
  !*** ./src/components/common/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! ./List */ 20), __webpack_require__(/*! ./FormCollection */ 21)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports, require('./List'), require('./FormCollection'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports, global.List, global.FormCollection);
	    global.index = mod.exports;
	  }
	})(this, function (module, exports, _List, _FormCollection) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	
	  var _List2 = _interopRequireDefault(_List);
	
	  var _FormCollection2 = _interopRequireDefault(_FormCollection);
	
	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }
	
	  exports.default = { List: _List2.default, FormCollection: _FormCollection2.default };
	  module.exports = exports['default'];
	});

/***/ },
/* 20 */
/*!***************************************!*\
  !*** ./src/components/common/List.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! react */ 10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require("react"));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.react);
	        global.List = mod.exports;
	    }
	})(this, function (module, exports, _react) {
	    "use strict";
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _react2 = _interopRequireDefault(_react);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    var _extends = Object.assign || function (target) {
	        for (var i = 1; i < arguments.length; i++) {
	            var source = arguments[i];
	
	            for (var key in source) {
	                if (Object.prototype.hasOwnProperty.call(source, key)) {
	                    target[key] = source[key];
	                }
	            }
	        }
	
	        return target;
	    };
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var ListItem = function (_Component) {
	        _inherits(ListItem, _Component);
	
	        function ListItem() {
	            _classCallCheck(this, ListItem);
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(ListItem).apply(this, arguments));
	        }
	
	        _createClass(ListItem, [{
	            key: "render",
	            value: function render() {
	                var itemData = this.props.itemData;
	                var ContainerTag = this.props.tagName || 'li';
	                return _react2.default.createElement(
	                    ContainerTag,
	                    _extends({}, this.props, { className: "list-item" }),
	                    itemData.name
	                );
	            }
	        }]);
	
	        return ListItem;
	    }(_react.Component);
	
	    var List = function (_Component2) {
	        _inherits(List, _Component2);
	
	        function List() {
	            _classCallCheck(this, List);
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
	        }
	
	        _createClass(List, [{
	            key: "render",
	            value: function render() {
	                var self = this;
	                var itemArray = self.props.items;
	                var ContainerTag = self.props.tagName || 'ul';
	                var noItemMessage = self.props.noDataMessage || 'No Items Found';
	                var ListItemClass = self.props.ListItem || ListItem;
	                var listItems = itemArray.map(function (item) {
	                    return _react2.default.createElement(ListItemClass, _extends({ key: item.id, id: item.id, itemData: item }, self.props));
	                });
	
	                if (listItems.length > 0) {
	                    return _react2.default.createElement(
	                        ContainerTag,
	                        this.props,
	                        listItems
	                    );
	                } else {
	                    return _react2.default.createElement(
	                        ContainerTag,
	                        this.props,
	                        _react2.default.createElement(
	                            "li",
	                            { className: "no-data" },
	                            noItemMessage
	                        )
	                    );
	                }
	            }
	        }]);
	
	        return List;
	    }(_react.Component);
	
	    exports.default = List;
	    module.exports = exports["default"];
	});

/***/ },
/* 21 */
/*!*************************************************!*\
  !*** ./src/components/common/FormCollection.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(/*! react */ 10), __webpack_require__(/*! ../../core */ 2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('react'), require('../../core'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.react, global.core);
	        global.FormCollection = mod.exports;
	    }
	})(this, function (module, exports, _react, _core) {
	    'use strict';
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _react2 = _interopRequireDefault(_react);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var FormCollection = function (_Component) {
	        _inherits(FormCollection, _Component);
	
	        function FormCollection() {
	            _classCallCheck(this, FormCollection);
	
	            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FormCollection).apply(this, arguments));
	
	            _this._dataCollection = _this.props.items || [];
	            return _this;
	        }
	
	        _createClass(FormCollection, [{
	            key: 'onFormChange',
	            value: function onFormChange(index, changed, allData) {
	                this._dataCollection[index] = allData;
	                console.log(this._dataCollection);
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	
	                var forms = this._dataCollection.map(function (formItem, index) {
	                    var valueStore = new _core.SimpleStore(formItem);
	                    valueStore.on('change', this.onFormChange.bind(this, index));
	                    return _react2.default.cloneElement(this.props.children, { key: index, valueStore: valueStore });
	                }, this);
	
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'form-collection' },
	                    forms
	                );
	            }
	        }]);
	
	        return FormCollection;
	    }(_react.Component);
	
	    exports.default = FormCollection;
	    module.exports = exports['default'];
	});

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map