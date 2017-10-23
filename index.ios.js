/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry, View, Text
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Login from './Components/Login/Login';
import userReducer from './redux/reducers/user';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// noinspection JSAnnotator

if (console.dir) {
    console.dir = console.dir
} else {
    console.dir = () => null
}
const logger = createLogger({
    collapsed: false,
    predicate: () =>
        process.env.NODE_ENV === `development`, // eslint-disable-line no-unused-vars
});
const store = createStore(combineReducers({userReducer}), applyMiddleware(thunkMiddleware, logger));

export default class tgwf extends Component {
  render() {
    return (
      <Provider store={store}>

          <Login />
      </Provider>);
  }
}


AppRegistry.registerComponent('tgwf', () => tgwf);
