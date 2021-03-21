const { HYDRATE } = require('next-redux-wrapper');
const {
  TRANSACTIONS_FETCH,
  TRANSACTIONS_RESPONSE,
  AREAEVOLUTION_FETCH,
  AREAEVOLUTION_RESPONSE,
  AREAVOLUME_FETCH,
  AREAVOLUME_RESPONSE,
  PICTRANSACTION_FETCH,
  PICTRANSACTION_RESPONSE,
  PLUSVALUE_FETCH,
  PLUSVALUE_RESPONSE,
  PLUSVALUEGRAPH_FETCH,
  EVOLUTIONVOLUME_FETCH,
  EVOLUTIONVOLUME_RESPONSE,
  PLUSVALUEGRAPH_RESPONSE,
  TRANSACTIONEVOLUTION_FETCH,
  TRANSACTIONEVOLUTION_RESPONSE,
  PLUSVALUECLOSE_FETCH,
  PLUSVALUECLOSE_RESPONSE,
  PLACESSUGGESTION_FETCH,
  PLACESSUGGESTION_RESPONSE,
  MAPTRANSACTIONS_FETCH,
  MAPTRANSACTIONS_RESPONSE,
  NEEDSREFRESH_SET,
  NEEDSREFRESH_DONE
} = require('../actions/apiActions');

const initialState = {
  data: null,
  isFetchingTransactions: false,
  needsRefresh: true,
  isFetchingAreaEvolution: false,
  isFetchingAreaVolume: false,
  isFetchingPicTransaction: false,
  isFetchingPlusValue: false,
  isFetchingPlusValueGraph: false,
  isFetchingPlusValueClose: false,
  isFetchingTransactions: false,
  isFetchingPicTransaction: false,
  isFetchingTransactionEvolution: false,
  isFetchingMapTransactionEvolution: false,
  codeInsee: null
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE: {
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    }
    case TRANSACTIONS_FETCH: {
      return { ...state, isFetchingTransactions: true };
    }
    case TRANSACTIONS_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingTransactions: false,
        transactionData: data
      };
    }

    case AREAEVOLUTION_FETCH: {
      return { ...state, isFetchingAreaEvolution: true };
    }
    case AREAEVOLUTION_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingAreaEvolution: false,
        areaEvolutionData: data
      };
    }

    case PLUSVALUE_FETCH: {
      return { ...state, isFetchingPlusValue: true };
    }
    case PLUSVALUE_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingPlusValue: false,
        plusValueData: data
      };
    }

    case AREAVOLUME_FETCH: {
      return { ...state, isFetchingAreaVolume: true };
    }
    case AREAVOLUME_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingAreaVolume: false,
        areaVolumeData: data
      };
    }

    case PICTRANSACTION_FETCH: {
      return { ...state, isFetchingPicTransaction: true };
    }
    case PICTRANSACTION_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingPicTransaction: false,
        dataPicTransaction: data
      };
    }

    case PLUSVALUEGRAPH_FETCH: {
      return { ...state, isFetchingPlusValueGraph: true };
    }
    case PLUSVALUEGRAPH_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingPlusValueGraph: false,
        dataPlusValueGraph: data
      };
    }

    case TRANSACTIONEVOLUTION_FETCH: {
      return { ...state, isFetchingTransactionEvolution: true };
    }
    case TRANSACTIONEVOLUTION_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingTransactionEvolution: false,
        dataTransactionEvolution: data
      };
    }

    case EVOLUTIONVOLUME_FETCH: {
      return { ...state, isFetchingEvolutionVolume: true };
    }
    case EVOLUTIONVOLUME_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingEvolutionVolume: false,
        dataEvolutionVolume: data
      };
    }

    case PLUSVALUECLOSE_FETCH: {
      return { ...state, isFetchingPlusValueClose: true };
    }
    case PLUSVALUECLOSE_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingPlusValueClose: false,
        dataPlusValueClose: data
      };
    }

    case PLACESSUGGESTION_FETCH: {
      return { ...state, isFetchingPlacesSuggestion: true };
    }
    case PLACESSUGGESTION_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingPlacesSuggestion: false,
        dataPlacesSuggestion: data
      };
    }

    case MAPTRANSACTIONS_FETCH: {
      return { ...state, isFetchingMapTransactions: true };
    }
    case MAPTRANSACTIONS_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        isFetchingMapTransactions: false,
        mapTransactionData: data
      };
    }

    case NEEDSREFRESH_SET: {
      return { ...state, needsRefresh: true };
    }
    case NEEDSREFRESH_DONE: {
      const status = action.payload;
      return {
        ...state,
        needsRefresh: status
      };
    }
    default:
      return state;
  }
};

export default reducer;
