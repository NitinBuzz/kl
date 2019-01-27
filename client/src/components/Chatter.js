// import packages
import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import Channels from "./Channels";
import Live from "./Live";

let socket = {};
class Chatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "GENERAL"
    };
  }

  componentDidMount() {
     socket = socketIOClient(
      `${this.props.endpoint}/${this.state.channel}`,
      () => {
        console.log(`xxxxxxxxxxx--- `);
      }
    );
    console.log("end ", socket);
  }

  componentWillUnmount() {
    console.log("unmount");
    if (socket && socket.emit) {
      socket.emit("disconnect");
    }
  }

  selectChannel = channelToSwitch => {
    if (this.state.channel !== channelToSwitch) {
      this.setState({ channel: channelToSwitch });
    }
  };

  render() {
    return (
      <div className="">
        <div className="chatterContainer">
          <Channels selectChannel={this.selectChannel} />
          <Live channel={this.state.channel} />
        </div>
      </div>
    );
  }
}

export default Chatter;
