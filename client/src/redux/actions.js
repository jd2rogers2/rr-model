import { isEmpty } from 'lodash';

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
      },
      credentials: 'same-origin'
    }).then(response => response.json()).then(data => {
      dispatch({type: 'LOG_OUT'});
    });
  }
};

const signUp = (username, password) => {
  const user = JSON.stringify({user: {username, password}});
  return dispatch => {
    return fetch('/users', {
      accept: 'application/json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: user,
      credentials: 'same-origin'
    }).then(response => response.json()).then(data => {
      if (!isEmpty(data) && !data.error && data.current_cart) {
        dispatch({type: 'SET_USER', payload: data});
        dispatch(fetchOrderedProductsByCartId(data.current_cart.id));
      }
      return data;
    });
  }
};

const logIn = (username, password) => {
  const user = JSON.stringify({session: {username, password}});
  return dispatch => {
    return fetch('/sessions', {
      accept: 'application/json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: user,
      credentials: 'same-origin'
    }).then(response => response.json()).then(data => {
      if (!isEmpty(data) && !data.error && data.current_cart) {
        dispatch({type: 'SET_USER', payload: data})
        dispatch(fetchOrderedProductsByCartId(data.current_cart.id));
      }
      return data;
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
      },
      credentials: 'same-origin'
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
      },
      credentials: 'same-origin'
    }).then(response => response.json()).then(data => {
      dispatch({type: 'SET_ORDERED_PRODUCTS', payload: data ? data.ordered_products : []});
    });
  }
};

const removeFromCart = product => {
  return dispatch => {
    return fetch(`/ordered_products/${product.id}`, {
      accept: 'application/json',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => response.json()).then(data => {
      dispatch({type: 'DELETE_ORDERED_PRODUCT', payload: product});
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
      body: orderedProduct,
      credentials: 'same-origin'
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
