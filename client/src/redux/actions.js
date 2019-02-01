const handleSearchChange = event => ({
  type: 'HANDLE_SEARCH_CHANGE',
  payload: event && event.target && event.target.value
});

const setFiltered = () => ({
  type: 'SET_FILTERED'
});

const logOut = () => {
  return dispatch => {
    return fetch('/sessions', {
      accept: 'application/json',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      dispatch({type: 'LOG_OUT'});
    });
  }
};

const signUp = (username, password_digest) => {
  const user = JSON.stringify({username, password_digest});
  return dispatch => {
    return fetch('/users', {
      accept: 'application/json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: user
    }).then(response => response.json()).then(data => {
      dispatch({type: 'SET_USER', payload: data});
      dispatch(fetchOrderedProductsByCartId(data.current_cart.id));
    });
  }
};

const logIn = (username, password) => {
  const user = JSON.stringify({username, password});
  return dispatch => {
    return fetch('/sessions', {
      accept: 'application/json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: user
    }).then(response => response.json()).then(data => {
      dispatch({type: 'SET_USER', payload: data})
      dispatch(fetchOrderedProductsByCartId(data.current_cart.id));
    });
  }
};

const getAllProducts = () => {
  return dispatch => {
  // fetch('/api/v1/products', {
    return fetch('/products', {
      accept: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      dispatch({type: 'SET_PRODUCTS', payload: data});
    });
  }
};

const fetchOrderedProductsByCartId = id => {
  return dispatch => {
    return fetch(`/carts/${id}`, {
      accept: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      dispatch({type: 'SET_ORDERED_PRODUCTS', payload: data ? data.ordered_products : []});
    });
  }
};

const removeFromCart = productId => {
  return dispatch => {
    return fetch(`/ordered_products/${productId}`, {
      accept: 'application/json',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      dispatch({type: 'DELETE_ORDERED_PRODUCT', payload: productId});
      console.log(`${data.name} removed from cart with cart_id ${data.cart_id}`);
    });
  }
};

const addToCart = (product, cartId) => {
  const orderedProduct = JSON.stringify({ ordered_product: {...product, cart_id: cartId }});
  return dispatch => {
    return fetch('/ordered_products', {
      accept: 'application/json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: orderedProduct
    }).then(response => response.json()).then(data => {
      dispatch({type: 'ADD_TO_CART', payload: data});
      console.log(`${data.name} added with cart_id ${data.cart_id}`);
    });
  }
};

const actions = {
  handleSearchChange,
  setFiltered,
  logOut,
  signUp,
  logIn,
  getAllProducts,
  fetchOrderedProductsByCartId,
  removeFromCart,
  addToCart
};

export default actions;
