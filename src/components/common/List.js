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
        var otherProps = _.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
        var ListItemClass = this.props.ListItem || ListItem;
        var children = [];
        for (var i = 0; i < items.length; i += columns) {
            var colChildren = [];
            for (var j = 0; j < columns; j++) {
                var item = items[i + j];
                if (item) {
                    colChildren.push(<ListItemClass key={item.id} ref={item.id} itemData={item} itemIndex={i + j}
                                                    className={colClassName + ' ' + itemClassName}
                                                    tagName="div"  {...otherProps} />)
                }
            }

            children.push(<div className={'row ' + rowClassName} key={i}>
                {colChildren}
            </div>)
        }

        return <div className={this.props.className}>{children}</div>;

    }
}


export class PaginatedLayoutList extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            curPage: this.props.curPage | 0,
            perPage: this.props.perPage || 9
        }
    }

    render() {

        var columns = this.props.columns;
        var colClassName = 'col-md-' + Math.round(12 / columns);
        var itemClassName = this.props.itemClassName || 'list-item';
        var rowClassName = this.props.rowClassName || ''
        var otherProps = _.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
        var ListItemClass = this.props.ListItem || ListItem;
        var children = [];

        let {curPage, perPage} = this.state;
        let start = curPage * perPage;
        let end = start + perPage;
        end = Math.max(end, items.length);
        let paginatedItems = items.slice(start, perPage);

        for (var i = 0; i < paginatedItems.length; i += columns) {
            var colChildren = [];
            for (var j = 0; j < columns; j++) {
                var item = paginatedItems[i + j];
                if (item) {
                    colChildren.push(<ListItemClass key={item.id} ref={item.id} itemData={item} itemIndex={i + j}
                                                    className={colClassName + ' ' + itemClassName}
                                                    tagName="div" {...otherProps}/>)
                }
            }

            children.push(<div className={'row ' + rowClassName} key={i}>
                {colChildren}
            </div>)
        }

        return <div className={this.props.className}>{children}</div>;

    }
}

export default class List extends Component {


    renderNoItems() {
        var noItemMessage = this.props.noDataMessage || 'No Items Found'
        return <li className="no-data">{noItemMessage}</li>
    }

    renderItems(items) {
        return items;
    }

    renderChildren(items) {
        var tagProps = this.getTagProps();
        tagProps.className = tagProps.className || 'list';
        if(items.length === 0){
            tagProps.className += ' zero-length';
        }
        var ContainerTag = this.props.tagName || 'ul';

        return <ContainerTag {...tagProps}>
            {items.length > 0 ? this.renderItems(items) : this.renderNoItems()}
        </ContainerTag>
    }

    getTagProps() {
        return _.pick(this.props, 'className', 'style')
    }

    render() {
        var self = this;
        var itemArray = self.props.items;


        var ListItemClass = self.props.ListItem || ListItem;

        var otherProps = _.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
        otherProps.tagName = this.props.itemTagName || 'li';
        otherProps.className = this.props.itemClassName || 'list-item';

        var listItems = itemArray.map(function (item, index) {
            return <ListItemClass key={item.id} itemIndex={index} itemData={item} {...otherProps}/>
        });

        return this.renderChildren(listItems);

    }
}


export class SelectableItem extends ListItem {

    constructor() {
        super(...arguments);
        let {itemData, selectionManager} = this.props;
        this.state = {
            selected: selectionManager.isSelected(itemData)
        }

    }

    updateSelectionState() {
        let {itemData, selectionManager} = this.props;
        this.setState({
            selected: selectionManager.isSelected(itemData)
        })
    }

    selectItem(event) {
        event.preventDefault();
        let {itemData, selectionManager} = this.props;
        if (selectionManager._multiSelect) {
            selectionManager.toggle(itemData);
        } else {
            selectionManager.select(itemData);
        }
    }

    renderContent() {
        var itemData = this.props.itemData;
        var ContainerTag = this.props.tagName
        var tagProps = this.getTagProps();
        return (<ContainerTag {...tagProps} >
            <a href="#select" onClick={this.selectItem.bind(this)}>{itemData.name}</a>
        </ContainerTag>);
    }

    getTagProps() {
        return {
            className: this.state.selected ? 'active list-item' : 'list-item'
        }
    }

}

export class SelectableList extends List {
    componentDidMount() {
        let selectionManager = this.props.selectionManager;
        let self = this;
        if (selectionManager) {
            this.unsubscribeSelection = selectionManager.on('change', function (selection, prevSelection) {
                let fullList = _.flatten([selection, prevSelection]);
                _.each(fullList, function (item) {
                    if (item) {
                        self.refs[item.id].updateSelectionState();
                    }
                })
            })
        }
    }

    componentWillUnmount() {
        if (this.unsubscribeSelection) {
            this.unsubscribeSelection();
        }
    }

    render() {
        var self = this;
        var itemArray = self.props.items;


        var ListItemClass = self.props.ListItem || ListItem;

        var otherProps = _.omit(this.props, 'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName');
        otherProps.tagName = this.props.itemTagName || 'li';
        otherProps.className = this.props.itemClassName || 'list-item';

        var listItems = itemArray.map(function (item, index) {
            return <ListItemClass key={item.id} ref={item.id} itemIndex={index} itemData={item} {...otherProps}/>
        });

        return this.renderChildren(listItems);

    }
}