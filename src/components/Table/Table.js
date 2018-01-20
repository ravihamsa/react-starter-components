/**
 * Created by ravi.hamsa on 7/4/16.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import core from '../../core';
import {_} from '../../core/utils';
import SimpleEmitter from '../../core/SimpleEmitter';

const {cloneChildren} = core.utils;

const tableConfigDetauls = {
    start: 1,
	perPage: 20,
    sortKey: '_id',
    sortOrder: 'dsc',
    filterKey: '',
    filterQuery: '',
    totalRecords: 0
};

class TableConfigManager extends SimpleEmitter {
    constructor(config) {
        super(config);
        this.config = _.extend({}, tableConfigDetauls, config);
        this.computeOtherConfigs();
    }

    setConfig(map, isSilent) {
        this.config = _.extend(this.config, map);
        this.computeOtherConfigs();
        if (!isSilent) {
            this.triggerChange();
        }
    }

    computeOtherConfigs() {
        const computed = {};
        const {start, perPage, totalRecords} = this.config;
        computed['end'] = Math.min(start + perPage - 1, totalRecords);
        computed['hasNext'] = computed['end'] < totalRecords;
        computed['hasPrev'] = start > 1;
        computed['showPagination'] = totalRecords > perPage;
        this.config = _.extend(this.config, computed);
    }

    bumpPage(diff) {
        const {start, perPage} = this.config;
        this.setConfig({
            start: start + (diff * perPage)
        });
    }

    nextPage() {
        if (this.config.hasNext) {
            this.bumpPage(1);
        }
    }

    prevPage() {
        if (this.config.hasPrev) {
            this.bumpPage(-1);
        }
    }

    triggerChange() {
        this.trigger('change', this.config);
    }

    getConfig() {
        return _.clone(this.config);
    }
}

class Pagination extends Component {
    prevClick(e) {
        e.preventDefault();
        this.props.paginationManager.prevPage();
    }

    nextClick(e) {
        e.preventDefault();
        this.props.paginationManager.nextPage();
    }

    render() {
        const {paginationManager, children, totalRecords} = this.props;
        const props = paginationManager.getConfig();
        if (!props.showPagination) {
            return null;
        }
        return <div className="pagination">
            <div>{props.start} to {props.end} of {totalRecords}</div>
            <div>
                {props.hasPrev ? <a href="#" onClick={this.prevClick.bind(this)}>Prev</a> : null}
                {props.hasNext ? <a href="#" onClick={this.nextClick.bind(this)}>Next</a> : null}
            </div>
        </div>;
    }
}


class PaginationWrapper extends Component {
    constructor(props) {
        super(props);
        this.paginationManager = new TableConfigManager({
            ..._.omit(props, 'children', 'records'), totalRecords: props.records.length
        });
    }

    componentWillMount() {
        const paginationManager = this.paginationManager;
        this.paginationSubscription = paginationManager.on('change', this.paginationChangeHandler.bind(this));
    }

    componentWillUnmount() {
        this.paginationSubscription && this.paginationSubscription();
    }

    paginationChangeHandler() {
        this.forceUpdate();
    }

    getFilteredRecords(records) {
        return records;
    }

    getSortedRecords(records) {
        return records;
    }

    getPaginatedRecords(records) {
        const {start, end} = this.paginationManager.getConfig();
        return records.slice(start - 1, end);
    }

    getProcessedRecords() {
        return this.getPaginatedRecords(this.getSortedRecords(this.getFilteredRecords(this.props.records)));
    }

    render() {
        const props = this.paginationManager.getConfig();
        props.records = this.getProcessedRecords();
        props.paginationManager = this.paginationManager;
        const clonedChildren = cloneChildren(this.props.children, props);
        return clonedChildren;
    }
}


class TH extends Component {

    render() {
        return <th>{this.props.label}</th>;
    }
}


class TD extends Component {

    render() {
        const self = this;
        const props = self.props;
        const attributes = props.attributes;
        const {record, recordIndex, dataKey} = props;
        return <td {...attributes}>{record[dataKey]}</td>;

    }
}


class TR extends Component {
    render() {
        const self = this;
        const props = self.props;
        const {records, record} = props;
        const attributes = props.attributes;
        const children = cloneChildren(this.props.children, {
            records, record
        });
        return <tr {...attributes}>{children}</tr>;
    }
}

class THEAD extends Component {
    render() {
        const self = this;
        const {records} = this.props;
        const children = cloneChildren(this.props.children, {
            records
        });
        return <thead>{children}</thead>;
    }
}

class TBODY extends Component {
    render() {
        const self = this;
        const props = self.props;
        const {records} = props;
        const children = records.map(function(record, recordIndex) {
            return cloneChildren(this.props.children, {
                records, record, recordIndex, key: recordIndex
            });
        }, this);
        return <tbody>{children}</tbody>;
    }
}


class PaginatedTable extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            curPage: +this.props.curPage || 0,
            perPage: +this.props.perPage || 20
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState(_.omit(newProps, 'children'));
    }

    computePagination() {
        const {curPage, perPage} = this.state;
        const records = this.props.records;
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
            });
        }
    }

    onPrev(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        if (this.hasPrev()) {
            this.setState({
                curPage: this.state.curPage - 1
            });
        }
    }

    hasNext() {
        const records = this.props.records;
        const totalFullPages = Math.floor(records.length / this.state.perPage);
        return this.state.curPage < totalFullPages - 1;
    }

    hasPrev() {
        return this.state.curPage > 0;
    }

    render() {

        const self = this;
        this.computePagination();
        const records = this.props.records;
        const renderRecords = this.renderRecords;
        const totalPages = Math.ceil(records.length / this.state.perPage);
        const children = cloneChildren(this.props.children, {
            records: renderRecords,
            totalPages,
            curPage: this.state.curPage,
            perPage: this.state.perPage,
            start: this.start,
            end: this.end,
            totalRecords: records.length,
            onNext: this.onNext.bind(this),
            onPrev: this.onPrev.bind(this),
            hasNext: this.hasNext(),
            hasPrev: this.hasPrev()
        });
        return <div className="paginated-table">{children}</div>;
    }
}


class Table extends Component {

    renderNoRecords() {
        const NoRecordsItemProp = this.props.NoRecordsItem;
        return <NoRecordsItemProp/>;
    }

    renderChildren() {
        let {attributes, children, records} = this.props;
        children = cloneChildren(children, {
            records
        });
        return <table className="table" {...attributes}>{children}</table>;
    }

    render() {
        const self = this;
        const props = self.props;
        const attributes = props.attributes;
        const {records, errors} = props;
        const zeroLength = records.length === 0;

        if (errors) {
            return <div>{errors.message}</div>;
        } else if (zeroLength) {
            return this.renderNoRecords();
        }

        const children = cloneChildren(this.props.children, {
            records
        });
        return <table className="table" {...attributes}>{children}</table>;
    }
}

Table.propTypes = {
    records: PropTypes.array
};


class NoRecordsItem extends Component {
    render() {
        return <div className="no-data">No Records Returned</div>;
    }
}


Table.defaultProps = {
    records: [],
    NoRecordsItem
};


class DynamicTable extends Table {
    renderChildren() {
        const {attributes, records} = this.props;
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
            columns = Object.keys(records[0]).map(item => ({
                key: item
            }));
            columns = columns.filter(item => columnsToHide.indexOf(item.key) === -1);
        }
        return columns;
    }

    render() {
        const self = this;
        const props = self.props;

        const {records, errors} = props;
        const zeroLength = records.length === 0;

        if (errors) {
            return <div>{errors.message}</div>;
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
};

export default {
    PaginatedTable,
    Table,
    DynamicTable,
    THEAD,
    TBODY,
    TH,
    TD,
    TR,
	Pagination,
    PaginationWrapper
};
