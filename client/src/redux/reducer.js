import { combineReducers } from 'redux';

let reducer = (state = {
  filtered: false,
  products: [],
  orderedProducts: [],
  user: {},
  userInput: ''
}, action) => {
  switch (action.type) {
    case 'HANDLE_SEARCH_CHANGE':
      return {...state, filtered: false, userInput: action.payload};
    case 'SET_FILTERED':
      return {...state, filtered: true};
    case 'LOG_OUT':
      return {...state, user: {}, orderedProducts: []};
    case 'SET_USER':
      return {...state, user: action.payload};
    case 'SET_PRODUCTS':
      return {...state, products: action.payload, filtered: false, userInput: ''};
    case 'SET_ORDERED_PRODUCTS':
      return {...state, orderedProducts: action.payload};
    case 'DELETE_ORDERED_PRODUCT':
      let updatedOrderedProducts = state.orderedProducts.filter(inCart => inCart.id !== action.payload.id);
      return {...state, orderedProducts: updatedOrderedProducts};
    case 'ADD_TO_CART':
      let newOrderedProducts = [...state.orderedProducts, action.payload];
      return {...state, orderedProducts: newOrderedProducts};
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  state: reducer
});
export default rootReducer;
