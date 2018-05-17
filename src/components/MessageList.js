import React, { Component } from 'react';

class MessageList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }


  render() {


    let message_list = this.state.messages.filter(message => message.roomId === this.props.activeRoom).map( (message, index) =>
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
          {console.log(this.state)}
        </div>
      </div>
    )
  }
}

export default MessageList;
