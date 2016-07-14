/**
 * Created by ravi.hamsa on 6/28/16.
 */
import React, {Component} from "react";


class MessageStack extends Component {
    render(){
        return <div className="messages">
            {this.props.messages.map(function(item){
                return <li className={'bg-'+item.type}>{item.message}</li>
            })}
        </div>
    }
}

export default MessageStack;