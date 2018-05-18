import React, { Component } from 'react';

class User extends Component{

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(){
    this.props.firebase.auth().signOut();
  }


  render() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    let signInButton = <button id="logIn" onClick={() => this.signIn(provider)}> Sign In </button>;
    let signOutButton = <button id="logOut" onClick={() => this.signOut()}> Sign Out </button>;

    return(
      <div>
        <div id="currentUser">
          Welcome { this.props.currentUser ? this.props.currentUser.displayName : "Guest" }!
        </div>
        {signInButton}
        {signOutButton}
      </div>
    )
  }
}

export default User;
