import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import User from './components/User';
import Cart from './components/Cart';
import LogIn from './components/LogIn';
import Home from './components/Home';
import { isEmpty } from 'lodash';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      products: []
    }
  }

  componentDidMount() {
    // what to do if we've searched/filtered and got nothing?
    if (this.state.products.length === 0) {
      this.fetchProducts();
    }
  }

  fetchProducts = searchText => {
    // fetch('/api/v1/products', {
    let data = {
      accept: 'application/json',
      method: searchText ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (searchText) {
      data.body = {searchText};
    }
    fetch('/products',{
      ...data
    }).then(response => response.json()).then(data => {
      this.setState({products: data});
    });
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

  render() {
    const loggedIn = !isEmpty(this.state.user);
    return (
      <div>
        <BrowserRouter>
          <div style={{textAlign: 'center'}}>
            <Header loggedIn={loggedIn} logOut={this.logOut} fetchProducts={this.fetchProducts} />
            <Switch>
              <Route path="/shop" render={props => <Products {...props} products={this.state.products} loggedIn={loggedIn} cartId={this.state.user && this.state.user.current_cart && this.state.user.current_cart.id} />} />
              <Route path="/profile" render={props => <User {...props} username={this.state.user.username} loggedIn={loggedIn} />} />
              <Route path="/cart" render={props => <Cart {...props} loggedIn={loggedIn} cartId={this.state.user && this.state.user.current_cart && this.state.user.current_cart.id} />} />
              <Route path="/login" render={props => <LogIn {...props} loggedIn={loggedIn} logIn={this.logIn} signUp={this.signUp} />} />
              <Route path="/" render={props => <Home {...props} loggedIn={loggedIn} logIn={this.logIn} />} />
            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
