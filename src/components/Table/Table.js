/**
 * Created by ravi.hamsa on 7/4/16.
 */
import React, {PropTypes, Component} from "react";
import core from '../../core';
const {cloneChildren} = core.utils


class TH extends Component {

    render() {
        return <th>{this.props.label}</th>
    }
}


class TD extends Component {

    render() {
        let self = this;
        let props = self.props;
        let {record, recordIndex, dataKey} = props;
        return <td>{record[dataKey]}</td>

    }
}




class TR extends Component {
    render() {
        let self = this;
        let props = self.props;
        let {records, record} = props;
        let children = cloneChildren(this.props.children, {records, record})
        return <tr>{children}</tr>;
    }
}

class THEAD extends Component {
    render() {
        let self = this;
        let children = cloneChildren(this.props.children, {})
        return <thead>{children}</thead>;
    }
}

class TBODY extends Component {
    render() {
        let self = this;
        let props = self.props;
        let {records} = props;
        let children = records.map(function (record, recordIndex) {
            return cloneChildren(this.props.children, {records, record, recordIndex, key:recordIndex})
        },this)
        return <tbody>{children}</tbody>;
    }
}


class Table extends Component {

    render() {
        let self = this;
        let props = self.props;
        let {records, errors} = props;
        let zeroLength = records.length === 0;

        if(errors){
            return <div>{errors.message}</div>
        }else if(zeroLength){
            return <div>Not Fields Returned, Select another App</div>
        }

        let children = cloneChildren(this.props.children, { records})
        return <table className="table">{children}</table>;
    }
}

Table.propTypes = {
    records: PropTypes.array.isRequired
}




export default {
    Table,
    THEAD,
    TBODY,
    TH,
    TD,
    TR
}