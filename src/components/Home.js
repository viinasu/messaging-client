import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from  "moment";

import './Home.css';
import profileImage from '../assets/default-profile.jpeg';

import { getConversations } from '../api.js';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      conversations: [],
      searchTerm: ""
    };
  }

  componentDidMount() {
    getConversations().then((data) => {
      this.setState({ conversations: data.sort(this.sortByCreatedAt) });
    });
  }

  sortByCreatedAt = (a, b) => {
    return new Date(b.last_message.created_at) - new Date(a.last_message.created_at);
  };

  filterBySearchTerm = (conversation) => {
    if(this.state.searchTerm !== "") {
      return conversation.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1;
    }
    return true;
  };

  updateSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    const { conversations } = this.state;
    return (
      <div>
        <h1 className="title">Inbox</h1>
        <div>
          <input
            className="input-searchTerm"
            type="text"
            placeholder="Search for a conversation"
            value={ this.state.searchTerm }
            onChange={ this.updateSearchTerm }
          />
        </div>
        <div className="conversations">
          { conversations.filter(this.filterBySearchTerm).map((conversation) => (
            <div className="conversation" key={ conversation.uuid }>
              <Link to={`/messages/${conversation.uuid}`}>
                <div className="conversation-leftCol">
                  <div className="conversation-photo"> <img src={ profileImage } alt="default profile"/> </div>
                </div>
                <div className="conversation-rightCol">
                  <div className="conversation-rightCol-top">
                    <div className="conversation-name"> { conversation.name } </div>
                    <div className="conversation-time"> { moment(new Date(conversation.last_message.created_at)).fromNow() } </div>
                  </div>
                  <div className="conversation-rightCol-bottom">
                    <div className="conversation-preview">
                      <span className="conversation-speaker"> { conversation.last_message.direction === "outgoing" ? "You:" : "" } </span>
                      { conversation.last_message.body }
                    </div>
                    { conversation.unread > 0 ? <div className="conversation-unreadCount"> { conversation.unread } </div> : <div> </div> }
                  </div>
                </div>
              </Link>
            </div>
          )) }
        </div>
      </div>
    );
  }
}

export default Home;
