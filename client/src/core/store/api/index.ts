import {userApi} from './userApi';

// Set up the API reducers dynamically
export const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
};

// Dynamically collect all API middlewares
export const apiMiddlewares = [userApi.middleware];