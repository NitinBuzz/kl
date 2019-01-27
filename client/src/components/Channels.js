// import packages
import React, { Component } from "react";

class Channels extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleClick = channel => {
    this.props.selectChannel(channel);
  };

  renderChannels = () => {
    return (
      <div className="channelList">
        <div id="GENERAL" onClick={e => this.handleClick("GENERAL")}>
          #General
        </div>
        <div id="FED" onClick={e => this.handleClick("FED")}>
          #FED
        </div>
        <div id="CL" onClick={e => this.handleClick("CL")}>
          #CL
        </div>
        <div id="TRANSPORT" onClick={e => this.handleClick("TRANSPORT")}>
          #Transport
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderChannels()}</div>;
  }
}

export default Channels;
