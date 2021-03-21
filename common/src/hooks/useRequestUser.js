import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'store/actions/authActions';
import { useRefreshLogin } from './useRefreshLogin';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT_URL}/auth/me`;
export const useRequestUser = () => {
  const { isFetchingUser, fetchResponse, fetchError } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const { refreshLogin } = useRefreshLogin();
  if (!fetchResponse && !isFetchingUser && !fetchError) {
    dispatch(actions.fetchUser());
    axios
      .get(baseURL, {
        withCredentials: true
      })
      .then((fetchResponse) => {
        dispatch(actions.fetchUserResponse({ fetchResponse }));
      })
      .catch((error) => {
        dispatch(actions.fetchUserResponse({ fetchError: error.response || {} }, true));
        refreshLogin();
      });
  }

  return { fetchError, isFetchingUser, fetchResponse };
};
