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
      roomId:null,
      messages:[],
      joinableRooms:[],
      joinedRooms:[]
    }
    this.sendMessage=this.sendMessage.bind(this);
    this.subscribeToRoom=this.subscribeToRoom.bind(this);
    this.getRooms=this.getRooms.bind(this);
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
      this.getRooms();
    }).catch(err=>console.log('error on connecting:',err))
  }

  subscribeToRoom(roomId){
    this.setState({
      messages:[]
    });
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      messageLimit:20,
      hooks:{
        onMessage:message=>{
          this.setState({
            messages:[...this.state.messages,message]
          })
        }
      }
    }).then(room=>{
      this.setState({
        roomId:room.id
      })
      this.getRooms();
    }).catch(err=>console.log('error on subscribing to room: ',err));
  }

  getRooms(){
    this.currentUser.getJoinableRooms().then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    }).catch(err => console.log('error on joinableRooms:', err));
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId:this.state.roomId
    });
  }

  render() {
    return (
      <div className="app">
        <RoomList roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}></RoomList>
        <MessageList messages={this.state.messages}></MessageList>
        <SendMessageForm sendMessage={this.sendMessage}></SendMessageForm>
      </div>
    );
  }
}

export default App;
