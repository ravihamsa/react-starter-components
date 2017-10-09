/**
 * Created by ravi.hamsa on 2/24/17.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import Selection from 'selection-manager';
import FormElement from './FormElement';
import SelectionFormElement from './SelectionFormElement';
import List from '../common/List';
import InlinePopupGroup from '../common/InlinePopupGroup'
import {SelectableListItem} from './SelectableList'
const {InlinePopup,InlineButton,  InlineBody} = InlinePopupGroup;
import {_} from '../../core/utils';

/*export class SelectableListItem extends Component {

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
}*/


export default class Dropdown extends SelectionFormElement {

    constructor() {
        super(...arguments);
        this.onKeyPressHandler =  _.debounce(this._onKeyPressHandler.bind(this), 300)
        this.state.query = '';
    }

    onChangeUpdates(value){
        if(!this.multiSelect){
            if(this.refs['inlinePopup']){
                this.refs['inlinePopup'].closePopup();
            }
        }
    }

    _onKeyPressHandler() {
        var target = this.refs.searchBox;
        var value = target.value;
        this.setState({query: value});
    }

    getSummaryText() {
        let {selectionManager, multiSelect} = this;
        let  {options} = this.props;
        if(options ===undefined || options.length === 0){
            return this.props.noOptionsLabel
        }

        let selected = selectionManager.getSelected();
        if (!selected) {
            return this.props.noSelectionLabel
        }
        if (!multiSelect) {
            return selected.name;
        } else {
            if(selected.length ===options.length){
                return this.props.allSelectedLabel
            }else{
                if(selected.length ===0){
                    return this.props.noSelectionLabel
                }
                return selected.length + ' '+this.props.optionsSelectedLabel;
            }
        }
    }

    renderButton(){
        let getSummaryText = this.getSummaryText;
        let {placeholder,dropDownSummary:dropDownSummary=getSummaryText} = this.props;
        dropDownSummary = dropDownSummary.bind(this);
        let selectionSummary = dropDownSummary(placeholder);
        return <div className="drop-down-button">
            <span className="drop-down-text"> {selectionSummary}</span>
            <span className="glyphicon glyphicon-chevron-down drop-down-icon"></span>
        </div>
    }

    render() {
        let formClasses = this.getFormClasses();
        formClasses= formClasses;
        let errors = this.getErrors();
        let options = this.props.options;
        let ListItem = this.props.ListItem || SelectableListItem;
        let placeholder = this.props.placeholder || "Please Enter Text";
        let {valign="top"} = this.props;

        let filteredOptions = _.filter(options, (item) => {
            return item.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1;
        })

        if(filteredOptions.length > 500 && this.state.query === ''){
            filteredOptions = []
        }


        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            <div className="form-control drop-down">
                <InlinePopup ref="inlinePopup"  disabled={this.props.disabled}>
                    <InlineButton>
                        {this.renderButton()}
                    </InlineButton>
                    <InlineBody valign={valign} className="inline-popup-body-fullwidth">
                        <div className="drop-down-body">
                            {this.props.showSearch ? <div className="drop-down-search-container"><input type="text" autoFocus defaultValue={this.state.query} ref="searchBox" onChange={this.onKeyPressHandler} className="drop-down-input" placeholder={placeholder}/> </div>: null}
                            <div onClick={this.clickHandler.bind(this)}>
                                <List ListItem={ListItem}
                                      className={this.multiSelect ? 'multi-select list' : 'single-select list'}
                                      items={filteredOptions}
                                      selection={this.state.selection}
                                      hideNoItems={this.props.hideNoItems === true}
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

Dropdown.defaultProps = {
    ...FormElement.defaultProps,
    type:'drop-down',
    showSearch:false,
    noOptionsLabel:'No Options',
    noSelectionLabel:'Select',
    allSelectedLabel:'All Selected',
    optionsSelectedLabel:'Options Selected'
}
