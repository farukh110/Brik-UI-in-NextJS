import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'store/actions/authActions';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT_URL}/auth/login`;
export const useRefreshLogin = () => {
  const { isLoggingUser, loginResponse, loginError } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const refreshLogin = () => {
    if (!loginResponse && !isLoggingUser) {
      dispatch(actions.refreshLogin());
      axios
        .post(
          baseURL,
          {
            method: 'refreshToken'
          },
          {
            withCredentials: true
          }
        )
        .then((loginResponse) => {
          dispatch(actions.refreshLoginResponse({ loginResponse }));
        })
        .catch((error) => {
          dispatch(actions.refreshLoginResponse({ loginError: error.response || {} }));
        });
    }
  };

  return { loginResponse, isLoggingUser, loginError, refreshLogin };
};
