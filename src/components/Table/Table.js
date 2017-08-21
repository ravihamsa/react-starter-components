/**
 * Created by ravi.hamsa on 7/4/16.
 */
import React, {PropTypes, Component} from "react";
import core from '../../core';
import EventEmitter from "events";
import {_} from '../../core/utils';

const {cloneChildren} = core.utils;


class TH extends Component {

    render() {
        return <th>{this.props.label}</th>
    }
}


class TD extends Component {

    render() {
        let self = this;
        let props = self.props;
        let attributes = props.attributes;
        let {record, recordIndex, dataKey} = props;
        return <td {...attributes}>{record[dataKey]}</td>

    }
}


class TR extends Component {
    render() {
        let self = this;
        let props = self.props;
        let {records, record} = props;
        let attributes = props.attributes;
        let children = cloneChildren(this.props.children, {records, record})
        return <tr {...attributes}>{children}</tr>;
    }
}

class THEAD extends Component {
    render() {
        let self = this;
        let {records} = this.props;
        let children = cloneChildren(this.props.children, {records: records})
        return <thead>{children}</thead>;
    }
}

class TBODY extends Component {
    render() {
        let self = this;
        let props = self.props;
        let {records} = props;
        let children = records.map(function (record, recordIndex) {
            return cloneChildren(this.props.children, {records, record, recordIndex, key: recordIndex})
        }, this)
        return <tbody>{children}</tbody>;
    }
}


class PaginatedTable extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            curPage: +this.props.curPage || 0,
            perPage: +this.props.perPage || 20
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState(_.omit(newProps, 'children'));
    }

    computePagination() {
        let {curPage, perPage} = this.state;
        let records = this.props.records;
        this.start = curPage * perPage;
        this.end = Math.min(this.start + perPage, records.length);
        this.renderRecords = records.slice(this.start, this.end);
    }

    onNext(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (this.hasNext()) {
            this.setState({
                curPage: this.state.curPage + 1
            })
        }
    }

    onPrev(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (this.hasPrev()) {
            this.setState({
                curPage: this.state.curPage - 1
            })
        }
    }

    hasNext() {
        let records = this.props.records;
        let totalFullPages = Math.floor(records.length / this.state.perPage);
        return this.state.curPage < totalFullPages - 1;
    }

    hasPrev() {
        return this.state.curPage > 0;
    }

    render() {

        let self = this;
        this.computePagination();
        let records = this.props.records;
        let renderRecords = this.renderRecords;
        let totalPages = Math.ceil(records.length / this.state.perPage);
        let children = cloneChildren(this.props.children, {
            records: renderRecords,
            totalPages: totalPages,
            curPage: this.state.curPage,
            perPage: this.state.perPage,
            start: this.start,
            end: this.end,
            totalRecords: records.length,
            onNext: this.onNext.bind(this),
            onPrev: this.onPrev.bind(this),
            hasNext: this.hasNext(),
            hasPrev: this.hasPrev()
        })
        return <div className="paginated-table">{children}</div>;
    }
}


class Table extends Component {

    renderNoRecords() {
        let NoRecordsItemProp = this.props.NoRecordsItem;
        return <NoRecordsItemProp/>
    }

    renderChildren() {
        let {attributes, children, records} = this.props;
        children = cloneChildren(children, {records})
        return <table className="table" {...attributes}>{children}</table>;
    }

    render() {
        let self = this;
        let props = self.props;
        let attributes = props.attributes;
        let {records, errors} = props;
        let zeroLength = records.length === 0;

        if (errors) {
            return <div>{errors.message}</div>
        } else if (zeroLength) {
            return this.renderNoRecords();
        }

        let children = cloneChildren(this.props.children, {records})
        return <table className="table" {...attributes}>{children}</table>;
    }
}

Table.propTypes = {
    records: PropTypes.array
}


class NoRecordsItem extends Component {
    render() {
        return <div className="no-data">No Records Returned</div>
    }
}


Table.defaultProps = {
    records: [],
    NoRecordsItem: NoRecordsItem
}


class DynamicTable extends Table {
    renderChildren() {
        let {attributes, records} = this.props;
        const columns = this.parseColumns();
        return <table className="table" {...attributes}>
            <thead>
            <tr>
                {columns.map(item => <td key={item.key}>{item.label || item.key}</td>)}
            </tr>
            </thead>
            <tbody>
            {records.map(rowItem => <tr key={rowItem.id || rowItem._id}>
                {columns.map(item => <td key={item.key}>{rowItem[item.key]}</td>)}
            </tr>)}
            </tbody>
        </table>;
    }


    parseColumns() {
        const {records, columnsToHide} = this.props;
        let {columns} = this.props;
        if (columns.length === 0) {
            columns = Object.keys(records[0]).map(item => {
                return {
                    key: item
                };
            });
            columns = columns.filter(item => columnsToHide.indexOf(item.key) === -1);
        }
        return columns;
    }

    render() {
        let self = this;
        let props = self.props;

        let {records, errors} = props;
        let zeroLength = records.length === 0;

        if (errors) {
            return <div>{errors.message}</div>
        } else if (zeroLength) {
            return this.renderNoRecords();
        }
        return this.renderChildren();
    }
}


DynamicTable.defaultProps = {
    ...Table.defaultProps,
    columns: [],
    columnsToHide: ['_id']
}

export default {
    PaginatedTable,
    Table,
    DynamicTable,
    THEAD,
    TBODY,
    TH,
    TD,
    TR
}
