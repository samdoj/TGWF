/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry, View, Text, ImageBackground
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Login from './Components/Login/LoginIOS';
import userReducer from './redux/reducers/user';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import WebsiteView from "./Screens/WebsiteView";
import Donation from "./Screens/Donation";
import Contribute from "./Screens/Contribute";
import NewUser from "./Components/NewUser/NewUser";


// invoke API directly when in need
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
          <ImageBackground style = {{ flex: 1, zIndex: 1 }}
                           source={require('./assets/images/iceberg.jpg')}>
            <NewUser/>
          </ImageBackground>
      </Provider>);
  }
}


AppRegistry.registerComponent('tgwf', () => tgwf);
