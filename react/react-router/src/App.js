import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route }  from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Link to="/"  > Home</Link>{' '}
            <Link to="/about">About</Link>{' '}
            <Link to="/contact">Contact</Link>{' '}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact"
                render={() => <h1>Contact address</h1>} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export class About extends Component {
  render() {
    return (
      <div>
        <h1>About</h1>
      </div>
    );
  }
}


export default App;
