'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rx = exports.createEventStream = exports.windowResize$ = exports.escapePress$ = exports.bodyKeyUp$ = exports.bodyClick$ = undefined;

var _Observable = require('rxjs/Observable');

var _Subject = require('rxjs/Subject');

require('rxjs/add/observable/fromEvent');

require('rxjs/add/observable/of');

require('rxjs/add/observable/from');

require('rxjs/add/operator/debounceTime');

require('rxjs/add/operator/map');

require('rxjs/add/operator/mapTo');

require('rxjs/add/operator/merge');

require('rxjs/add/operator/takeUntil');

require('rxjs/add/operator/take');

require('rxjs/add/operator/groupBy');

require('rxjs/add/operator/mergeMap');

require('rxjs/add/operator/filter');

require('rxjs/add/operator/combineLatest');

require('rxjs/add/operator/distinctUntilChanged');

require('rxjs/add/operator/defaultIfEmpty');

var bodyClick$ = exports.bodyClick$ = _Observable.Observable.of(true); /**
                                                                        * Created by ravi.hamsa on 10/21/16.
                                                                        */

var bodyKeyUp$ = exports.bodyKeyUp$ = _Observable.Observable.of(true);
var escapePress$ = exports.escapePress$ = _Observable.Observable.of(true);
var windowResize$ = exports.windowResize$ = _Observable.Observable.of(true);

if (global.document) {
    exports.bodyClick$ = bodyClick$ = _Observable.Observable.fromEvent(document, 'click');
    exports.bodyKeyUp$ = bodyKeyUp$ = _Observable.Observable.fromEvent(document, 'keyup');
    exports.escapePress$ = escapePress$ = bodyKeyUp$.filter(function (e) {
        return e.keyCode === 27;
    });
    exports.windowResize$ = windowResize$ = _Observable.Observable.fromEvent(window, 'resize');
}

var createEventStream = exports.createEventStream = function createEventStream(element, event) {
    return _Observable.Observable.fromEvent(element, event);
};

var Rx = exports.Rx = {
    Observable: _Observable.Observable,
    Subject: _Subject.Subject
};

exports.default = {
    bodyClick$: bodyClick$,
    bodyKeyUp$: bodyKeyUp$,
    escapePress$: escapePress$,
    windowResize$: windowResize$,
    createEventStream: createEventStream
};