import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import searchReducer from './reducers/searchReducer';
import apiReducer from './reducers/apiReducer';
import authReducer from './reducers/authReducer';

const makeStore =
  process.env.NODE_ENV === 'development'
    ? (initialState) =>
        createStore(
          combineReducers({ search: searchReducer, api: apiReducer, auth: authReducer }),
          initialState,
          composeWithDevTools()
        )
    : (initialState) =>
        createStore(combineReducers({ search: searchReducer, api: apiReducer, auth: authReducer }), initialState);

export const wrapper = createWrapper(makeStore, { debug: false });
