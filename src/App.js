import React, { Component } from 'react';
import RoomList from './components/RoomList';
import Message from './components/Message';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <RoomList></RoomList>
        <Message></Message>
      </div>
    );
  }
}

export default App;
