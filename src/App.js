import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Home from './components/Home';
import Messages from './components/Messages';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="page">
          <Switch>
            <Route path="/messages/:uuid" component={ Messages }/>
            <Route exact path="/" component={ Home }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
