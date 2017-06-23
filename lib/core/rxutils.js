'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rx = exports.createEventStream = exports.windowResize$ = exports.bodyClick$ = undefined;

var _Observable = require('rxjs/Observable');

var _Subject = require('rxjs/Subject');

require('rxjs/add/observable/fromEvent');

require('rxjs/add/observable/of');

require('rxjs/add/observable/from');

require('rxjs/add/operator/debounceTime');

require('rxjs/add/operator/map');

require('rxjs/add/operator/merge');

require('rxjs/add/operator/takeUntil');

require('rxjs/add/operator/take');

require('rxjs/add/operator/groupBy');

require('rxjs/add/operator/mergeMap');

require('rxjs/add/operator/filter');

require('rxjs/add/operator/combineLatest');

require('rxjs/add/operator/distinctUntilChanged');

require('rxjs/add/operator/defaultIfEmpty');

/**
 * Created by ravi.hamsa on 10/21/16.
 */

var bodyClick$ = exports.bodyClick$ = _Observable.Observable.of(true);

var windowResize$ = exports.windowResize$ = _Observable.Observable.of(true);

if (global.document) {
    exports.bodyClick$ = bodyClick$ = _Observable.Observable.fromEvent(document, 'click');
    exports.windowResize$ = windowResize$ = _Observable.Observable.fromEvent(window, 'resize');
}

var createEventStream = exports.createEventStream = function createEventStream(element, event) {
    return _Observable.Observable.fromEvent(element, event);
};

var Rx = exports.Rx = {
    Observable: _Observable.Observable,
    Subject: _Subject.Subject
};

console.log(_Observable.Observable, _Subject.Subject);

exports.default = {
    bodyClick$: bodyClick$,
    windowResize$: windowResize$,
    createEventStream: createEventStream
};