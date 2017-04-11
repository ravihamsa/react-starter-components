/**
 * Created by ravi.hamsa on 4/10/17.
 */
import SimpleEmitter from './SimpleEmitter';


//TODO:full implementation
export default class SimpleController extends SimpleEmitter {
    constructor(config) {
        super(config);
        config = config || {};
        this.canGet = config.canGet === true;
        this.models = {};
        this._dataIndex = {};
    }

    addModel(name, newModelFun){
        this.models[name] = newModelFun;
    }

    createModel(name, modelType){
        this._dataIndex[name] = this.models[modelType]();
    }

    createCollection(name, modelType){
        this._dataIndex[name] = [this.models[modelType]()];
    }

    execute(command, payload) {

    }
}