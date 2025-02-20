import axios from 'axios';
import { updateIsUserLoggedIn } from '../store/slices/auth.slice';
import { store } from '../store/store';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api/v1`,
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
    const originalReq = error.config;

    if (error.response?.status === 403 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/generate-token`,
          {},
          { withCredentials: true },
        );
        
        if (response.data.status === 'success') {
          store.dispatch(updateIsUserLoggedIn(true));
          return axiosInstance(originalReq);
        } else {
          store.dispatch(updateIsUserLoggedIn(false));
          return Promise.reject(error);
        }
      } catch (refreshError) {
        store.dispatch(updateIsUserLoggedIn(false));
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
