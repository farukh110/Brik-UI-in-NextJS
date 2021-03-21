export const TRANSACTIONS_FETCH = 'TRANSACTIONS_FETCH';
export const TRANSACTIONS_RESPONSE = 'TRANSACTIONS_RESPONSE';

export const AREAEVOLUTION_FETCH = 'AREAEVOLUTION_FETCH';
export const AREAEVOLUTION_RESPONSE = 'AREAEVOLUTION_RESPONSE';

export const AREAEVOLUME_FETCH = 'AREAEVOLUME_FETCH';
export const AREAEVOLUME_RESPONSE = 'AREAEVOLUME_RESPONSE';

export const PLUSVALUE_FETCH = 'PLUSVALUE_FETCH';
export const PLUSVALUE_RESPONSE = 'PLUSVALUE_RESPONSE';

export const PICTRANSACTION_FETCH = 'PICTRANSACTION_FETCH';
export const PICTRANSACTION_RESPONSE = 'PICTRANSACTION_RESPONSE';

export const PLUSVALUEGRAPH_FETCH = 'PLUSVALUEGRAPH_FETCH';
export const PLUSVALUEGRAPH_RESPONSE = 'PLUSVALUEGRAPH_RESPONSE';

export const TRANSACTIONEVOLUTION_FETCH = 'TRANSACTIONEVOLUTION_FETCH';
export const TRANSACTIONEVOLUTION_RESPONSE = 'TRANSACTIONEVOLUTION_RESPONSE';

export const EVOLUTIONVOLUME_FETCH = 'EVOLUTIONVOLUME_FETCH';
export const EVOLUTIONVOLUME_RESPONSE = 'EVOLUTIONVOLUME_RESPONSE';

export const PLACESSUGGESTION_FETCH = 'PLACESSUGGESTION_FETCH';
export const PLACESSUGGESTION_RESPONSE = 'PLACESSUGGESTION_RESPONSE';

export const PLUSVALUECLOSE_FETCH = 'PLUSVALUECLOSE_FETCH';
export const PLUSVALUECLOSE_RESPONSE = 'PLUSVALUECLOSE_RESPONSE';

export const MAPTRANSACTIONS_FETCH = 'MAPTRANSACTIONS_FETCH';
export const MAPTRANSACTIONS_RESPONSE = 'MAPTRANSACTIONS_RESPONSE';

export const NEEDSREFRESH_SET = 'NEEDSREFRESH_SET';
export const NEEDSREFRESH_DONE = 'NEEDSREFRESH_DONE';

// Action factories

export const actions = {
  // Liste de transactions
  getTransactions: () => ({
    type: TRANSACTIONS_FETCH,
    payload: null
  }),

  getTransactionsResponse: (data) => ({
    type: TRANSACTIONS_RESPONSE,
    payload: data
  }),
  // Evolution du m²
  getAreaEvolution: () => ({
    type: AREAEVOLUTION_FETCH,
    payload: null
  }),

  getAreaEvolutionResponse: (data) => ({
    type: AREAEVOLUTION_RESPONSE,
    payload: data
  }),

  // Evolution stat 2
  getAreaVolume: () => ({
    type: AREAEVOLUTION_FETCH,
    payload: null
  }),

  getAreaVolumeResponse: (data) => ({
    type: AREAEVOLUTION_RESPONSE,
    payload: data
  }),

  // Pic de transaction
  getPicTransaction: () => ({
    type: PICTRANSACTION_FETCH,
    payload: null
  }),

  getPicTransactionResponse: (data) => ({
    type: PICTRANSACTION_RESPONSE,
    payload: data
  }),

  // Plus value
  getPlusValue: () => ({
    type: PLUSVALUE_FETCH,
    payload: null
  }),

  getPlusValueResponse: (data) => ({
    type: PLUSVALUE_RESPONSE,
    payload: data
  }),

  // Plus value graph
  // Plus value
  getPlusValueGraph: () => ({
    type: PLUSVALUEGRAPH_FETCH,
    payload: null
  }),

  getPlusValueGraphResponse: (data) => ({
    type: PLUSVALUEGRAPH_RESPONSE,
    payload: data
  }),

  // Plus value
  getTransactionEvolution: () => ({
    type: TRANSACTIONEVOLUTION_FETCH,
    payload: null
  }),

  getTransactionEvolutionResponse: (data) => ({
    type: TRANSACTIONEVOLUTION_RESPONSE,
    payload: data
  }),

  // Evolution volume
  getEvolutionVolume: () => ({
    type: EVOLUTIONVOLUME_FETCH,
    payload: null
  }),

  getEvolutionVolumeResponse: (data) => ({
    type: EVOLUTIONVOLUME_RESPONSE,
    payload: data
  }),

  // Get plus value close
  getPlusValueClose: () => ({
    type: PLUSVALUECLOSE_FETCH,
    payload: null
  }),

  getPlusValueCloseResponse: (data) => ({
    type: PLUSVALUECLOSE_RESPONSE,
    payload: data
  }),

  // Places suggestions
  getPlacesSuggestion: () => ({
    type: PLACESSUGGESTION_FETCH,
    payload: null
  }),

  getPlacesSuggestionResponse: (data) => ({
    type: PLACESSUGGESTION_RESPONSE,
    payload: data
  }),

  // Liste de transactions
  getMapTransactions: () => ({
    type: MAPTRANSACTIONS_FETCH,
    payload: null
  }),

  getMapTransactionsResponse: (data) => ({
    type: MAPTRANSACTIONS_RESPONSE,
    payload: data
  }),

  // Global refresh status
  setNeedsRefresh: () => ({
    type: NEEDSREFRESH_SET,
    payload: true
  }),

  needsRefreshDone: (data) => ({
    type: NEEDSREFRESH_DONE,
    payload: data
  })
};
