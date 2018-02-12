import SimpleEmitter from './SimpleEmitter';
import {List, Map, fromJS} from 'immutable';
import Selection from 'selection-manager';
import isArray from 'lodash/isArray';

const getFormattedSelection = selection => {
    const selected = selection.getSelected();
    if (selection.isMultiSelect()) {
        return _.map(selected, 'id').join(',');
    } else {
        return selected ? selected.id : '';
    }
}

export default class SimpleControllerV2 extends SimpleEmitter {
    constructor(config) {
        super(config);
        this._dataIndex = {};
        this._selectionIndex = {};
        this.setDefaults();
        this._changing = false;
        ['singleSelect', 'multiSelect', 'clearSelection',
            'setError', 'update', 'clear', 'setList',
            'addToList', 'removeFromList', 'updateInList', 'resetInList'].forEach(methodName => {
            const oldMethod = this[methodName];
            this[methodName] = (arg1, arg2, arg3, arg4) => {
                oldMethod.call(this, arg1, arg2, arg3, arg4);
                this.triggerChange();
            };
        });

    }

	setDefaults(){
        //do nothing to be extended
    }

    mute() {
        this._changing = true;
    }

    unmute() {
        this._changing = false;
    }


    execute(action, arg1, arg2, arg3) {
        if (typeof this[action] === 'function') {
            this[action](arg1, arg2, arg3);
        } else {
            throw new Error(`unhandled action ${action}`);
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

    clearSelection(keyName) {
        delete this._selectionIndex[keyName];
    }

    isSelected(keyName, data) {
        return this._selectionIndex[keyName] && this._selectionIndex[keyName].isSelected(data);
    }

    set(keyName, data) {
        this._clear(keyName + 'Error');
        if (isArray(data)) {
            this._setList(keyName, data);
        } else {
            this._dataIndex[keyName] = fromJS(data);
        }
	    this.triggerChange();
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
        this._clear(keyName + 'Error');
    }

    _clear(keyName) {
        delete this._dataIndex[keyName];
    }

    _setList(listName, data) {
        if (!isArray(data)) {
            return this.set.apply(this, arguments);
        }
        this._dataIndex[listName] = fromJS(data);
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
        this._dataIndex[listName] = this._dataIndex[listName].filter(item => idList.indexOf(item.get('id')) === -1);
    }

    updateInList(listName, data) {
        const list = this._dataIndex[listName];
        const recordIndex = list.findIndex(item => item.get('id') === data.id);
        this._dataIndex[listName] = list.update(recordIndex, item => item.merge(fromJS(data)));
    }

    resetInList(listName, data) {
        const list = this._dataIndex[listName];
        const recordIndex = list.findIndex(item => item.get('id') === data.id);
        this._dataIndex[listName] = list.update(recordIndex, () => fromJS(data));
    }

    hasKey(keyName) {
        return this._dataIndex[keyName] !== undefined;
    }

    hasErrorKey(keyName) {
        return this._dataIndex[keyName + 'Error'] !== undefined;
    }

    getError(keyName) {
        return this._dataIndex[keyName + 'Error'].toJSON();
    }

    get(keyName) {
        return this._dataIndex[keyName].toJSON();
    }

    getSelection(keyName) {
        return this._selectionIndex[keyName].getSelected()
    }

    toJSON() {
        const json = {};
        for (const keyName in this._dataIndex) {
            json[keyName] = this._dataIndex[keyName].toJSON();
        }

        for (const keyName in this._selectionIndex) {
            const selection = this._selectionIndex[keyName];
            json[keyName] = selection.getSelected();
            json[keyName + 'Id'] = getFormattedSelection(selection);
        }
        return json;

    }

    triggerChange() {
        if (!this._changing) {
            this.trigger('change', this.toJSON());
        } else {
            console.log('trigger change muted');
        }
    }
}