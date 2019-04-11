/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {Component} from 'react';
import RXSelectionElement from './RXSelectionElement';
import List from '../common/List';
import {InlineModal, InlineModalBody, InlineModalButton} from '../common/InlineModalGroup';
import {_} from '../../core/utils';

export class RXDropdownItem extends Component {

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

RXDropdownItem.defaultProps = {
	idAttribute:'id'
}

export default class RXDropdown extends RXSelectionElement {

    constructor(props) {
        super(props);
        this.onKeyPressHandler = _.debounce(this._onKeyPressHandler.bind(this), 300);
        this.state.query = '';
    }

    _onKeyPressHandler() {
        const target = this.ref_searchBox;
        const value = target.value;
        this.setState({
            query: value
        });
    }

    getSummaryText() {
        const {selectionManager, multiSelect} = this;
        const options = this.getOptions();
        if (options === undefined || options.length === 0) {
            return this.props.noOptionsLabel;
        }

        const selected = selectionManager.getSelected();
        if (!selected) {
            return this.props.noSelectionLabel;
        }
        if (!multiSelect) {
            return selected.name;
        } else {
            if (selected.length === options.length) {
                return this.props.allSelectedLabel;
            } else {
                return selected.length + ' ' + this.props.optionsSelectedLabel;
            }

        }
    }

    onChangeUpdates(value) {
        if (!this.multiSelect) {
            if (this.ref_inlinePopup) {
                this.ref_inlinePopup.closePopup();
            }
        }
    }

    renderButton() {
        const selectionSummary = this.getSummaryText(this.props.placeholder);
        let dropDownButtonClassName = "drop-down-button" + (this.props.disabled ? " disabled" : " enabled");

        return <div className={dropDownButtonClassName}>
            <span className="drop-down-text"> {selectionSummary}</span>
            <span className="glyphicon glyphicon-chevron-down drop-down-icon"></span>
        </div>;
    }


    getFilteredOptions() {
        const options = this.getOptions();
        return options.filter(item => item.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1);
    }

    renderElement() {
        const {valign = 'top', bodyPosition, ListItem = RXDropdownItem, listBodyClassName = 'drop-down-body', useButtonWidth, idAttribute} = this.props;
        const filteredOptions = this.getFilteredOptions();

        return <InlineModal ref={inlinePopup => this.ref_inlinePopup = inlinePopup} disabled={this.props.disabled}>
            <InlineModalButton>
                {this.renderButton()}
            </InlineModalButton>
            <InlineModalBody valign={valign} bodyPosition={bodyPosition} className={listBodyClassName} useButtonWidth={useButtonWidth}>
                <div className="drop-down-body">
                    {this.props.showSearch ? <div className="drop-down-search-container">
                        <input type="text" autoFocus defaultValue={this.state.query} ref={searchBox => this.ref_searchBox = searchBox}
                            onChange={this.onKeyPressHandler} className="drop-down-input"
                            placeholder={this.props.placeholder}/>
                    </div> : null}
                    <div onClick={this.onClickHandler.bind(this)} ref={listRoot => this.ref_listRoot = listRoot}>
                        <List items={filteredOptions} selectionManager={this.selectionManager}
                            selection={this.state.value} ListItem={ListItem} idAttribute={idAttribute}/>
                    </div>
                </div>
            </InlineModalBody>
        </InlineModal>;

    }

}


RXDropdown.defaultProps = {
    ...RXSelectionElement.defaultProps,
    type: 'drop-down',
    noOptionsLabel: 'No Options',
    noSelectionLabel: 'Select',
    allSelectedLabel: 'All Selected',
    optionsSelectedLabel: 'Options Selected',
    bodyPosition: 'down',
    useButtonWidth:true,
    listBodyClassName:'inline-popup-body-fullwidth'
};

