/**
 * Created by ravi.hamsa on 2/24/17.
 */
import React, {Component, PropTypes} from "react";
import Selection from 'selection-manager';
import FormElement from './FormElement';
import List from '../common/List';
import InlinePopupGroup from '../common/InlinePopupGroup'
const {InlinePopup,InlineButton,  InlineBody} = InlinePopupGroup;

export class SelectableListItem extends Component {

    getClassName() {
        let itemData = this.props.itemData;

        let selectionManager = this.props.selectionManager;
        let className = 'list-item ';

        if (selectionManager._selected) {
            if (selectionManager.isSelected(itemData)) {
                className += ' active';
            } else {
                className += ' not-active';
            }
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


export default class Dropdown extends FormElement {

    constructor() {
        super(...arguments);
        this.multiSelect = this.props.multiSelect === true;
        this.selectionManager = new Selection({multiSelect: this.multiSelect});
        this.onKeyPressHandler =  _.debounce(this._onKeyPressHandler.bind(this), 300)
        this.state.query = '';

    }

    componentWillReceiveProps(newProps){
        if(newProps.options){
            this.selectionManager.clear();
        }
    }

    componentWillMount() {
        this.unsubscribeSelection = this.selectionManager.on('change', (selection) => {
            this.setState({selection: selection})
            if(selection){
                if (this.multiSelect) {
                    this.setValue(_.map(selection, 'id'));
                } else {
                    this.setValue(selection.id);
                }
            }else{
                if (this.multiSelect) {
                    this.setValue([]);
                } else {
                    this.setValue(null);
                }
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
                this.refs['popup-body'].props.closePopup();
            }
        }
    }

    clickHandler(event) {
        let target = event.target;
        if (target.classList.contains('list-item')) {
            let dataId = target.dataset.id;
            this.selectById(dataId);
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

    _onKeyPressHandler() {
        var target = this.refs.searchBox;
        var value = target.value;
        this.setState({query: value});
    }

    getSummaryText(label){
        let {selectionManager, multiSelect} = this;
        let selected = selectionManager.getSelected();
        if(!selected){
            return  label || '--Select-- ';
        }
        if(!multiSelect){
            return selected.name;
        }else{
            return selected.length + ' Selected';
        }
    }

    renderButton(){
        let label = this.props.label;
        let selectionSummary = this.getSummaryText(label);
        return <div className="drop-down-button">
            <span className="drop-down-text"> {selectionSummary}</span>
            <span className="glyphicon glyphicon-chevron-down drop-down-icon"></span>
        </div>
    }

    render() {
        let formClasses = this.getFormClasses();
        let errors = this.getErrors();
        let options = this.props.options;
        let ListItem = this.props.ListItem || SelectableListItem;
        let placeholder = this.props.placeholder || "Please Enter Text";


        let filteredOptions = _.filter(options, (item) => {
            return item.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1;
        })



        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
            <div className="form-control drop-down">
                <InlinePopup >
                    <InlineButton>
                        {this.renderButton()}
                    </InlineButton>
                    <InlineBody ref="popup-body">
                        <div className="drop-down-body">
                            <input type="text" autoFocus defaultValue={this.state.query} ref="searchBox" onChange={this.onKeyPressHandler} className="drop-down-input" placeholder={placeholder}/>
                            <div onClick={this.clickHandler.bind(this)}>
                                <List ListItem={ListItem} items={filteredOptions} selection={this.state.selection}
                                      selectionManager={this.selectionManager}/>
                            </div>
                        </div>
                    </InlineBody>
                </InlinePopup>

            </div>

            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : '' }
        </fieldset>
    }
}