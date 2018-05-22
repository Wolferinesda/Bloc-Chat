import React, { Component } from 'react';

class MessageList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      newContent: "",
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.messagesRef.on('child_removed', snapshot  => {
      this.setState({ messages: this.state.messages.filter( message => message.key !== snapshot.key )  })
    });


  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
      console.log(this.state.newMessage);
    });
  }

  createMessage(e){
    e.preventDefault();
    if (this.state.newContent === "") {
      alert('Message field cannot be empty');
    } else {
      var date = new Date()
      this.messagesRef.push({
        username: this.props.currentUser ? this.props.currentUser.displayName : "Guest",
        content: this.state.newContent,
        roomId: this.props.currentRoom,
        sentAt: [
                    date.getMonth()+1 + "/",
                    date.getDate()+ "/",
                    date.getFullYear() + "  ",
                    date.getHours() + ":",
                    date.getMinutes()+ ":",
                    date.getSeconds(),
                ]
      });
      e.target.reset();
      this.setState({newContent: ""});
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({newContent: e.target.value});
  }

  removeMessage(message, e) {
    e.preventDefault();
    this.messagesRef.child(message.key).remove();
  }

  render() {


    let message_list = this.state.messages.filter(message => message.roomId === this.props.currentRoom).map( (message, index) =>
        <div key={index}>
          <p className="message-username">{message.username}</p>
          <p className="message-content">{message.content}</p>
          <p className="message-sentAt">{message.sentAt}</p>
          <button id="Delete-Button" onClick={ (e) => this.removeMessage(message, e) } className=" remove-room-button">&times;</button>
          <br />
        </div>
    );

    return (
      <div>
        <div id="message_content">
          {message_list}
          {console.log(this.state)}
        </div>
        <div id= "creating_message">
          <form onSubmit={ this.createMessage } >
            <label className="newMessageLabel">Create a new message: </label>
            <textarea
              ref="messageOfRoom"
              placeholder="Enter Message"
              onChange={this.handleChange}
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
