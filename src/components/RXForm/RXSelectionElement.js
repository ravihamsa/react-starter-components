/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {PropTypes, Component} from "react";
import Selection from 'selection-manager';
import RXFormElement from './RXFormElement';
import List from '../common/List'


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
        this.applyDefaultValue()
        this.changeSubscription = this.selectionManager.on('change', this.onChange.bind(this));
    }

    applyDefaultValue() {
        let value = this.state.defaultValue;
        if (this.multiSelect) {
            value = value.split(',') || [];
            _.each(value, (valueId) => {
                this.selectById(valueId)
            })
        } else {
            this.selectById(value)
        }
    }

    selectById(value) {
        let options = this.props.options;
        let toSelectItem = _.find(options, (item) => item.id === value);
        if (toSelectItem) {
            if (this.multiSelect) {
                this.selectionManager.toggle(toSelectItem)
            } else {
                this.selectionManager.select(toSelectItem)
            }
        }
    }

    stringifySelection(selection) {
        if (this.multiSelect) {
            return _.map(selection, 'id');
        } else {
            return selection ? selection.id : ''
        }
    }

    readInputValue() {
        let valueRead = this.selectionManager.getSelected();
        this.updateProps(this.stringifySelection(valueRead), 'defaultValue');
        this.updateValue(valueRead, 'read');
    }

    onChangeUpdates(){
        //to be overwritten
    }

    onChange(e) {
        let valueRead = this.selectionManager.getSelected();
        this.updateProps(this.stringifySelection(valueRead), 'defaultValue');
        this.updateValue(valueRead, 'update');
        this.onChangeUpdates();
    }

    onClickHandler(e) {
        let curElement = e.target;
        let listRoot = this.refs.listRoot;
        while (curElement !== listRoot && !curElement.classList.contains('list-item')) {
            curElement = curElement.parentNode;
        }
        if (curElement !== listRoot) {
            let dataId = curElement.dataset.id;
            this.selectById(dataId);
        }
    }

    renderElement() {
        return <div onClick={this.onClickHandler.bind(this)} ref="listRoot">
            <List items={this.props.options} selectionManager={this.selectionManager}
                  selection={this.state.defaultValue} ListItem={RXSelectionItem}/>
        </div>
    }

    renderElementWithWrapper() {
        let formClasses = this.getFormClasses();
        let elementProps = this.context.elementPropIndex[this.props.name];
        let error = this.state.error;
        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
            {this.renderElement()}
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {error ? <small className="text-danger">{error.message}</small> : '' }
        </fieldset>
    }
}


RXSelectionElement.propTypes = {
    ...RXFormElement.propTypes,
    options: PropTypes.array.isRequired
}

RXFormElement.defaultProps = {
    ...RXFormElement.defaultProps,
    type: 'text',
    placeholder: 'Select',
    label: 'Select',
    options: []
}
