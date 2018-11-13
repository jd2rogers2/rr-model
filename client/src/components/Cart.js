import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    // fetch current user's ordered products
    fetch('/carts', {
      accept: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      this.setState({products: data});
    });
  }

  render(){
    return (
      <div>
        <h1>cart page</h1>
        <ul>
          {this.state.products.map(product => {
            return (
              <li key={product.id}>
                <img src={product.image} alt={product.name} />
                <p>name: {product.name}</p>
                <p>price: {product.price}</p>
                <button onClick={() => this.addToCart(product)}>Add to Cart</button>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}

export default Cart;
