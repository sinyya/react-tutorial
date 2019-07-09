import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

// css
import './App.css';

// components
import Home from './components/Home'
import HomeMain from './components/HomeMain'

class App extends Component {
  render() {
    return (
        <Router history={history}>
          <div className="container">
              <div className="app_version">
                  <span className="web">WebApp ver : MainApp : Ver 0.0.1 LiveServer #React CSS TEST</span>
              </div>
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
