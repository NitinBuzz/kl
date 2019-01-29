// import packages
import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import axios from "axios";
import Channels from "./Channels";
import Live from "./Live";

let socket = {};
class Chatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "GENERAL",
      oldChannel: "",
      messages: [],
    };
  }

  componentDidMount() {
    socket = socketIOClient(this.props.endpoint);
//     console.log("end ", socket);
//     this.setState({messages: this.props.messages})
    this.initClientJoin();
    socket.on('newMessage', message =>  {
//       console.log(`got a message from server ${JSON.stringify(message)}`);
      this.updateLive(message);
     });     
  }
  
  initClientJoin = () => {
    socket.emit('join', {name: this.props.name, room: this.state.channel}); 
    axios.post("/getRecords" , {room: this.state.channel}).then(response => {
//       console.log(`resp --- ${JSON.stringify(response.data)}`);
       this.setState({messages: response.data})
     });
  }

  componentWillUnmount() {
//     console.log("unmount");
    if (socket && socket.emit) {
      socket.emit("disconnect");
    }
  }

  selectChannel = channelToSwitch => {
    if (this.state.channel !== channelToSwitch) {
        this.setState({ oldChannel : this.state.channel }, () => {
          this.setState({ channel: channelToSwitch }, () => {
            this.initClientJoin();
          });
      });
      
    }
  };

  sendMessage = (text) => {
    console.log(text)
    socket.emit('createMessage', {room:this.state.channel ,from: this.props.name, msg: text})
  }
  
  updateLive = (newOne) => {
    let messagesX = this.state.messages;
    messagesX.push(newOne);
    this.setState({
      messages: messagesX
    })
  }

  render() {
    return (
      <div className="">
        <div className="chatterContainer">
          <Channels selectChannel={this.selectChannel} />
          <Live messages={this.state.messages} channel={this.state.channel} updateLive={this.updateLive} sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}

export default Chatter;
