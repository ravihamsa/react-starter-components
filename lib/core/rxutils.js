'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEventStream = exports.windowResize$ = exports.bodyClick$ = undefined;

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyClick$ = exports.bodyClick$ = _rxjs2.default.Observable.of(true); /**
                                                                           * Created by ravi.hamsa on 10/21/16.
                                                                           */

var windowResize$ = exports.windowResize$ = _rxjs2.default.Observable.of(true);

if (global.document) {
    exports.bodyClick$ = bodyClick$ = _rxjs2.default.Observable.fromEvent(document, 'click');
    exports.windowResize$ = windowResize$ = _rxjs2.default.Observable.fromEvent(window, 'resize');
}

var createEventStream = exports.createEventStream = function createEventStream(element, event) {
    return _rxjs2.default.Observable.fromEvent(element, event);
};

exports.default = {
    bodyClick$: bodyClick$,
    windowResize$: windowResize$,
    createEventStream: createEventStream
};