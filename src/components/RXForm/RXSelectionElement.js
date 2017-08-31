/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {PropTypes, Component} from "react";
import Selection from 'selection-manager';
import RXFormElement from './RXFormElement';
import List from '../common/List'
import {_} from '../../core/utils';

const returnTrue = function () {
    return true;
}

export class RXSelectionItem extends Component {

    getClassName() {
        let {itemData, selectionManager} = this.props;
        let className = 'list-item ';
        if (selectionManager.isSelected(itemData)) {
            className += ' active';
        }
        return className;
    }

    deselectItem() {
        let {itemData, selectionManager} = this.props;
        selectionManager.deselect(itemData);
    }

    deSelect(event) {
        event.preventDefault();
        this.deselectItem();
    }

    render() {
        let itemData = this.props.itemData;
        let className = this.getClassName();
        return <li data-id={itemData.id} className={className}>
            {itemData.name}
        </li>;
    }
}

export default class RXSelectionElement extends RXFormElement {
    constructor(props) {
        super(props);
        this.multiSelect = props.multiSelect;
        this.selectionManager = new Selection({multiSelect: props.multiSelect});
        this.validateSelection = props.validateSelection || returnTrue;
        this.applyValue(this.state.value)
        this._value = this.selectionManager.getSelected();
        this.changeSubscription = this.selectionManager.on('change', this.onChange.bind(this));
    }

    componentWillReceiveProps(newProps) {
        const newOptions = newProps['options'];
        const selected = this.selectionManager.getSelected();
        if (newOptions && selected) {
            if (newOptions !== this.props.options) {
                if (this.multiSelect) {
                    _.each(selected, item => {
                        const selectedOption = newOptions.find(optionItem => optionItem.id === item.id);
                        if (!selectedOption) {
                            this.selectionManager.deselect(item);
                        }
                    })
                } else {
                    const selectedOption = newOptions.find(optionItem => optionItem.id === selected.id);
                    if (!selectedOption) {
                        this.selectionManager.deselect(selected);
                    }
                }

            }
        }
    }

    getPropToStateList() {
        return ['active', 'error', 'disabled', 'valid', '__shadowValue', 'value', 'type', 'exposeName', 'exposeSelection', 'serverValid', 'serverError']
    }

    applyValue(value = '') {
        let currentSelectionValue = this.getFormattedSelection();
        if (value === currentSelectionValue) {
            return;
        } else {
            if (this.multiSelect) {
                let valueArray = value.split(',');
                let selectedArray = currentSelectionValue.split(',');
                let toSelect = _.difference(valueArray, selectedArray);
                let toDeselect = _.difference(selectedArray, valueArray);
                _.each(toSelect, (valueId) => this.findUpdateSelectionById(valueId, 'select'));
                _.each(toDeselect, (valueId) => this.findUpdateSelectionById(valueId, 'deselect'));
            } else {
                this.findUpdateSelectionById(value, 'select');
            }
        }
    }

    selectById(value) {
        let options = this.props.options;
        let {selectionManager} = this;
        let toSelectItem = _.find(options, (item) => item.id === value);
        if (toSelectItem) {
            if (this.multiSelect) {
                selectionManager.toggle(toSelectItem)
            } else {
                let isAlreadySelected = selectionManager.isSelected(toSelectItem);
                if (!isAlreadySelected) {
                    selectionManager.select(toSelectItem)
                } else {
                    selectionManager.trigger('change', toSelectItem, toSelectItem);
                }

            }
        }
    }

    findUpdateSelectionById(id, method) {
        let options = this.props.options;
        let toSelectItem = _.find(options, (item) => item.id === id);
        if (toSelectItem) {
            this.selectionManager[method](toSelectItem);
        } else {
            if (!this.multiSelect) {
                this.selectionManager.clear();
            }
        }

    }

    getFormattedSelection() {
        let selection = this.selectionManager.getSelected();
        if (this.multiSelect) {
            return _.map(selection, 'id').join(',');
        } else {
            return selection ? selection.id : ''
        }
    }

    getSelectedAttribute(selection, attribute) {
        if (this.multiSelect) {
            return _.map(selection, attribute).join(',');
        } else {
            return selection ? selection[attribute] : null
        }
    }

    readInputValue() {
        this.updateValue(this.getFormattedSelection(), 'read');
        let {exposeSelection, exposeName} = this.props;
        if (exposeSelection || exposeName) {
            let selected = this.selectionManager.getSelected();
            this.value$.next({field: this.props.name + '_selection', type: 'skipValidateUpdate', value: selected})
        }
    }

    exposeNameAndSelection() {
        let {exposeSelection, exposeName} = this.props;
        let selected = this.selectionManager.getSelected();
        if (exposeSelection) {
            this.selection$.next({field: this.props.name + '_selection', type: 'selection', value: selected});
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
        this.updateValue(this.getFormattedSelection(), 'update');
        this.exposeNameAndSelection();
        this.onChangeUpdates();
    }

    onClickHandler(e) {
        let curElement = e.target;
        let listRoot = this.refs.listRoot;
        if (this.props.disabled || !this.validateSelection()) {
            return;
        }

        while (curElement !== listRoot && !curElement.classList.contains('list-item')) {
            curElement = curElement.parentNode;
        }
        if (curElement !== listRoot) {
            let dataId = curElement.dataset.id;
            this.selectById(dataId);
        }
    }

    getFilteredOptions() {
        const {options, filterQuery, filterField} = this.props;
        return options.filter(item => item[filterField].toLowerCase().indexOf(filterQuery.toLowerCase()) > -1);
    }

    renderElement() {
        const {ListItem = RXSelectionItem} = this.props;
        return <div onClick={this.onClickHandler.bind(this)} ref="listRoot">
            <List items={this.getFilteredOptions()} selectionManager={this.selectionManager}
                  selection={this.state.__shadowValue} ListItem={ListItem}/>
        </div>
    }

    renderElementWithWrapper() {
        let formClasses = this.getFormClasses();
        formClasses.push(this.props.multiSelect === true ? 'multi-select' : 'single-select');
        let elementProps = this.context.elementPropIndex[this.props.name];
        let error = this.state.error || this.state.serverError;
        return <fieldset className={formClasses.join(' ')}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            {this.renderElement()}
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : ''}
            {error ? <small className="text-danger">{error.message}</small> : ''}
        </fieldset>
    }
}


RXSelectionElement.propTypes = {
    ...RXFormElement.propTypes,
    options: PropTypes.array.isRequired,
    exposeName: PropTypes.bool.isRequired,
    exposeSelection: PropTypes.bool.isRequired,
}

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
    filterQuery: '',
    filterField: 'name'
}
