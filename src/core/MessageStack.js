/**
 * Created by ravi.hamsa on 6/28/16.
 */
import React, {Component} from "react";


class MessageStack extends Component {
    render(){
        return <div className="messages">
            {this.props.messages.map(function(item, index){
                return <li className={'bg-'+item.type} key={index}>{item.message}</li>
            })}
        </div>
    }
}

MessageStack.defaultProps = {
    messages:[]
}

export default MessageStack;