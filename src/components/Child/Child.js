/**
 * Created by ravi.hamsa on 6/22/16.
 */
import React,{Component} from "react";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Child.scss'


class ChildComponent extends Component {
    render(){
        return <div className={s.root}>Child Component {this.props.name} rendered with Style</div>
    }
}

export default withStyles(s)(ChildComponent);