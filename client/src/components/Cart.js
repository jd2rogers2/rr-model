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
    // fetch current user's ordered ordered_products
    fetch('/carts/1', {
      accept: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      this.setState({orderedProducts: data.ordered_products});
    });
  }

  removeFromCart(product) {}

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
                <button onClick={() => this.removeFromCart(product)}>Remove from Cart</button>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}

export default Cart;
