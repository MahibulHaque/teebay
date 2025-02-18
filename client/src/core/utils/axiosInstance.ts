import axios from 'axios';
import {useDispatch} from 'react-redux';
import {updateIsUserLoggedIn} from '../store/slices/auth.slice';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const dispatch = useDispatch();

    const originalReq = error.config;

    if (error.response.status === 403 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/auth/generate-token`,
          {},
          {withCredentials: true},
        );
        if (response.data.status === 'success') {
          dispatch(updateIsUserLoggedIn(true));
          return axiosInstance(originalReq);
        } else {
          dispatch(updateIsUserLoggedIn(false));
          return Promise.reject(error);
        }
      } catch (error) {
        dispatch(updateIsUserLoggedIn(false));
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
