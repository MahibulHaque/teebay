import {configureStore} from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiMiddlewares, apiReducers } from './api';
import LocalReducer from './reducer';


const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, LocalReducer);

export const store = configureStore({
  reducer: {
    ...persistedReducer, // Combining the persisted reducer
    ...apiReducers, // Dynamically adding API reducers
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...apiMiddlewares),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()