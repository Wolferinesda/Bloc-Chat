import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA4VWKIHkiFsOcdLoFrlgv4MBAvkJfCDrM",
  authDomain: "bloc-chat-room-25c2c.firebaseapp.com",
  databaseURL: "https://bloc-chat-room-25c2c.firebaseio.com",
  projectId: "bloc-chat-room-25c2c",
  storageBucket: "bloc-chat-room-25c2c.appspot.com",
  messagingSenderId: "648503535304"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: ""
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }



  render() {
    return (
      <div className="App">
        <div className="sidenav">
          <div className="header"> Bloc Chat </div>
          <RoomList
            firebase={firebase}
            setActiveRoom={this.setActiveRoom}
          />
        </div>
        <div className="messages">
          <MessageList
            firebase={firebase}
            setActiveRoom={this.setActiveRoom}
          />
        </div>
      </div>
    );
  }
}

export default App;
