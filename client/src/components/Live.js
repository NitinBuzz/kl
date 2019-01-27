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
    return (
      <div>
        <p> Good Morning </p>
        <p> Drill planned today </p>
        {true && true && <p>123</p> && (
          <span>
            <p>hii</p>OK
          </span>
        )}
        <p> Good Morning </p>
        <p> Drill planned today </p>
      </div>
    );
  };

  render() {
    console.log(this.props.channel);
    return (
      <div className="liveContainer">
        {this.renderLive()}
        <Send />
      </div>
    );
  }
}

export default Live;
