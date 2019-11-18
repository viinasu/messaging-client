import React, { Component } from 'react';
import { getMessages } from '../api.js';
import "./Messages.css";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ""
    };
  }

  componentDidMount() {
    const { match: { params: { uuid } } } = this.props;

    return getMessages(uuid).then(({ messages }) => {
      this.setState({ messages })
    })
  }

  updateNewMessage = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  submitMessageOnEnter = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        messages: this.state.messages.concat(
          {
            uuid: Math.floor(Math.random() * 100),
            created_at: new Date(),
            direction: "outgoing",
            body: this.state.newMessage
          }),
        newMessage: ""
      });
    }
  };

  submitMessageOnSend = (e) => {
    e.preventDefault();
    const { messages, newMessage } = this.state;
    this.setState({
      messages: messages.concat(
        {
          uuid: Math.floor(Math.random() * 100),
          created_at: new Date(),
          direction: "outgoing",
          body: newMessage
        }),
      newMessage: ""
    });
  };

  render() {
    const { messages, newMessage } = this.state;
    return (
      <div className="messagesPage">
        <div className="messages">
          { messages.map((message) => (
            <div
              className={ message.direction === "outgoing" ? "message message-out" : "message message-in" }
              key={message.uuid}
            >
              <div className="messageContent">
                { message.body }
              </div>
            </div>
          ))}
        </div>
        <div className="newMessage">
          <input
            className="input-newMessage"
            type="text"
            placeholder="Type a message"
            value={ newMessage }
            onChange={ this.updateNewMessage }
            onKeyDown={ this.submitMessageOnEnter }
          />
          <button onClick={ this.submitMessageOnSend }> Send </button>
        </div>
      </div>
    )
  }
}

export default Messages;