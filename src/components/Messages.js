import React, { Component } from 'react';
import { getMessages } from '../api.js';
import "./Messages.css";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const { match: { params: { uuid } } } = this.props;

    return getMessages(uuid).then(({ messages }) => {
      this.setState({ messages })
    })
  }

  render() {
    return (
      <div className="messages">
        { this.state.messages.map((message) => (
          <div key={message.uuid}> { message.body } </div>
        ))}
      </div>
    )
  }
}

export default Messages;