/**
 * Created by ravi.hamsa on 6/22/16.
 */
import React,{Component} from "react";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NameList.scss'


class NameList extends Component {
    render(){

        let names = this.props.names.map(function(nameObject, index){
            return <li key={index}>{nameObject.name}</li>
        })

        return <ul>
            {names}
        </ul>
    }
}

export default withStyles(s)(NameList);