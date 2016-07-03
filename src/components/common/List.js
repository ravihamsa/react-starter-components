/**
 * Created by ravi.hamsa on 6/30/16.
 */
import React, {Component, PropTypes} from "react";

class ListItem extends Component {
    render(){
        var itemData = this.props.itemData;
        var ContainerTag = 'li';
        return (<ContainerTag {...this.props} className="list-item">{itemData.name}</ContainerTag>);
    }
}


class List extends Component {
    render() {
        var self = this;
        var itemArray = self.props.items;
        var ContainerTag = self.props.tagName || 'ul';
        var noItemMessage = self.props.noDataMessage || 'No Items Found'
        var ListItemClass = self.props.ListItem || ListItem;
        var listItems = itemArray.map(function (item) {
            return <ListItemClass key={item.id} id={item.id} itemData={item} {...self.props}/>
        });

        if (listItems.length > 0) {
            return (<ContainerTag {...this.props}>{listItems}</ContainerTag>);
        } else {
            return (<ContainerTag {...this.props}><li className="no-data">{noItemMessage}</li></ContainerTag>)
        }

    }
}

export default List;