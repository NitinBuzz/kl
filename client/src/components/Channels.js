// import packages
import React, { Component } from "react";

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels : ['GENERAL', 'FED', 'CL', 'B SCHOLL', 'TRANSPORT', 'INTERNSHIP', 'CONVO `19', 'German Visa', 'Canada', 'JOBS', 'CODE', 'HOLIDAYS']
    }
    
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleClick = channel => {
    this.props.selectChannel(channel);
  };

renderChannelList = () => {
 let list = this.state.channels.map((item) => {
    return <div key={item} className={item === this.props.currentChannel ? "current-channel channel-name" : "channel-name" } onClick={e => this.handleClick(item)}><span className="channel-hash">#</span><span className="channel-text">{item}</span></div>
   });
  return list;
}

  renderChannels = () => {
    if (this.props.render) {
      return (
        <div className="channelList">
          <div className="channels-head">Channels</div>
             {this.renderChannelList()}
        </div>
      );
    } else {
      return <React.Fragment />
    }
  };

  render() {
    return <div>{this.renderChannels()}</div>;
  }
}

export default Channels;
