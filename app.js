
import React, { Component } from 'react';
import { ImageBackground, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Login from './Components/Login/Login';
import userReducer from './redux/reducers/user';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Donation from './Screens/Donation';
import Contribute from './Screens/Contribute';
import NewUser from './Components/NewUser/NewUser';
import { setCustomSourceTransformer } from 'react-native/Libraries/Image/resolveAssetSource';

// noinspection JSAnnotator

if (!console.dir) {
  console.dir = () => null;
}

const logger = createLogger({
  collapsed: false,
  predicate: () =>
    process.env.NODE_ENV === 'development', // eslint-disable-line no-unused-vars
});
const store = createStore(combineReducers({ userReducer }), applyMiddleware(thunkMiddleware, logger));
setCustomSourceTransformer(function (resolver) {

    if (Platform.OS === 'android'
        && !resolver.serverUrl
        && !resolver.bundlePath
        && resolver.asset.type === 'html') {
      resolver.bundlePath = '/android_asset/';
    }

    return resolver.defaultAsset();
  });

export default class tgwf extends Component {
  render() {
    return (
      <Provider store={store}>
        <ImageBackground
          style={{ flex: 1, zIndex: 1 }}
          source={require('./assets/images/iceberg.jpg')}
        >
          <Login />
        </ImageBackground>
      </Provider>);
  }
}
