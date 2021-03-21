import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'store/actions/authActions';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT_URL}/auth/logout`;
export const useLogoutUser = () => {
  const { isLoggingOut } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const logout = () => {
    if (!isLoggingOut) {
      axios
        .post(baseURL, null, {
          withCredentials: true
        })
        .then(() => {
          dispatch(actions.logoutResponse());
          router.push('/');
        })
        .catch(() => {
          dispatch(actions.logoutResponse());
          router.push('/');
        });
      dispatch(actions.logout());
    }
  };

  return { logout, isLoggingOut };
};
