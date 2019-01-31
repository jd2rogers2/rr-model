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
      products: [],
      filtered: false,
      userInput: ''
    }

    // server session clearing on refresh :(
    // if (window.performance && performance.navigation.type === 1 && isEmpty(this.state.user)) {
    //   this.getSessionUser();
    // }
  }

  componentDidMount() {
    // what to do if we've searched/filtered and got nothing?
    if (this.state.products.length === 0) {
      this.getAllProducts();
    }
  }

  // getSessionUser = () => {
  //   fetch('/sessions', {
  //     accept: 'application/json',
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(response => response.json()).then(data => {
  //     this.setState({user: data});
  //   });
  // }

  handleSearchChange = event => {
    this.setState({
      userInput: event.target.value,
      filtered: false
    });
  }

  getAllProducts = () => {
    // fetch('/api/v1/products', {
    fetch('/products', {
      accept: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      this.setState({products: data, filtered: false, userInput: ''});
    });
  }

  setFiltered = () => {
    this.setState({filtered: true});
  }

  getFilteredProducts = () => {
    return this.state.products.filter(product => product.name.includes(this.state.userInput));
    // old server side filter
    // const keyword = JSON.stringify({user_input: this.state.userInput});
    // fetch('/products/search',{
    //   accept: 'application/json',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: keyword
    // }).then(response => response.json()).then(data => {
    //   // if (data.length) { to do
    //   this.setState({products: data, filtered: true});
    // });
  }

  // credentials: 'include'

  logOut = () => {
    fetch('/sessions', {
        accept: 'application/json',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(data => {
      this.setState({user: {}});
    });
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

    return fetch('/sessions', {
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
        <BrowserRouter>
          <div style={{backgroundImage: 'linear-gradient(to bottom, #f6ffff, #57899b)', textAlign: 'center', minHeight: '100vh'}}>
            <Header userInput={this.state.userInput} handleSearchChange={this.handleSearchChange} setFiltered={this.setFiltered} loggedIn={loggedIn} logOut={this.logOut} />
            <Switch>
              <Route path="/shop" render={props => <Products {...props} filtered={this.state.filtered} getAllProducts={this.getAllProducts} products={this.state.filtered ? this.getFilteredProducts() : this.state.products} loggedIn={loggedIn} cartId={this.state.user && this.state.user.current_cart && this.state.user.current_cart.id} />} />
              <Route path="/profile" render={props => <User {...props} username={this.state.user.username} loggedIn={loggedIn} />} />
              <Route path="/login" render={props => <LogIn {...props} loggedIn={loggedIn} logIn={this.logIn} signUp={this.signUp} />} />
              <Route path="/cart" render={props => <Cart {...props} loggedIn={loggedIn} cartId={this.state.user && this.state.user.current_cart && this.state.user.current_cart.id} />} />
              <Route path="/" render={props => <Home {...props} username={this.state.user.username} logOut={this.logOut} loggedIn={loggedIn} logIn={this.logIn} signUp={this.signUp} />} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
