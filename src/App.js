import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import history from './lib/history'

// css
import './App.css';

// components
import { Home, HomeMain, Page404} from './routes'

// lib
import csApi from './lib/api/csApi'

class App extends Component {
  render() {
    return (
        <Router history={history}>
          <div className="container">
            <Switch>
                <Route path={`${process.env.PUBLIC_URL}index.html`} component={Home} />
                <Route exact path={`${process.env.PUBLIC_URL}homeMain`} component={HomeMain} />
                <Route path="*" component={Page404} />
            </Switch>
          </div>
        </Router>
    );
  }
    componentDidMount(){
        console.log("componentDidMount");
        csApi.responseStartApp("onLoad");
    }
}

export default App;
