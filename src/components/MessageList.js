import React, { Component } from 'react';

class RoomList extends Component{

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
      console.log(message);
    });
  }

  render() {

    return(
      <div>
      
      </div>
    )
  }
}

export default RoomList
