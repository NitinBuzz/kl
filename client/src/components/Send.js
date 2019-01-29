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
    if (this.props.render) {
      return (
        <div className="form">
        <div className="hrx" />
          <form
            onSubmit={e => {
              e.preventDefault();
              if (this.state.msg.trim().length > 1){
               this.props.sendMessage(this.state.msg);
               this.setState({ msg: ''})
              } else {
                this.setState({ msg: ''})
              }

          // post msg to group
            }}
          >
            <input
              className="message-input"
              type="text"
              required
              placeholder="Message"
              value={this.state.msg}
              minLength={2}
              onChange={e => {
                this.handleUpdate(e.target.value);
              }}
            />
          </form>
        </div>
      );
    } else {
      return <React.Fragment />
    }
  };

  render() {
    return <div className="">{this.renderSend()}</div>;
  }
}

export default Send;
