// import packages
import React, { Component } from "react";

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels : ['GENERAL', 'FED', 'CL', 'TRANSPORT', 'CONVO `19',]
    }
    
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleClick = channel => {
    this.props.selectChannel(channel);
  };

renderChannelList = () => {
 let list = this.state.channels.map((item) => {
    return <div key={item} className="channel-name" onClick={e => this.handleClick(item)}><span className="channel-hash">#</span><span className="channel-text">{item}</span></div>
   });
  return list;
}

  renderChannels = () => {
    return (
      <div className="channelList">
        <div className="channels-head">Channels</div>
           {this.renderChannelList()}
      </div>
    );
  };

  render() {
    return <div>{this.renderChannels()}</div>;
  }
}

export default Channels;
