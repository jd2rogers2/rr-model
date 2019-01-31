import { combineReducers } from 'redux';

let reducer = (state = {
  filtered: false,
  products: [],
  user: {},
  userInput: ''
}, action) => {
  switch (action.type) {
    case 'HANDLE_SEARCH_CHANGE':
      return {...state, filtered: false, userInput: action.payload};
    case 'SET_FILTERED':
      return {...state, filtered: true};
    case 'LOG_OUT':
      return {...state, user: {}};
    case 'SET_USER':
      return {...state, user: action.payload};
    case 'SET_PRODUCTS':
      return {...state, products: action.payload, filtered: false, userInput: ''};
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  reducer
});
export default rootReducer;
