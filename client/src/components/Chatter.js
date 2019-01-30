// import packages
import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import axios from "axios";
import Channels from "./Channels";
import Live from "./Live";

const socket = io('https://kluworldwide.herokuapp.com');
class Chatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "GENERAL",
      oldChannel: "",
      messages: [],
      shouldRender: false,
      name: '',
      showModel: false,
    };
  }

  componentDidMount() {
//     socket = socketIOClient(this.props.endpoint);
//     var socket = io();
//     socket = io();
      if(localStorage.getItem('x-name')) {
        
        this.setState({ name: localStorage.getItem('x-name')}, () => {
          this.setState({ shouldRender: true }, () => {
            this.initClientJoin();
          });
        });
      } else {
        this.setState({ showModel: true});
      }
  }
  
  initClientJoin = () => {
//     socket = socketIOClient(this.props.endpoint);
    socket.on('newMessage', message =>  {
      this.updateLive(message);
    }); 
    socket.emit('join', {name: this.state.name, room: this.state.channel}); 
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
    socket.emit('createMessage', {room:this.state.channel ,from: this.state.name, msg: text})
  }
  
  updateLive = (newOne) => {
    let messagesX = this.state.messages;
    messagesX.push(newOne);
    this.setState({
      messages: messagesX
    })
  }
  
   closeModal = () => {
    this.setState({
      showModel: false,
      name: ''
    });
  }
  
   renderModal = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              this.closeModal();
            }}
          >
            &times;
          </span>
          <p>Provide Your Name</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (this.state.name.length > 3) {
                 localStorage.setItem('x-name', this.state.name);
                 this.closeModal();
                 this.setState({ shouldRender: true, name: localStorage.getItem('x-name')}, () => {
                  this.initClientJoin();
                }) 
              }
            }}
          >
            Name:
            <br />
            <input
              type="text"
              name="name"
              minLength={4}
              required
              onChange={e => {this.setState({name: e.target.value.trim()})}}
              autocomplete="off"
              value={this.state.name}
            />
            <br /> <br />
            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="">
        {this.state.showModel && this.renderModal()}
        <div className="chatterContainer">
          <Channels render={this.state.shouldRender} selectChannel={this.selectChannel} />
          <Live render={this.state.shouldRender} messages={this.state.messages} channel={this.state.channel} updateLive={this.updateLive} sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}

export default Chatter;
