import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderedProducts: []
    }
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      return;
    }

    fetch(`/carts/${this.props.cartId}`, {
      accept: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      this.setState({orderedProducts: data ? data.ordered_products : []});
    });
  }

  removeFromCart = productId => {
    fetch(`/ordered_products/${productId}`, {
      accept: 'application/json',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      console.log(`${data.name} removed from cart with cart_id ${data.cart_id}`);
      this.setState(prevState => ({...prevState, orderedProducts: prevState.orderedProducts.filter(prod => prod.id !== data.id)}));
    });
  }

  render(){
    return !this.props.loggedIn ? (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: this.props.location }
        }}
      />
    ) : (
      <div>
        <h1>cart page</h1>
        <ul>
          {this.state.orderedProducts.map(product => {
            return (
              <li key={product.id}>
                <img src={product.image} alt={product.name} />
                <p>name: {product.name}</p>
                <p>price: {product.price}</p>
                <button onClick={() => this.removeFromCart(product.id)}>Remove from Cart</button>
              </li>
            );
          })}
        </ul>
        <p>total price: {this.state.orderedProducts.reduce((acc, current) => {
          return acc + current.price;
        }, 0)}</p>
        {!this.state.orderedProducts.length && (<p>Your cart is empty.</p>)}
      </div>
    )
  }
}

export default Cart;
