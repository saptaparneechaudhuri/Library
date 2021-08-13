import {createStore, combineReducers} from 'redux';
import libraryTokens from './reducers/libraryTokens';

const reducers = combineReducers({
  libraryTokens: libraryTokens,
});

const store = createStore(reducers);

export default store;
