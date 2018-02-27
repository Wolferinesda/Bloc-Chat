import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <div class="sidenav">
          <RoomList
            firebase={firebase}
          />
        </div>
      </div>
    );
  }
}

export default App;
