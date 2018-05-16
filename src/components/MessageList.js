import React, { Component } from 'react';

class MessageList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "home",
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
      console.log(message);
    });
  }

  createMessage(e){
    e.preventDefault();
    let newContent = this.refs.messageOfRoom.value;
    let newRoomId = this.props.setActiveRoom;
    let newSentAt = this.props.firebase.database.ServerValue.TIMESTAMP;

    this.messagesRef.push({
        content: newContent,
        roomId: newRoomId,
        sentAt: newSentAt
    });
  }

  render() {

    let message_list = this.state.messages.map( (message, index) =>
    <div key={index}>
      <p className="message-username">{message.username}</p>
      <p className="message-content">{message.content}</p>
      <p className="message-sentAt">{message.sentAt}</p>
    </div>
    )

    return(
      <div>
        <div id="message_content">
          {message_list}
        </div>
        <div id= "creating_message">
          <form onSubmit={ this.createMessage.bind(this) } >
            <label className="newMessageLabel">Create a new message: </label>
            <textarea
              ref="messageOfRoom"
              placeholder="Enter Message"
            />

            <input id="send"
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </div>
    )
  }
}

export default MessageList;
