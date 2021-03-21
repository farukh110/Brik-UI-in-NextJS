const { HYDRATE } = require('next-redux-wrapper');
const { SEARCH_ENTER } = require('../actions/searchActions');

// create your reducer
const reducer = (
  state = {
    address: null,
    postal_code: '',
    filters: ['1', '2', '3', '4', '999'],
    scope: 1
  },
  action
) => {
  switch (action.type) {
    case HYDRATE: {
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    }
    case SEARCH_ENTER: {
      const { address, postal_code, filters, scope, lat, lng } = action.payload;
      return { ...state, address, postal_code, filters, scope, lat, lng };
    }
    default:
      return state;
  }
};

export default reducer;
