import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Grid, Message } from 'semantic-ui-react'

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getAllProducts();

    // until we can find a way to tell if image is loaded
    setTimeout(() => {
      this.setState({ loading: false })
    }, 3000)
  }

  handleImageLoaded = () => {
    this.setState({loading: false});
  }

  getFilteredProducts = () =>
    this.props.products.filter(product => product.name.includes(this.props.userInput));

  render(){
    const products = this.props.filtered ? this.getFilteredProducts() : this.props.products;
    return (
      <div>
        {products.length > 0 && (
          <div style={{display: 'inline-block', background: 'none', textAlign: 'center', position: 'relative', top: '15px'}}>
            {this.props.filtered && (
              <Message
                floating
                info
                onDismiss={this.props.getAllProducts}
                header={`Found ${products.length} matches`}
                content='dismiss to clear search'
              />
            )}
            <Grid style={{paddingBottom: '50px', width: '95%', display: 'inline-flex', position: 'relative', top: '20px'}} textAlign='center' columns={3}>
              {products.map(product => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    loggedIn={this.props.loggedIn}
                    addToCart={this.props.addToCart}
                    cartId={this.props.cartId}
                    loading={this.state.loading}
                  />
                );
              })}
            </Grid>
          </div>
        )}
        {products.length < 1 && !this.state.loading && (<p>no products found</p>)}
      </div>
    )
  }
}

export default Products;
