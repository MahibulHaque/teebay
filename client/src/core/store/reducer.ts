import {combineReducers} from 'redux';
import {languageReducer, userAuthReducer} from './slices';

const LocalReducer = combineReducers({
  language: languageReducer,
  userAuth:userAuthReducer
});

export default LocalReducer;
