export const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST';
export const USER_REFRESH_LOGIN = 'USER_REFRESH_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_FETCH_RESPONSE = 'USER_FETCH_RESPONSE';
export const USER_REFRESH_LOGIN_RESPONSE = 'USER_REFRESH_LOGIN_RESPONSE';
export const USER_LOGOUT_RESPONSE = 'USER_LOGOUT_RESPONSE';

export const actions = {
  fetchUser: () => ({
    type: USER_FETCH_REQUEST
  }),
  refreshLogin: () => ({
    type: USER_REFRESH_LOGIN
  }),
  logout: () => ({
    type: USER_LOGOUT
  }),

  fetchUserResponse: ({ fetchResponse, fetchError }) => ({
    type: USER_FETCH_RESPONSE,
    payload: { fetchResponse, fetchError }
  }),
  refreshLoginResponse: ({ loginResponse, loginError }) => ({
    type: USER_REFRESH_LOGIN_RESPONSE,
    payload: { loginResponse, loginError }
  }),
  logoutResponse: () => ({
    type: USER_LOGOUT_RESPONSE
  })
};
