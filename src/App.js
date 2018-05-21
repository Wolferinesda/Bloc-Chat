import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      activeRoom: "",
      activeUser: null
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room.name });
    console.log(this.state.activeRoom)
  }

  setUser(user) {
    this.setState({ activeUser: user });
  }

  render() {
    return (
      <div className="App">
        <div className="sidenav">
          <div className="header"> Bloc Chat </div>
          <RoomList
            firebase={firebase}
            setActiveRoom={this.setActiveRoom}
            currentRoom={this.state.activeRoom}

          />
        </div>
        <div className="userButtons">
          <User
            firebase={firebase}
            setUser={this.setUser}
            currentUser={this.state.activeUser}
          />
        </div>
        <div className="messages">
          <MessageList
            firebase={firebase}
            setActiveRoom={this.setActiveRoom}
            currentRoom={this.state.activeRoom}
            setUser={this.setUser}
            currentUser={this.state.activeUser}
          />

        </div>
      </div>
    );
  }
}

export default App;
