import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import Home from './components/Home'
import HomeMain from './components/HomeMain'

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/homeMain" component={HomeMain} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
