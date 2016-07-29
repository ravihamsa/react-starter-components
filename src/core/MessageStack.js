/**
 * Created by ravi.hamsa on 6/28/16.
 */
import React, {Component} from "react";


let classMapping = {
    error: 'danger'
}

class MessageStack extends Component {
    render() {
        return <div className="messages">
            {this.props.messages.map(function (item, index) {
                return <p className={'bg-' + (classMapping[item.type] || item.type)} key={index}>{item.message}</p>
            })}
        </div>
    }
}

MessageStack.defaultProps = {
    messages: []
}

export default MessageStack;