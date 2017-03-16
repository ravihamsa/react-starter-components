/**
 * Created by ravi.hamsa on 2/24/17.
 */
import React, {Component, PropTypes} from "react";
import Selection from "selection-manager";
import FormElement from './FormElement';
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

export default class SelectableList extends FormElement {

    constructor() {
        super(...arguments);
        this.multiSelect = this.props.multiSelect === true;
        this.selectionManager = new Selection({multiSelect: this.multiSelect});

    }

    componentWillMount() {
        this.unsubscribeSelection = this.selectionManager.on('change', (selection) => {
            this.setState({selection: selection})
            if (this.multiSelect) {
                this.setValue(_.map(selection, 'id'));
            } else {
                this.setValue(selection.id);
            }
        })
        let defaultValue = this.getDefaultValue();
        this.applyValue(defaultValue);
        this.state.selection = defaultValue;
    }

    componentWillUnmount() {
        if (this.unsubscribeSelection) {
            this.unsubscribeSelection();
        }
    }

    applyValue(value) {
        if (this.multiSelect) {
            value = value || [];
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

    clickHandler(event) {
        let target = event.target;
        if (target.classList.contains('list-item')) {
            let dataId = target.dataset.id;
            this.selectById(dataId);
            target.classList.add('active');
        }
    }


    getFormClasses() {
        let classArray = ['form-group'];
        classArray.push(this.props.className)
        if (this.state.errors.length > 0) {
            classArray.push('has-error');
        }
        return classArray.join(' ')
    }

    render() {
        let formClasses = this.getFormClasses();
        let errors = this.getErrors();
        let options = this.props.options;
        let ListItem = this.props.ListItem || SelectableListItem;

        return <fieldset className={formClasses + " " + (options.length === 0 ? 'zero-length' : '')}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
            <div className="form-control" onClick={this.clickHandler.bind(this)}>
                <List ListItem={ListItem} items={options} selection={this.state.selection}
                      selectionManager={this.selectionManager} showName={this.props.showName}/>
            </div>

            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : '' }
        </fieldset>
    }
}