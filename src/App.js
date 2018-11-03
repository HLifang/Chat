import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <RoomList></RoomList>
      </div>
    );
  }
}

export default App;
