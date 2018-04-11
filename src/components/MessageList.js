import React, { Component } from 'react';

class RoomList extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: "",
      content: "",
      sentAt: "",
      updatedTime: "",
      messages: [],
      newMessage: ""
    };

    this.messagesRef = this.props.firebase.database().ref('messages' + this.props.activeRoom);
  }

  componentDidMount() {
    this.messagesRef.on('value', snapshot => {
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
      this.setState({ messages: messageChanges});
    });
  }

  render() {

    let message_list = this.state.messages.map( (message, index) =>
      <p className="message-username">{message.username}</p>
      <p className="message-content">{message.content}</p>
      <p className="message-content">{message.sentAt}</p>
    )

    return(
      <div>
        {message_list}
      </div>
    )
  }
}

export default RoomList;
