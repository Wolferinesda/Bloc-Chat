import React, { Component } from 'react';

class MessageList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "Room 1",
      messages: [],
      newMessage: ""
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
      console.log(this.state.messages);
    });
  }

  render() {
    let message_list = this.state.messages.map( (message, index) =>

        <div key={index}>
          <p className="message-username">{message.username}</p>
          <p className="message-content">{message.content}</p>
          <p className="message-sentAt">{message.sentAt}</p>
        </div>
      
    );

    return (
      <div>
        <div id="message_content">
          {message_list}
        </div>
      </div>
    )
  }
}

export default MessageList;
