/**
 * Created by ravi.hamsa on 4/10/17.
 */
import SimpleEmitter from './SimpleEmitter';
import {Record, List} from 'immutable';
import {getUniqueId} from './utils';
import {_} from '../core/util'


const update = (name, valueMap) => {
    let map = this._dataIndex[name];
    map = map.merge(valueMap);
    this._dataIndex[name] = map;
    this.triggerChange();
}

const updateInList = (name, valueMap) => {
    let list = this._dataIndex[name];
    list = list.update(list.findIndex(function (item) {
        return item.get('id') === valueMap.id;
    }), function (item) {
        return item.merge(valueMap);
    });
    this._dataIndex[name] = list;
    this.triggerChange();
}

const add = (Model, name, valueMap) => {
    let list = this._dataIndex[name];
    list.push(new Model(_.extend({}, valueMap, {id: getUniqueId()})))
    this._dataIndex[name] = list;
    this.triggerChange();
}

const remove = (name, valueMap) => {
    let list = this._dataIndex[name];
    list = list.remove(list.findIndex(function (item) {
        return item.get('id') === valueMap.id;
    }));
    this._dataIndex[name] = list;
    this.triggerChange();
}

const createMap = (name, Model, valueMap = {}) => {
    this._dataIndex[name] = new Model(_.extend({}, valueMap, {id: getUniqueId()}))
    this._commandIndex['update' + name] = update.bind(this, name)
}

const createList = (name, Model) => {
    this._dataIndex[name] = List()
    this._commandIndex['update' + name] = updateInList.bind(this, name)
    this._commandIndex['add' + name] = add.bind(this, Model, name)
    this._commandIndex['remove' + name] = remove.bind(this, name)
}


export default class SimpleController extends SimpleEmitter {
    constructor(config) {
        super(config);
        this._dataIndex = {};
        this._commandIndex = {};
    }


    registerModel(name, defaults = {}) {
        let Model = Record(defaults)
        this._commandIndex['init' + name] = createMap.bind(this, name, Model);
        this._commandIndex['initList' + name] = createList.bind(this, name, Model);
    }

    execute(command, payload) {
        let commandToExecute = this._commandIndex[command];
        if (commandToExecute) {
            commandToExecute(payload);
        } else {
            new Error('Command ' + command + ' Not found');
        }
    }

    toJSON() {
        let toReturn = {};
        for (var modelName in this._dataIndex) {
            toReturn[modelName] = this._dataIndex[modelName].toJSON()
        }
        return toReturn;
    }

    triggerChange() {
        this.trigger('change', this.toJSON());
    }
}