import React, { Component } from 'react';

class RoomList extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      messages: [],
      newMessage: ""
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      messagesRef.on('value', snapshot => {
      const messageChanges = [];
      snapshot.forEach((message) => {
          messageChanges.push({
            key: message.key,
            username: message.val().username,
            content: message.val().content,
            sentAt: message.val().sentAt,
            updatedTime : message.val().updatedTime
          });
        }
      });
    }
  }

  render() {

    return(
      <div>

      </div>
    )
  }
}

export default RoomList;
