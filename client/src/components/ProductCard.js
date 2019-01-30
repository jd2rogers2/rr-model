import React from 'react';
import { Grid, Image, Message, Placeholder } from 'semantic-ui-react'

const ProductCard = ({product, loggedIn, addToCart, loading, removeFromCart}) => (
  <div style={{paddingBottom: '10px'}}>
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
      {loggedIn && addToCart && (
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      )}
      {!loggedIn && addToCart && (
        <span>log in to add to cart</span>
      )}
      {loggedIn && removeFromCart && (
        <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
      )}
    </Message>
  </div>
);

export default ProductCard;
