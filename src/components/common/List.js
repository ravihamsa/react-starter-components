/**
 * Created by ravi.hamsa on 6/30/16.
 */
import React, {Component, PropTypes} from "react";
import _ from 'lodash';

class ListItem extends Component {
    render(){
        var itemData = this.props.itemData;
        var ContainerTag = this.props.tagName
        var tagProps = _.pick(this.props, 'className', 'style')
        return (<ContainerTag {...tagProps} className="list-item">{itemData.name}</ContainerTag>);
    }
}


class List extends Component {



    render() {
        var self = this;
        var itemArray = self.props.items;
        var ContainerTag = self.props.tagName || 'ul';
        var noItemMessage = self.props.noDataMessage || 'No Items Found'
        var ListItemClass = self.props.ListItem || ListItem;

        var tagProps = _.pick(this.props, 'className', 'style')
        var otherProps = _.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'items');
        otherProps.tagName = this.props.itemTagName || 'li';
        otherProps.className = this.props.itemClassName || 'list-item';


        var listItems = itemArray.map(function (item) {
            return <ListItemClass key={item.id} id={item.id} itemData={item} {...otherProps}/>
        });

        if (listItems.length > 0) {
            return (<ContainerTag {...tagProps}>{listItems}</ContainerTag>);
        } else {
            return (<ContainerTag {...tagProps}><li className="no-data">{noItemMessage}</li></ContainerTag>)
        }

    }
}

export default List;