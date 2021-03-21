export const SEARCH_ENTER = 'SEARCH_ENTER';

export const actions = {
  enterSearch: (address, postal_code, filters, scope, lat, lng) => ({
    type: SEARCH_ENTER,
    payload: { address, postal_code, filters, scope, lat, lng }
  })
};
