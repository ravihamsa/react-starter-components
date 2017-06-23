/**
 * Created by ravi.hamsa on 10/21/16.
 */

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/defaultIfEmpty';


export let bodyClick$ = Observable.of(true);

export let windowResize$ = Observable.of(true);

if (global.document) {
    bodyClick$ = Observable.fromEvent(document, 'click');
    windowResize$ = Observable.fromEvent(window, 'resize');
}


export let createEventStream = function(element, event) {
    return Observable.fromEvent(element, event);
}


export const Rx = {
    Observable:Observable,
    Subject:Subject
}

console.log(Observable, Subject);

export default {
    bodyClick$,
    windowResize$,
    createEventStream
}