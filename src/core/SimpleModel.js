/**
 * Created by ravi.hamsa on 6/29/16.
 */
import {EventEmitter} from 'events';

let modelCounter = 0;

class SimpleModel extends EventEmitter {
    constructor(attributes){
        super(...arguments);
        this._dataIndex = {};
        this._modelId = 'model'+modelCounter;
        modelCounter++;
        if(attributes){
            this.set(attributes);
        }
    }

    set(map){
        this._changed = {};
        for(let prop in map){
            let oldValue = this._dataIndex[prop];
            let value = map[prop];
            if(oldValue !== value){
                this._dataIndex[prop] = value;
                this.triggerPropChange(prop, value, oldValue)
            }
        }

        if(Object.keys(this._changed).length !== 0){
            this.triggerChange(this._changed, this._dataIndex);
        }
    }

    reset(map){
        this._changed = {};
        for(let prop in this._dataIndex){
            if(map[prop] === undefined){
                let oldValue = this._dataIndex[prop];
                delete this._dataIndex[prop];
                this.triggerPropChange(prop, undefined, oldValue)
            }
        }

        for(let prop in map){
            let oldValue = this._dataIndex[prop];
            let value = map[prop];
            if(oldValue !== value){
                this._dataIndex[prop] = value;
                this.triggerPropChange(prop, value, oldValue)
            }
        }

        if(Object.keys(this._changed).length !== 0){
            this.triggerChange(this._changed, this._dataIndex);
        }

    }

    get(prop){
        return this._dataIndex[prop]
    }

    getAll(){
        let toReturn = {};
        for(let prop in this._dataIndex){
            toReturn[prop]=this._dataIndex[prop]
        }
        return toReturn;
    }

    triggerPropChange(prop, value, oldValue){
        this._changed[prop]=value;
        this.emit('change:'+prop, value, oldValue);
    }

    triggerChange(changed, allData){
        this.emit('change', changed, allData);
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

    clearData(){
        this._dataIndex = {};
        this.triggerChange()
    }

    trigger (){
        this.emit.apply(this, arguments)
    }


}


export default SimpleModel;
