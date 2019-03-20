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
  render() {
    const {
      addToCart,
      filtered,
      getAllProducts,
      handleSearchChange,
      logIn,
      logOut,
      orderedProducts,
      products,
      removeFromCart,
      setFiltered,
      signUp,
      user,
      userInput
    } = this.props;
    const loggedIn = !isEmpty(user);
    const cartId = user && user.current_cart && user.current_cart.id;
    return (
        <BrowserRouter>
          <div style={{backgroundImage: 'linear-gradient(to bottom, #f6ffff, #57899b)', textAlign: 'center', minHeight: '100vh'}}>
            <Header style={{zIndex: 20}} userInput={this.props.userInput} handleSearchChange={handleSearchChange} setFiltered={setFiltered} loggedIn={loggedIn} logOut={logOut} orderedProducts={orderedProducts} />
            <Switch>
              <Route path="/shop" render={props => <Products {...props} addToCart={addToCart} filtered={filtered} userInput={userInput} getAllProducts={getAllProducts} products={products} loggedIn={loggedIn} cartId={cartId} />} />
              <Route path="/profile" render={props => <User {...props} username={user.username} loggedIn={loggedIn} />} />
              <Route path="/login" render={props => <LogIn {...props} loggedIn={loggedIn} logIn={logIn} signUp={signUp} />} />
              <Route path="/cart" render={props => <Cart {...props} orderedProducts={orderedProducts} loggedIn={loggedIn} removeFromCart={removeFromCart} />} />
              <Route path="/" render={props => <Home {...props} username={user.username} logOut={logOut} loggedIn={loggedIn} logIn={logIn} signUp={signUp} />} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = ({state}) => ({
  userInput: state.userInput,
  filtered: state.filtered,
  products: state.products,
  orderedProducts: state.orderedProducts,
  user: state.user
});


const mapDispatchToProps = dispatch => ({
  addToCart: bindActionCreators(actions.addToCart, dispatch),
  handleSearchChange: bindActionCreators(actions.handleSearchChange, dispatch),
  setFiltered: bindActionCreators(actions.setFiltered, dispatch),
  logOut: bindActionCreators(actions.logOut, dispatch),
  signUp: bindActionCreators(actions.signUp, dispatch),
  logIn: bindActionCreators(actions.logIn, dispatch),
  getAllProducts: bindActionCreators(actions.getAllProducts, dispatch),
  removeFromCart: bindActionCreators(actions.removeFromCart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
