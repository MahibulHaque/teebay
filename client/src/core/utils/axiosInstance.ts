import axios, {AxiosError} from 'axios';
import {toast} from 'sonner';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials:true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  response => {
    return response;
  },
  async function (error) {
    const originalReq = error.config;

    if (error.response.status === 403 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        await generateRefreshToken();
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

export const generateRefreshToken = async () => {
  try {
    await axiosInstance.get(`/generate-token`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.error?.message);
    }
  }
};
