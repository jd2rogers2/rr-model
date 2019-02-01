import { combineReducers } from 'redux';

let reducer = (state = {
  filtered: false,
  products: [],
  orderedProducts: {},
  user: {},
  userInput: ''
}, action) => {
  switch (action.type) {
    case 'HANDLE_SEARCH_CHANGE':
      return {...state, filtered: false, userInput: action.payload};
    case 'SET_FILTERED':
      return {...state, filtered: true};
    case 'LOG_OUT':
      return {...state, user: {}, orderedProducts: {}};
    case 'SET_USER':
      return {...state, user: action.payload};
    case 'SET_PRODUCTS':
      return {...state, products: action.payload, filtered: false, userInput: ''};
    case 'SET_ORDERED_PRODUCTS':
      const combinedOrderedProducts = {};
      action.payload.forEach(prod => {
        if (combinedOrderedProducts[prod.name]) {
          combinedOrderedProducts[prod.name].count++;
        } else {
          combinedOrderedProducts[prod.name] = {...prod, count: 1};
        }
      })
      return {...state, orderedProducts: combinedOrderedProducts};
    case 'DELETE_ORDERED_PRODUCT':
      let updatedOrderedProducts = {...state.orderedProducts};
      if (updatedOrderedProducts[action.payload.name].count > 1) {
        updatedOrderedProducts[action.payload.name].count--;
      } else {
        delete updatedOrderedProducts[action.payload.name];
      }
      return {...state, orderedProducts: updatedOrderedProducts};
    case 'ADD_TO_CART':
      let newOrderedProducts = {...state.orderedProducts};
      if (state.orderedProducts[action.payload.name]) {
        newOrderedProducts[action.payload.name].count++;
      } else {
        newOrderedProducts[action.payload.name] = {...action.payload, count: 1};
      }
      return {...state, orderedProducts: newOrderedProducts};
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  state: reducer
});
export default rootReducer;
