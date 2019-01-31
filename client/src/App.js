import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './redux/actions';
// import selectors from './redux/selectors';
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
  componentDidMount() {
    this.props.getAllProducts();
  }

  getFilteredProducts = () =>
    this.props.products.filter(product => product.name.includes(this.props.userInput));

  render() {
    const loggedIn = !isEmpty(this.props.user);
    return (
        <BrowserRouter>
          <div style={{backgroundImage: 'linear-gradient(to bottom, #f6ffff, #57899b)', textAlign: 'center', minHeight: '100vh'}}>
            <Header userInput={this.props.userInput} handleSearchChange={this.props.handleSearchChange} setFiltered={this.props.setFiltered} loggedIn={loggedIn} logOut={this.props.logOut} />
            <Switch>
              <Route path="/shop" render={props => <Products {...props} filtered={this.props.filtered} getAllProducts={this.props.getAllProducts} products={this.props.filtered ? this.getFilteredProducts() : this.props.products} loggedIn={loggedIn} cartId={this.props.user && this.props.user.current_cart && this.props.user.current_cart.id} />} />
              <Route path="/profile" render={props => <User {...props} username={this.props.user.username} loggedIn={loggedIn} />} />
              <Route path="/login" render={props => <LogIn {...props} loggedIn={loggedIn} logIn={this.props.logIn} signUp={this.props.signUp} />} />
              <Route path="/cart" render={props => <Cart {...props} loggedIn={loggedIn} cartId={this.props.user && this.props.user.current_cart && this.props.user.current_cart.id} />} />
              <Route path="/" render={props => <Home {...props} username={this.props.user.username} logOut={this.props.logOut} loggedIn={loggedIn} logIn={this.props.logIn} signUp={this.props.signUp} />} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
    );
  }
}

// something funky here
const mapStateToProps = state => {
  return {
    userInput: state.reducer.userInput,
    filtered: state.reducer.filtered,
    products: state.reducer.products,
    user: state.reducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearchChange: bindActionCreators(actions.handleSearchChange, dispatch),
    setFiltered: bindActionCreators(actions.setFiltered, dispatch),
    logOut: bindActionCreators(actions.logOut, dispatch),
    signUp: bindActionCreators(actions.signUp, dispatch),
    logIn: bindActionCreators(actions.logIn, dispatch),
    getAllProducts: bindActionCreators(actions.getAllProducts, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
