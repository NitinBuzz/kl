// import packages
import React, { Component } from "react";
import ReactionPicker from "./ReactionPicker";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

 
  render() {
    const {from, msg, admin } = this.props;
    return (<div><div key={from+msg} className={admin ? "admin-message" : "message" }><span className={admin ? "admin-message-from" : "message-from" }>{from}:</span> <p className="message-text"><div>{msg}</div><ReactionPicker from={from} msg={msg} admin={admin}/></p></div><div className="hrx-xs"/></div>)
            }
}

export default Message;
