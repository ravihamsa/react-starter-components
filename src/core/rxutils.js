/**
 * Created by ravi.hamsa on 10/21/16.
 */

import Rx from 'rxjs';

export var bodyClick$ = Rx.Observable.of(true);

if(global.document) {
    bodyClick$ = Rx.Observable.fromEvent(document, 'click');
}



export function createEventStream(element, event){
    return Rx.Observable.fromEvent(element, event);
}