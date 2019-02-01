import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Grid, Message } from 'semantic-ui-react'
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

  getTotal = arr =>
    arr.reduce((acc, current) =>
      acc + (current.price * current.count), 0)


  render(){
    const productArray = Object.values(this.props.orderedProducts);
    const totalPrice = this.getTotal(productArray);
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
          {productArray.map(product => {
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
        <Message info header={`total price: $${totalPrice}`} style={{width: '70%', display: 'inline-block'}} />
        {!productArray.length && (
          <Message info header='Your cart is empty.' />
        )}
      </div>
    )
  }
}

export default Cart;
