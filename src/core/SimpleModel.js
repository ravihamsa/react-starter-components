/**
 * Created by ravi.hamsa on 6/29/16.
 */
import {EventEmitter} from 'events';

class SimpleModel extends EventEmitter {
    constructor(){
        super(...arguments);
        this._dataIndex = {};
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

    get(prop){
        return this._dataIndex[prop]
    }

    getAll(){
        return this._dataIndex;
    }

    triggerPropChange(prop, value, oldValue){
        this._changed[prop]=value;
        this.emit('change:'+prop, value, oldValue);
    }

    triggerChange(changed, allData){
        this.emit('change', changed, allData);
    }


}


export default SimpleModel;