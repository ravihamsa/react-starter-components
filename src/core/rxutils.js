/**
 * Created by ravi.hamsa on 10/21/16.
 */

import Rx from 'rxjs';

var bodyClick$ = Rx.Observable.of(true);

var windowResize$ = Rx.Observable.of(true);

if (global.document) {
    bodyClick$ = Rx.Observable.fromEvent(document, 'click');
    windowResize$ = Rx.Observable.fromEvent(window, 'resize');
}


function createEventStream(element, event) {
    return Rx.Observable.fromEvent(element, event);
}

export default {
    bodyClick$,
    windowResize$,
    createEventStream
}