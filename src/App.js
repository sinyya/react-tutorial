import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// css
import './App.css';

// history
import history from './history'

// components
import Home from './components/Home'
import HomeMain from './components/HomeMain'

class App extends Component {
  render() {
    return (
        <Router history={history} forceRefresh={true}>
          <div class="container">
              <div class="app_version">
                  <span class="web">WebApp ver : MainApp : Ver 0.0.1 LiveServer #React CSS TEST</span>
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
