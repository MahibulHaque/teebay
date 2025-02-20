import {productManagementApi} from './productManagementApi';
import {userApi} from './userApi';

// Set up the API reducers dynamically
export const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [productManagementApi.reducerPath]: productManagementApi.reducer,
};

// Dynamically collect all API middlewares
export const apiMiddlewares = [
  userApi.middleware,
  productManagementApi.middleware,
];
