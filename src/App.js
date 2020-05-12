import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import history from './utils/history'

// css
import './App.css';

// components
// import { Home, HomeMain, Page404} from './routes'

class App extends Component {
  render() {
    return (
        <Router history={history}>
          <div className="container">
            <Switch>
                {/*<Route path={`${process.env.PUBLIC_URL}index.html`} component={Home} />*/}
                {/*<Route exact path={`${process.env.PUBLIC_URL}homeMain`} component={HomeMain} />*/}
                {/*<Route path="*" component={Page404} />*/}
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
