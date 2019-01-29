// import packages
import React, { Component } from "react";

import Send from "./Send";

class Live extends Component {
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {}

  componentWillUnmount() {}

  renderLive = () => {
    return this.props.messages.map(({from, msg}) => {
      return (<div>{from}: {msg}</div>)
    })
  };

  render() {
    console.log(this.props.channel);
    return (
      <div className="liveContainer">
        <div>{this.renderLive()}</div>
        <Send sendMessage = {this.props.sendMessage}/>
      </div>
    );
  }
}

export default Live;
