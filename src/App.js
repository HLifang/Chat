import React, { Component } from 'react';
import {ChatManager,TokenProvider } from '@pusher/chatkit-client';

import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';

import './App.css';
import { tokenUrl,instanceLocator } from './config';

class App extends Component {

  constructor(){
    super();
    this.state = {
      messages:[]
    }
    this.sendMessage=this.sendMessage.bind(this);
  }
  componentDidMount(){
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'Lifang',
      tokenProvider: new TokenProvider({
        url:tokenUrl
      })
    })

    chatManager.connect().then(currentUser=>{
      this.currentUser=currentUser;

      this.currentUser.subscribeToRoom({
        roomId: '20162638',
        messageLimit:20,
        hooks:{
          onMessage:message=>{
            this.setState({
              messages:[...this.state.messages,message]
            })
          }
        }
      })
    })
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId:'20162638'
    });
  }

  render() {
    return (
      <div className="app">
        <RoomList></RoomList>
        <MessageList messages={this.state.messages}></MessageList>
        <SendMessageForm sendMessage={this.sendMessage}></SendMessageForm>
      </div>
    );
  }
}

export default App;
