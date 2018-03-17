/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {Component} from 'react';
import {_, getDomProps} from '../../core/utils';
import SimpleElement from './SimpleElement';
import Selection from 'selection-manager';
import List from '../../components/common/List';

export class SelectionItem extends Component {

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
        return <li data-id={itemData.id} className={className}>
            {itemData.name}
        </li>;
    }
}

export default class SimpleSelectionElement extends SimpleElement {

    constructor(props) {
        super(props);
        this.multiSelect = props.multiSelect;
        this.selectionManager = new Selection({
            multiSelect: props.multiSelect
        });
    }

    componentWillMount() {
        this.applyValue(this.props.value);
        this.readInputValue();
        this.changeSubscription = this.selectionManager.on('change', this.onChange.bind(this));
    }


    onChange() {
        this.exposeNameAndSelection();
        this.updateValue(this.props.useSelectionAsValue ? this.selectionManager.getSelected() : this.getFormattedSelection());
        this.onChangeUpdates();
        this.forceUpdate();
    }

    onChangeUpdates() {
        //do nothing
    }

    componentWillUnmount() {
        if (this.changeSubscription) {
            this.changeSubscription();
        }
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
                    });
                } else {
                    const selectedOption = newOptions.find(optionItem => optionItem.id === selected.id);
                    if (!selectedOption) {
                        this.selectionManager.deselect(selected);
                    }
                }

            }
        }

        if (newProps.value !== undefined) {
            if (newProps.value !== this.props.value) {
                this.applyValue(newProps.value);
            }
        }

    }

    validateSelection() {
        return true;
    }

    onClickHandler(e) {
        let curElement = e.target;
        const listRoot = this.ref_listRoot;
        if (this.props.disabled || !this.validateSelection()) {
            return;
        }

        while (curElement !== listRoot && !curElement.classList.contains('list-item')) {
            curElement = curElement.parentNode;
        }
        if (curElement !== listRoot) {
            const dataId = curElement.dataset.id;
            this.selectById(dataId);
        }
    }

    getOptions() {
        return this.props.options;
    }

    getFilteredOptions() {
        const {filterQuery = '', filterField = 'name'} = this.props;
        const options = this.getOptions();
        return options.filter(item => item[filterField].toLowerCase().indexOf(filterQuery.toLowerCase()) > -1);
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
        const toSelectItem = _.find(options, item => item.id === value);
        if (toSelectItem) {
            if (this.multiSelect) {
                const selected = selectionManager.getSelected();
                const isAlreadySelected = selectionManager.isSelected(toSelectItem);
                const forceMinimumSelection = this.props.forceMinimumSelection;
                const forceMaxSelection = this.props.forceMaxSelection;
                if (!isAlreadySelected) {
                    if (selected.length < forceMaxSelection) {
                        selectionManager.toggle(toSelectItem);
                    }
                } else {
                    if (selected.length > forceMinimumSelection) {
                        selectionManager.toggle(toSelectItem);
                    }
                }
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
        const toSelectItem = _.find(options, item => item.id === id);
        if (toSelectItem) {
            this.selectionManager[method](toSelectItem);
        } else {
            if (!this.multiSelect) {
                this.selectionManager.clear();
            }
        }

    }

    getFormattedSelection(selection = this.selectionManager.getSelected()) {
        if (this.multiSelect) {
            return _.map(selection, 'id').join(',');
        } else {
            return selection ? selection.id : '';
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
        if (selection === '' && this.props.selectDefaultFirst) {
            const {options} = this.props;
            if (options && options.length > 0) {
                this.selectionManager.select(options[0]);
                selection = this.getFormattedSelection();
            }
        }
        const {exposeSelection, exposeName} = this.props;
        if (exposeSelection || exposeName) {
            this.exposeNameAndSelection();
        }
        this.onChange();

    }

    exposeNameAndSelection() {
        const {exposeSelection, name} = this.props;
        const selected = this.selectionManager.getSelected();
        if (exposeSelection) {
            this.context.collector.mutedUpdateValue(`${name}_selection`, selected);
        }
    }

    render() {
        const domProps = getDomProps(this.props);
        domProps.className = this.getClassNames();
        const {ListItem = SelectionItem} = this.props;
        const selected = this.selectionManager.getSelected();
        return <div {...domProps} onClick={this.onClickHandler.bind(this)} ref={element => this.ref_listRoot = element}>
            <List items={this.getFilteredOptions()} selectionManager={this.selectionManager} selection={selected}
			      ListItem={ListItem}/>
        </div>;
    }
}


SimpleSelectionElement.defaultProps = {
    ...SimpleElement.defaultProps,
    type: 'selection',
    selectDefaultFirst: false,
    forceMinimumSelection: 0,
    forceMaxSelection: Infinity
};

