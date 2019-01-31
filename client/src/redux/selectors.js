
const getFilteredProducts = state =>
  state.products.filter(product => product.name.includes(state.userInput));

const selectors = {
  getFilteredProducts
};

export default selectors;
