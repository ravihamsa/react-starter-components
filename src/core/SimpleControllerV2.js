import SimpleEmitter from './SimpleEmitter';
import {List, Map, fromJS} from 'immutable';
import isArray from 'lodash/isArray';

export default class SimpleControllerV2 extends SimpleEmitter {
    constructor(config) {
        super(config);
        this._dataIndex = {};
        this._selectionIndex = {};
        this._commandIndex = {};
        ['singleSelect', 'multiSelect', 'clearSelect',
            'set', 'setError', 'update', 'clear', 'setList',
            'addToList', 'removeFromList', 'updateInList', 'resetInList'].forEach(methodName => {
            const oldMethod = this[methodName];
            this[methodName] = (arg1, arg2, arg3, arg4) => {
                oldMethod.call(this, arg1, arg2, arg3, arg4);
                this.triggerChange();
            }
        });

    }

    execute(action, payload) {
        if (typeof this[action] === 'function') {
            this[action](payload);
        } else {
            throw new Error(`unhandled action ${action}`)
        }
    }

    ensureSelection(keyName, multiSelect) {
        this._selectionIndex[keyName] = this._selectionIndex[keyName] || new Selection({multiSelect});
    }

    ensureList(keyName) {
        if (!this._dataIndex[keyName]) {
            this.setList(keyName, []);
        }
    }

    singleSelect(keyName, data) {
        this.ensureSelection(keyName)
        this._selectionIndex[keyName].select(data);
    }

    multiSelect(keyName, data) {
        this.ensureSelection(keyName, true);
        this._selectionIndex[keyName].select(data);
    }

    clearSelect(keyName) {
        this._dataIndex[keyName].clear();
    }

    isSelected(keyName, data) {
        return this._dataIndex[keyName].isSelected(data);
    }

    set(keyName, data) {
        this._clear(keyName + 'Error');
        if (isArray(data)) {
            this._setList(keyName, data);
        } else {
            this._dataIndex[keyName] = fromJS(data);
        }
    }

    setError(keyName, error) {
        this._clear(keyName);
        this._dataIndex[keyName + 'Error'] = error;
    }

    update(keyName, data) {
        if (isArray(data)) {
            throw new Error('Object expected, got Array');
        }
        this._dataIndex[keyName] = this._dataIndex[keyName].merge(data);
    }

    clear(keyName) {
        this._clear(keyName);
    }

    _clear(keyName) {
        delete this._dataIndex[keyName];
    }

    _setList(listName, data) {
        if (!isArray(data)) {
            return this.set.apply(this, arguments);
        }
        this._dataIndex[listName] = List(data);
    }

    setList(listName, data) {
        this._setList(listName, data);
    }

    addToList(listName, data) {
        this.ensureList(listName);
        this._dataIndex[listName] = this._dataIndex[listName].push(fromJS(data));
    }

    removeFromList(listName, id) {
        let idList = id;
        if (!isArray(idList)) {
            idList = [id];
        }
        this._dataIndex[listName] = this._dataIndex[listName].filter(item => idList.indexOf(item.get('id')) > -1);
    }

    updateInList(listName, data) {
        this._dataIndex[listName] = this._dataIndex[listName].update(list => list.findIndex(item => item.get('id') === data.id), item => item.merge(data));
    }

    resetInList(listName, data) {
        this._dataIndex[listName] = this._dataIndex[listName].update(list => list.findIndex(item => item.get('id') === data.id), () => Map(data));
    }

    toJSON() {
        let json = {};
        for (const keyName in this._dataIndex) {
            json[keyName] = this._dataIndex[keyName].toJSON();
        }

        for (const keyName in this._selectionIndex) {
            json[keyName] = this._selectionIndex[keyName].getSelected();
        }

        return json;

    }

    triggerChange() {
        this.trigger('change', this.toJSON());
    }
}