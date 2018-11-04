import React , { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
    render(){
        console.log(this.props.messages);
        return (
            <div className="message-list">
                {this.props.messages.map((message,index)=>{
                    return (
                        <Message key={index} username={message.senderId} text={message.text}></Message>
                    )
                })}
            </div>
        )
    }
}

export default MessageList;