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
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  logOut = () => {
    this.setState({user: {}});
  }

  signUp = (username, password_digest) => {
    const user = JSON.stringify({username, password_digest});

    fetch('/users', {
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

  logIn = (username, password) => {
    const user = JSON.stringify({username, password});

    return fetch('/users/login', {
        accept: 'application/json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
    }).then(response => response.json()).then(data => {
      this.setState({user: data});
      return this.state.user;
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
              <Route path="/shop" render={props => <Products {...props} loggedIn={loggedIn} cartId={this.state.user && this.state.user.current_cart && this.state.user.current_cart.id} />} />
              <Route path="/profile" render={props => <User {...props} username={this.state.user.username} loggedIn={loggedIn} />} />
              <Route path="/cart" render={props => <Cart {...props} loggedIn={loggedIn} cartId={this.state.user && this.state.user.current_cart && this.state.user.current_cart.id} />} />
              <Route path="/login" render={props => <LogIn {...props} loggedIn={loggedIn} logIn={this.logIn} signUp={this.signUp} />} />
            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
