import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateIsUserLoggedIn} from '../store/slices/auth.slice';
import axiosInstance from '../utils/axiosInstance';
import { IBaseQueryResponse } from '../interfaces/auth.interface';

const useAuthInitializer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get<IBaseQueryResponse<null>>('/auth/verify-token');
        if (res.data.status === 'success') {
          dispatch(updateIsUserLoggedIn(true));
        } else {
          dispatch(updateIsUserLoggedIn(false));
        }
      } catch (error) {
        dispatch(updateIsUserLoggedIn(false));
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {isLoading};
};

export default useAuthInitializer;
