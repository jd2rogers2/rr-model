import React, { Component } from 'react';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    if (this.state.products.length > 0) {
      return;
    }
    // fetch('/api/v1/products', {
    fetch('/products', {
      accept: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      this.setState({products: data});
    });
    // get user's profile pages
    // if not logged in show login page
    // actually that can be abstracted to  every page, can it be done server side?
  }

  addToCart = product => {
    const orderedProduct = JSON.stringify({ordered_product: {...product} });

    fetch('/ordered_products', {
      accept: 'application/json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: orderedProduct
    }).then(response => response.json()).then(data => {
      console.log(`${data.name} added with cart_id ${data.cart_id}`);
    });
  }

  render(){
    return (
      <ul>
        {this.state.products.map(product => {
          return (
            <li key={product.id}>
              <img src={product.image} alt={product.name} />
              <p>name: {product.name}</p>
              <p>price: {product.price}</p>
              {this.props.loggedIn && (<button onClick={() => this.addToCart(product)}>Add to Cart</button>)}
            </li>
          );
        })}
      </ul>
    )
  }
}

export default Products;
