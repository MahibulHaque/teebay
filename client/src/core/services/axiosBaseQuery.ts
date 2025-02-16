import {AxiosError} from 'axios';
import axiosInstance from '../utils/axiosInstance';

interface IAxiosBaseQuery {
  url: string;
  method: 'get' | 'post' | 'delete' | 'put' | 'patch';
  data?: unknown;
  params?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
}

const axiosBaseQuery =
  ({baseUrl} = {baseUrl: ''}) =>
  async ({url, method, data, params, headers}: IAxiosBaseQuery) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return {data: result.data};
    } catch (error) {
      const err = error as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
