/**
 * Created by ravi.hamsa on 2/24/17.
 */
import React, {Component, PropTypes} from "react";
import Selection from "selection-manager";
import FormElement from './FormElement';
import SelectionFormElement from './SelectionFormElement';
import List from '../common/List';

export class SelectableListItem extends Component {

    getClassName() {
        let itemData = this.props.itemData;
        let selectionManager = this.props.selectionManager;
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

export default class SelectableList extends SelectionFormElement {

    render() {
        let formClasses = this.getFormClasses();
        formClasses= formClasses + ' '+ (this.multiSelect ? 'multi-select' : 'single-select');
        let errors = this.getErrors();
        let options = this.props.options;
        let ListItem = this.props.ListItem || SelectableListItem;

        return <fieldset className={formClasses + " " + (options.length === 0 ? 'zero-length' : '')}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            <div className="form-control" onClick={this.clickHandler.bind(this)}>
                <List ListItem={ListItem} items={options} selection={this.state.selection}
                      selectionManager={this.selectionManager} showName={this.props.showName}/>
            </div>

            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : '' }
        </fieldset>
    }
}


SelectableList.defaultProps = {
    ...FormElement.defaultProps,
    type:'selectable-list'
}