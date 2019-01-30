import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Grid } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderedProducts: [],
      loading: true
    }
  }

  componentDidMount() {
    this._isMounted = true;

    // until we can find a way to tell if image is loaded
    setTimeout(() => {
      this.setState({ loading: false })
    }, 3000)

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
      if (this._isMounted) {
        this.setState({orderedProducts: data ? data.ordered_products : []});
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      <div style={{display: 'inline-block', background: 'none', textAlign: 'center', position: 'relative', top: '15px'}}>
        <Grid style={{paddingBottom: '50px', width: '95%', display: 'inline-flex', position: 'relative', top: '20px'}} textAlign='center' columns={3}>
          {this.state.orderedProducts.map(product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                showAtc={false}
                loggedIn={this.props.loggedIn}
                loading={this.state.loading}
                removeFromCart={this.removeFromCart}
              />
            );
          })}
        </Grid>
        <p>total price: {this.state.orderedProducts.reduce((acc, current) => {
          return acc + current.price;
        }, 0)}</p>
        {!this.state.orderedProducts.length && (<p>Your cart is empty.</p>)}
      </div>
    )
  }
}

export default Cart;
