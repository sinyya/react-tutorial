import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';

// css
import './App.css';

// components
import { Home } from "./components/templates/home/Home";

class App extends Component {
  render() {
    return (
        <Router history={history}>
          <div className="container">
            <Switch>
                <Route path="/" component={ Home } />
                {/*<Route path="*" component={Page404} />*/}
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
