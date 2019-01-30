import React, { Component } from 'react';
import { Grid, Image, Message, Placeholder } from 'semantic-ui-react'

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // get user's profile pages
    // if not logged in show login page
    // actually that can be abstracted to every page, can it be done server side?

    // until we can find a way to tell if image is loaded
    setTimeout(() => {
      this.setState({ loading: false })
    }, 3000)
  }

  addToCart = ({name, price, image}) => {
    const orderedProduct = JSON.stringify({ ordered_product: {name, price, image, cart_id: this.props.cartId} });

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

  handleImageLoaded = () => {
    this.setState({loading: false});
  }

  render(){
    const { loading } = this.state;
    return this.props.products.length > 0 ? (
      <div style={{display: 'inline-block', background: 'none', textAlign: 'center', position: 'relative', top: '15px'}}>
        {this.props.filtered && (
          <Message
            floating
            info
            onDismiss={this.props.getAllProducts}
            header={`Found ${this.props.products.length} matches`}
            content='dismiss to clear search'
          />
        )}
        <Grid style={{paddingBottom: '50px', width: '95%', display: 'inline-flex', position: 'relative', top: '20px'}} textAlign='center' columns={3}>
          {this.props.products.map(product => {
            return (
              <div key={product.id} style={{paddingBottom: '10px'}}>
                <Grid.Column>
                  {loading ? (
                    <Placeholder style={{ height: 298, width: 298 }}>
                      <Placeholder.Image />
                    </Placeholder>
                  ) : (
                    <Image
                      src={product.image}
                      centered
                      size='medium'
                      bordered
                      alt={product.name}
                    />
                  )}
                </Grid.Column>
                <Message color='grey' attached='bottom'>
                  <Message.Header>{product.name}</Message.Header>
                  <p>${product.price}</p>
                  {this.props.loggedIn ? (
                    <button onClick={() => this.addToCart(product)}>Add to Cart</button>
                  ) : (
                    <span>log in to add to cart</span>
                  )}
                </Message>
              </div>
            );
          })}
        </Grid>
      </div>
    ) : (
      <p>no products found</p>
    )
  }
}

export default Products;
