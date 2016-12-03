/**
 * Created by ravi.hamsa on 6/29/16.
 */
import SimpleEmitter from './SimpleEmitter';

let modelCounter = 0;

class SimpleModel extends SimpleEmitter {
    constructor(attributes){
        super(...arguments);
        this._dataIndex = {};
        this._modelId = 'model'+modelCounter;
        modelCounter++;
        if(attributes){
            this.set(attributes);
        }
    }

    set(map, options){
        this._changed = {};
        options = options || {};
        let isSilent = options.silent || false;
        for(let prop in map){
            let oldValue = this._dataIndex[prop];
            let value = map[prop];
            if(oldValue !== value){
                this._dataIndex[prop] = value;
                if(!isSilent){
                    this.triggerPropChange(prop, value, oldValue)
                }

            }
        }

        if(Object.keys(this._changed).length !== 0 && !isSilent){
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


    clearData(){
        this._dataIndex = {};
        this.triggerChange()
    }


}


export default SimpleModel;
