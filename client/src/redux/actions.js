const handleSearchChange = event => ({
  type: 'HANDLE_SEARCH_CHANGE',
  payload: event && event.target && event.target.value
});

const setFiltered = () => ({
  type: 'SET_FILTERED'
});

const logOut = () => {
  return (dispatch) => {
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
}

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
    });
  }
}

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
    });
  }
}

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
}

const actions = {
  handleSearchChange,
  setFiltered,
  logOut,
  signUp,
  logIn,
  getAllProducts
};

export default actions;
