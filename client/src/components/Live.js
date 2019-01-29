// import packages
import React, { Component } from "react";
import ReactDOM from "react-dom";

import Send from "./Send";

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
    return this.props.messages.map(({from, msg}) => {
      return (<div key={from+msg} className="message"><span className="message-from">{from}:</span> <p className="message-text">{msg}</p></div>)
    })
  };

  render() {
//     console.log(this.props.channel);
    return (
      <div className="liveContainer">
        <div ref={(el) => { this.messagesContainer = el; }} className="live-chatbox">{this.renderLive()}</div>
        <Send sendMessage = {this.props.sendMessage}/>
      </div>
    );
  }
}

export default Live;
