import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Grid } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      <div style={{display: 'inline-block', background: 'none', textAlign: 'center', position: 'relative', top: '15px', marginBottom: '75px'}}>
        <Grid style={{paddingBottom: '50px', width: '95%', display: 'inline-flex', position: 'relative', top: '20px'}} textAlign='center' columns={3}>
          {Object.values(this.props.orderedProducts).map(product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                showAtc={false}
                loggedIn={this.props.loggedIn}
                loading={this.state.loading}
                removeFromCart={this.props.removeFromCart}
                count={product.count}
              />
            );
          })}
        </Grid>
        <p>total price: {Object.values(this.props.orderedProducts).reduce((acc, current) => {
          return acc + (current.price * current.count);
        }, 0)}</p>
        {!this.props.orderedProducts.length && (<p>Your cart is empty.</p>)}
      </div>
    )
  }
}

export default Cart;
