/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Selection from 'selection-manager';
import RXFormElement from './RXFormElement';
import List from '../common/List';
import {_} from '../../core/utils';
import _isEqual from "lodash/isEqual";

const returnTrue = function() {
    return true;
};

export class RXSelectionItem extends Component {

    getClassName() {
        const {itemData, selectionManager} = this.props;
        let className = 'list-item ';
        if (selectionManager.isSelected(itemData)) {
            className += ' active';
        }
        return className;
    }

    deselectItem() {
        const {itemData, selectionManager} = this.props;
        selectionManager.deselect(itemData);
    }

    deSelect(event) {
        event.preventDefault();
        this.deselectItem();
    }

    render() {
        const itemData = this.props.itemData;
        const className = this.getClassName();
	    const {idAttribute} = this.props;
        return <li data-id={itemData[idAttribute]} className={className}>
            {itemData.name}
        </li>;
    }
}

RXSelectionItem.defaultProps = {
    idAttribute:'id'
}

export default class RXSelectionElement extends RXFormElement {
    constructor(props) {
        super(props);
        this.multiSelect = props.multiSelect;
        this.selectionManager = new Selection({
            multiSelect: props.multiSelect,
            idAttribute: props.idAttribute
        });
        this.validateSelection = props.validateSelection || returnTrue;
        this.applyValue(this.state.value);
        this._value = this.selectionManager.getSelected();
        this.changeSubscription = this.selectionManager.on('change', this.onChange.bind(this));
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        const newOptions = newProps['options'];
	    const {idAttribute} = this.props;
        const selected = this.selectionManager.getSelected();
        if (newOptions && selected) {
            if (newOptions.length && !_isEqual(newOptions, this.props.options)) {
                if (this.multiSelect) {
                    _.each(selected, item => {
                        const selectedOption = newOptions.find(optionItem => optionItem[idAttribute] === item[idAttribute]);
                        if (!selectedOption) {
                            this.selectionManager.deselect(item);
                        }
                    });
                } else {
                    const selectedOption = newOptions.find(optionItem => optionItem[idAttribute] === selected[idAttribute]);
                    if (!selectedOption) {
                        this.selectionManager.deselect(selected);
                    }
                }

            }
        }
    }

    getPropToStateList() {
        return ['active', 'error', 'disabled', 'valid', '__shadowValue', 'value', 'type', 'exposeName', 'exposeSelection', 'serverValid', 'serverError'];
    }

    applyValue(toApplyValue = '') {
        let value = toApplyValue;
        const currentSelectionValue = this.getFormattedSelection();
        if (this.props.useSelectionAsValue && value !== '') {
            value = this.getFormattedSelection(value);
        }
        if (value === currentSelectionValue) {
            return;
        } else {
            if (this.multiSelect) {
                const valueArray = value.split(',');
                const selectedArray = currentSelectionValue.split(',');
                const toSelect = _.difference(valueArray, selectedArray);
                const toDeselect = _.difference(selectedArray, valueArray);
                _.each(toSelect, valueId => this.findUpdateSelectionById(valueId, 'select'));
                _.each(toDeselect, valueId => this.findUpdateSelectionById(valueId, 'deselect'));
            } else {
                this.findUpdateSelectionById(value, 'select');
            }
        }
    }

    selectById(value) {
        const options = this.getOptions();
        const {selectionManager} = this;
        const {idAttribute} = this.props;
        const toSelectItem = _.find(options, item => item[idAttribute] === value);
        if (toSelectItem) {
            if (this.multiSelect) {
                selectionManager.toggle(toSelectItem);
            } else {
                const isAlreadySelected = selectionManager.isSelected(toSelectItem);
                if (!isAlreadySelected) {
                    selectionManager.select(toSelectItem);
                } else {
                    selectionManager.trigger('change', toSelectItem, toSelectItem);
                }

            }
        }
    }

    findUpdateSelectionById(id, method) {
        const options = this.getOptions();
	    const {idAttribute} = this.props;
        const toSelectItem = _.find(options, item => item[idAttribute] === id);
        if (toSelectItem) {
            this.selectionManager[method](toSelectItem);
        } else {
            if (!this.multiSelect) {
                this.selectionManager.clear();
            }
        }

    }

    getFormattedSelection(selection = this.selectionManager.getSelected()) {
	    const {idAttribute} = this.props;
        if (this.multiSelect) {
            return _.map(selection, idAttribute).join(',');
        } else {
            return selection ? selection[idAttribute] : '';
        }
    }

    getSelectedAttribute(selection, attribute) {
        if (this.multiSelect) {
            return _.map(selection, attribute).join(',');
        } else {
            return selection ? selection[attribute] : null;
        }
    }

    readInputValue() {
        let selection = this.getFormattedSelection();
	    if (selection === '', this.props.selectDefaultFirst){
            const {options} = this.props;
            if (options && options.length > 0){
                this.selectionManager.select(options[0]);
	            selection = this.getFormattedSelection();
            }
	    }
        this.updateValue(selection, 'read');
        const {exposeSelection, exposeName} = this.props;
        if (exposeSelection || exposeName) {
            const selected = this.selectionManager.getSelected();
            this.selection$.next({
                field: this.props.name + '_selection', type: 'skipValidateUpdate', value: selected
            });
        }

    }

    exposeNameAndSelection() {
        const {exposeSelection, exposeName} = this.props;
        const selected = this.selectionManager.getSelected();
        if (exposeSelection) {
            this.selection$.next({
                field: this.props.name + '_selection', type: 'selection', value: selected
            });
        }
        if (exposeName) {
            this.selection$.next({
                field: this.props.name + '_name',
                type: 'name',
                value: this.getSelectedAttribute(selected, 'name')
            });
        }
    }

    onChangeUpdates() {

    }

    getValue() {
        return this.selectionManager.getSelected();
    }

    onChange(e) {
        this.updateValue(this.props.useSelectionAsValue ? this.selectionManager.getSelected() : this.getFormattedSelection(), 'update');
        this.exposeNameAndSelection();
        this.onChangeUpdates();
    }

    onClickHandler(e) {
        let curElement = e.target;
        const listRoot = this.ref_listRoot;
	    const {idAttribute} = this.props;

        if (this.props.disabled || !this.validateSelection()) {
            return;
        }

        while (curElement !== listRoot && !curElement.classList.contains('list-item')) {
            curElement = curElement.parentNode;
        }
        if (curElement !== listRoot) {
            const dataId = curElement.dataset["id"];
            this.selectById(dataId);
        }
    }
    getOptions(){
        return this.props.options;
    }

    getFilteredOptions() {
        const {filterQuery, filterField} = this.props;
        const options = this.getOptions();
        return options.filter(item => item[filterField].toLowerCase().indexOf(filterQuery.toLowerCase()) > -1);
    }

    renderElement() {
        const {ListItem = RXSelectionItem, idAttribute} = this.props;
        return <div onClick={this.onClickHandler.bind(this)} ref={element => this.ref_listRoot = element}>
            <List items={this.getFilteredOptions()} selectionManager={this.selectionManager}
                selection={this.state.__shadowValue} idAttribute={idAttribute} ListItem={ListItem}/>
        </div>;
    }

    renderElementWithWrapper() {
        const formClasses = this.getFormClasses();
        formClasses.push(this.props.multiSelect === true ? 'multi-select' : 'single-select');
        const error = this.state.error || this.state.serverError;
        return <fieldset className={formClasses.join(' ')}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            {this.renderElement()}
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : ''}
            {error ? <small className="text-danger">{error.message}</small> : ''}
        </fieldset>;
    }
}


RXSelectionElement.propTypes = {
    ...RXFormElement.propTypes,
    options: PropTypes.array.isRequired,
    exposeName: PropTypes.bool.isRequired,
    exposeSelection: PropTypes.bool.isRequired,
};

RXSelectionElement.defaultProps = {
    ...RXFormElement.defaultProps,
    type: 'selection',
    placeholder: 'Select',
    label: 'Select',
    options: [],
    valueType: 'idString',
    exposeName: false,
    value: '',
    exposeSelection: false,
    multiSelect: false,
    useSelectionAsValue: false,
    selectDefaultFirst:false,
    filterQuery: '',
    filterField: 'name',
    idAttribute:'id'
};
