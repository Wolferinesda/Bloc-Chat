import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );

  }

  render(){

    signIn() {
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup(provider).then((result) => {
        const user = result.user;
        this.props.setUser(user);
      });
    }

    signOut() {
      this.props.firebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
          const userRef = this.props.firebase.database().ref("presence/" + user.uid);
          userRef.update({isOnline: false, currentRoom: "", roomName: ""});
        }
      });
      this.props.firebase.auth().signOut().then(() => {
        this.props.setUser(null);
      });
    }

    componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      });
    }

    return (
      <div className="login-section">
        <button id="Sign-In" onClick={ () => this.props.firebase.auth().signInWithPopup( provider ); }></button>
        <button id="Sign-Out" onClick={ () => this.props.firebase.auth().signOut(); }></button>
      </div>
    )
  }
}

export default User;
