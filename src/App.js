import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/RoomList';

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
    this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room) {
    this.setState({ activeRoom: room });
    const userRef = firebase.database().ref("presence/" + this.state.user.uid);
    const roomKey = room === "" ? "" : room.key;
    const roomTitle = room === "" ? "" : room.title;
    userRef.update({currentRoom: roomKey, roomName: roomTitle});
  }

  render() {
    return (
      <div className="App">
        <div className="sidenav">
          <div className="header"> Bloc Chat </div>
          <RoomList
            firebase={firebase}
            activeRoom={this.activeRoom}
          />
        </div>
        <div className="messages">
          <MessageList
            firebase={firebase}
            activeRoom={this.activeRoom}
          />
        </div>
      </div>
    );
  }
}

export default App;
