// import packages
import React, { Component } from "react";
import { Picker } from 'emoji-mart';

import 'emoji-mart/css/emoji-mart.css';

class ReactionPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  
  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  
  renderReactionPicker = () => {
    const {from, msg, admin } = this.props;
    if(!admin) {
      return (<div className="reaction-picker"><button style={{'align-self':' flex-end', 'width': '50px'}} onClick={this.handleClick}> Emoji </button> {this.state.isOpen && <div className="emoji-keyboard"><Picker emojiSize={18} set="google" emoji="female-student" title="KLU World Wide" /></div>} </div>);
    }
      return <React.Fragment />
  }
 
  render() {
    return (<React.Fragment>{this.renderReactionPicker()}</React.Fragment>)
  }
}

export default ReactionPicker;
