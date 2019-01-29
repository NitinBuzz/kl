// import packages
import React, { Component } from "react";

class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ""
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleUpdate = e => {
    this.setState({ msg: e.toString().trim() });
  };

  renderSend = () => {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.sendMessage(this.state.msg);
        // post msg to group
          }}
        >
          <input
            type="text"
            onChange={e => {
              this.handleUpdate(e.target.value);
            }}
          />
        </form>
      </div>
    );
  };

  render() {
    return <div className="">{this.renderSend()}</div>;
  }
}

export default Send;
