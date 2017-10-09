/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import Selection from 'selection-manager';
import RXSelectionElement from './RXSelectionElement';
import List from '../common/List'
import InlinePopupGroup from '../common/InlinePopupGroup'

const {InlinePopup, InlineButton, InlineBody} = InlinePopupGroup
import {_} from '../../core/utils';

export class RXDropdownItem extends Component {

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

export default class RXDropdown extends RXSelectionElement {

    constructor(props) {
        super(props);
        this.onKeyPressHandler = _.debounce(this._onKeyPressHandler.bind(this), 300)
        this.state.query = '';
    }

    _onKeyPressHandler() {
        var target = this.refs.searchBox;
        var value = target.value;
        this.setState({query: value});
    }

    getSummaryText() {
        let {selectionManager, multiSelect} = this;
        let {options} = this.props;
        if (options === undefined || options.length === 0) {
            return this.props.noOptionsLabel
        }

        let selected = selectionManager.getSelected();
        if (!selected) {
            return this.props.noSelectionLabel
        }
        if (!multiSelect) {
            return selected.name;
        } else {
            if (selected.length === options.length) {
                return this.props.allSelectedLabel
            } else {
                return selected.length + ' ' + this.props.optionsSelectedLabel;
            }

        }
    }

    onChangeUpdates(value) {
        if (!this.multiSelect) {
            if (this.refs['inlinePopup']) {
                this.refs['inlinePopup'].closePopup();
            }
        }
    }

    renderButton() {
        let selectionSummary = this.getSummaryText(this.props.placeholder);
        return <div className="drop-down-button">
            <span className="drop-down-text"> {selectionSummary}</span>
            <span className="glyphicon glyphicon-chevron-down drop-down-icon"></span>
        </div>
    }

    renderElement() {
        let {valign = "top", bodyPosition} = this.props;
        let filteredOptions = _.filter(this.props.options, (item) => {
            return item.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1;
        })


        return <InlinePopup ref="inlinePopup" disabled={this.props.disabled}>
            <InlineButton>
                {this.renderButton()}
            </InlineButton>
            <InlineBody valign={valign} bodyPosition={bodyPosition} className="inline-popup-body-fullwidth">
                <div className="drop-down-body">
                    {this.props.showSearch ? <div className="drop-down-search-container">
                        <input type="text" autoFocus defaultValue={this.state.query} ref="searchBox"
                               onChange={this.onKeyPressHandler} className="drop-down-input"
                               placeholder={this.props.placeholder}/>
                    </div> : null}
                    <div onClick={this.onClickHandler.bind(this)} ref="listRoot">
                        <List items={filteredOptions} selectionManager={this.selectionManager}
                              selection={this.state.value} ListItem={RXDropdownItem}/>
                    </div>
                </div>
            </InlineBody>
        </InlinePopup>

    }

}


RXDropdown.defaultProps = {
    ...RXSelectionElement.defaultProps,
    type: 'drop-down',
    noOptionsLabel: 'No Options',
    noSelectionLabel: 'Select',
    allSelectedLabel: 'All Selected',
    optionsSelectedLabel: 'Options Selected',
    bodyPosition: 'down'
}

