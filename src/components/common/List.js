/**
 * Created by ravi.hamsa on 6/30/16.
 */
import React, {Component, PropTypes} from "react";
import _ from 'lodash';

export class ListItem extends Component {
    render() {
        return this.renderContent();
    }

    renderContent() {
        var itemData = this.props.itemData;
        var ContainerTag = this.props.tagName
        var tagProps = this.getTagProps();
        return (<ContainerTag {...tagProps}>{itemData.name}</ContainerTag>);
    }


    getTagProps() {
        return _.pick(this.props, 'className', 'style')
    }
}


export class LayoutList extends Component {


    render() {

        var columns = this.props.columns;
        var colClassName = 'col-md-' + Math.round(12 / columns);
        var itemClassName = this.props.itemClassName || 'list-item';
        var rowClassName = this.props.rowClassName || ''
        var items = this.props.items;
        var ListItemClass = this.props.ListItem || ListItem;
        var children = [];
        for (var i = 0; i < items.length; i += columns) {
            var colChildren = [];
            for (var j = 0; j < columns; j++) {
                var item = items[i + j];
                if (item) {
                    colChildren.push(<ListItemClass key={item.id} itemData={item}
                                                    className={colClassName + ' ' + itemClassName} tagName="div"/>)
                }
            }

            children.push(<div className={'row ' + rowClassName}  key={i}>
                {colChildren}
            </div>)
        }

        return <div className={this.props.className}>{children}</div>;

    }
}


export default class List extends Component {


    render() {
        var self = this;
        var itemArray = self.props.items;
        var ContainerTag = self.props.tagName || 'ul';
        var noItemMessage = self.props.noDataMessage || 'No Items Found'
        var ListItemClass = self.props.ListItem || ListItem;

        var tagProps = _.pick(this.props, 'className', 'style')
        var otherProps = _.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'items', 'itemClassName', 'itemTagName');
        otherProps.tagName = this.props.itemTagName || 'li';
        otherProps.className = this.props.itemClassName || 'list-item';


        var listItems = itemArray.map(function (item) {
            return <ListItemClass key={item.id} id={item.id} itemData={item} {...otherProps}/>
        });

        if (listItems.length > 0) {
            return (<ContainerTag {...tagProps}>{listItems}</ContainerTag>);
        } else {
            return (<ContainerTag {...tagProps}>
                <li className="no-data">{noItemMessage}</li>
            </ContainerTag>)
        }

    }
}
