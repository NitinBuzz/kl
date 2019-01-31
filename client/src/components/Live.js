// import packages
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Send from "./Send";
import Message from "./Message";

class Live extends Component {
  constructor(props) {
    super(props);
   
  }
  
componentDidMount() {
     this.scrollToBottom();
}

componentDidUpdate() {
     this.scrollToBottom();
}
  
  scrollToBottom() {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }


  renderLive = () => {
     if (this.props.render) {
      return this.props.messages.map(({from, msg, room, admin}) => {
        if (room === this.props.channel) {
              return <Message from={from} msg={msg} admin={admin} />
            }
      })
    } else {
      return <React.Fragment />
    }
  };

  render() {
//     console.log(this.props.channel);
    return (
      <div className="liveContainer">
        <div ref={(el) => { this.messagesContainer = el; }} className="live-chatbox">{this.renderLive()}</div>
        <Send render={this.props.render} sendMessage = {this.props.sendMessage}/>
      </div>
    );
  }
}

export default Live;
