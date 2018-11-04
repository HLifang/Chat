import React, { Component } from 'react';
import {ChatManager,TokenProvider } from '@pusher/chatkit-client';

import RoomList from './components/RoomList';
import Message from './components/Message';
import MessageList from './components/MessageList';
import './App.css';

import { tokenUrl,instanceLocator } from './config';

class App extends Component {

  constructor(){
    super();
    this.state = {
      messages:[]
    }
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
      currentUser.subscribeToRoom({
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

  render() {
    return (
      <div className="app">
        <RoomList></RoomList>
        <Message></Message>
        <MessageList messages={this.state.messages}></MessageList>
      </div>
    );
  }
}

export default App;
