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

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      messagesRef.on('value', snapshot => {
      const messageChanges = [];
      snapshot.forEach((message) => {
          this.setState({
            key: messagesRef.key,
            username: messagesRef.val().username,
            content: messagesRef.val().content,
            sentAt: messagesRef.val().sentAt,
            updatedTime : messagesRef.val().updatedTime
          });
        }
      });
    }
  }

  render() {

    let message_list = this.state.messages.map( (message, index) =>
      <span id="message-information">{ message.username } { message.content } { message.sentAt }</span>
    )

    return(
      <div>
        {message_list}
      </div>
    )
  }
}

export default RoomList;
