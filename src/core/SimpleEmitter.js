/**
 * Created by ravi.hamsa on 6/29/16.
 */
import {EventEmitter} from 'events';

let modelCounter = 0;

class SimpleEmitter extends EventEmitter {
    constructor(attributes){
        super(...arguments);

    }

    off(event, handler){
        this.removeListener(event, handler)
    }

    on(event, callback){
        super.on(event, callback);
        let self = this;
        return function(){
            self.removeListener(event, callback);
        }
    }

    trigger (){
        this.emit.apply(this, arguments)
    }


}


export default SimpleEmitter;
