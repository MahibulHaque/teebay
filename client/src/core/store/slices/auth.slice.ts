import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const namespace = 'userAuth';
export interface IUserAuthState {
  isUserLoggedIn: boolean;
}

const initialState: IUserAuthState = {
  isUserLoggedIn: false,
};

const appUserAuthSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    updateIsUserLoggedIn: (state, action: {type: string; payload: boolean}) => {
      state.isUserLoggedIn = action.payload;
    },
  },
});
export const {updateIsUserLoggedIn} = appUserAuthSlice.actions;
export const selectIsUserAuthenticated = (state: RootState) =>
  state.root.userAuth.isUserLoggedIn;

export default appUserAuthSlice.reducer;
