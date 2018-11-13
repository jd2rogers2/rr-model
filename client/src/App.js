import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import User from './components/User';
import Cart from './components/Cart';
import LogIn from './components/LogIn';
import { isEmpty } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  // fetch('/users/current', {
  //   accept: 'application/json',
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }).then(response => response.json()).then(data => {
  //   this.setState({user: data});
  // });

  logOut() {}

  logIn = (username, password) => {
    const user = JSON.stringify({username, password});

    fetch('/sessions', {
        accept: 'application/json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
    }).then(response => response.json()).then(data => {
      this.setState({user: data});
    });
  }

// need catch all route to products
  render() {
    const loggedIn = !isEmpty(this.state.user);
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header loggedIn={loggedIn} logOut={this.logOut} />
            <Switch>
              <Route path="/shop" render={props => <Products {...props} loggedIn={loggedIn} />} />
              <Route path="/profile" render={props => <User {...props} username={this.state.user.username} loggedIn={loggedIn} />} />
              <Route path="/cart" render={props => <Cart {...props} loggedIn={loggedIn} />} />
              <Route path="/login" render={props => <LogIn {...props} loggedIn={loggedIn} logIn={this.logIn} />} />
            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
