import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
      console.log(room);
    });
  }

  createRoom(e){
    e.preventDefault();
    if (this.state.newRoomName === ''){
      alert('Name of New Room cannot be empty');
    } else {
      this.roomsRef.push({
        name: this.state.newRoomName
      });
      e.target.reset();
    }
  }

  deleteRoom(e){
    e.preventDefault();
    const room = this.props.firebase.database().ref("rooms");
    room.remove();
  }

    handleChange(e) {
      this.setState({newRoomName: e.target.value});
    }

  render() {
    const roomForm = (

      <form onSubmit={this.createRoom}>

        <input
          type="text"
          placeholder='New room'
          value={this.props.createRoom}
          onChange={this.handleChange}
        />
        <br />
        <input
          type='submit'
          value='Create room'
        />

      </form>
    )

    let room_list = this.state.rooms.map( (room, index) =>
    <a href={room.name}>
      <li key={index}>
        {room.name}
      </li>
    </a>
    )


    return (
      <div>
        <ul className="list_of_room_names" >
          {room_list}
          {roomForm}
        </ul>
      </div>
    );
  }
}

export default RoomList;
