import React, { Component } from 'react';
import {ChatManager,TokenProvider } from '@pusher/chatkit-client';

import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import NewRoomForm from './components/NewRoomForm';

import './App.css';
import { tokenUrl,instanceLocator } from './config';

class App extends Component {

  constructor(){
    super();
    this.state = {
      roomId:null,
      messages:[],
      joinableRooms:[],
      joinedRooms:[],
      userIds:[]
    }
    this.sendMessage=this.sendMessage.bind(this);
    this.subscribeToRoom=this.subscribeToRoom.bind(this);
    this.getRooms=this.getRooms.bind(this);
    this.createRoom=this.createRoom.bind(this);
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
      this.getUserIds();
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

  getUserIds(){
    const currentRoom = this.state.joinedRooms.filter((joinedRoom)=>joinedRoom.id === this.state.roomId)[0];
    this.setState({
      userIds:currentRoom.userIds
    });
  }
  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId:this.state.roomId
    });
  }

  createRoom(name){
    this.currentUser.createRoom({
       name
    }).then(room=>this.subscribeToRoom(room.id))
    .catch(err=>console.log('error with createRoom: ',err))
  }

  render() {
    return (
      <div className="app">
        <RoomList 
          roomId={this.state.roomId}
          userIds={this.state.userIds}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}></RoomList>
        
        <MessageList 
          roomId={this.state.roomId}
          messages={this.state.messages}></MessageList>
        <SendMessageForm 
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage}></SendMessageForm>
        <NewRoomForm createRoom={this.createRoom}></NewRoomForm>
      </div>
    );
  }
}

export default App;
