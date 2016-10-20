/**
 * Created by ravi.hamsa on 7/4/16.
 */
import React, {PropTypes, Component} from "react";
import core from '../../core';
import EventEmitter from "events";
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

    computePagination() {
        let {curPage, perPage} = this.state;
        let records = this.props.records;
        this.start = curPage * perPage;
        this.end = Math.min(this.start + perPage, records.length);
        this.renderRecords = records.slice(this.start, this.end);
    }

    onNext() {
        if(this.hasNext()){
            this.setState({
                curPage:this.state.curPage + 1
            })
        }
    }

    onPrev(){
        if(this.hasPrev()){
            this.setState({
                curPage:this.state.curPage - 1
            })
        }
    }

    hasNext(){
        let records = this.props.records;
        let totalFullPages = Math.floor(records.length / this.state.perPage);
        return this.state.curPage < totalFullPages;
    }

    hasPrev(){
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
            totalPages:totalPages,
            curPage:this.state.curPage,
            perPage:this.state.perPage,
            start: this.start,
            end: this.end,
            totalRecords:records.length,
            onNext: this.onNext.bind(this),
            onPrev: this.onPrev.bind(this),
            hasNext: this.hasNext(),
            hasPrev: this.hasPrev()})
        return <div className="paginated-table">{children}</div>;
    }
}


class Table extends Component {

    render() {
        let self = this;
        let props = self.props;
        let attributes = props.attributes;
        let {records, errors} = props;
        let zeroLength = records.length === 0;

        if (errors) {
            return <div>{errors.message}</div>
        } else if (zeroLength) {
            let NoRecordsItemProp = self.props.NoRecordsItem;
            return <NoRecordsItemProp/>
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
        return <div>No Records Returned</div>
    }
}


Table.defaultProps = {
    records: [],
    NoRecordsItem: NoRecordsItem
}


export default {
    PaginatedTable,
    Table,
    THEAD,
    TBODY,
    TH,
    TD,
    TR
}
