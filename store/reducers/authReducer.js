import {
  USER_FETCH_REQUEST,
  USER_FETCH_RESPONSE,
  USER_LOGOUT,
  USER_LOGOUT_RESPONSE,
  USER_REFRESH_LOGIN,
  USER_REFRESH_LOGIN_RESPONSE
} from 'store/actions/authActions';

const initialState = {
  isFetchingUser: false,
  isLoggingUser: false,
  isLoggingOut: false,
  fetchResponse: null,
  fetchError: null,
  loginResponse: null,
  loginError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH_REQUEST: {
      return { ...state, isFetchingUser: true };
    }

    case USER_REFRESH_LOGIN: {
      return { ...state, isLoggingUser: true };
    }

    case USER_LOGOUT: {
      return { ...state, isLoggingOut: true };
    }

    case USER_FETCH_RESPONSE: {
      return {
        ...state,
        isFetchingUser: false,
        fetchResponse: action.payload.fetchResponse,
        fetchError: action.payload.fetchError
      };
    }

    case USER_REFRESH_LOGIN_RESPONSE: {
      return {
        ...state,
        isLoggingUser: false,
        loginResponse: action.payload.loginResponse,
        loginError: action.payload.loginError,
        fetchError: action.payload.loginError ? state.fetchError : null
      };
    }
    case USER_LOGOUT_RESPONSE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
