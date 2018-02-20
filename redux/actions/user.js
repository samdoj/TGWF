import { dispatch } from 'redux-thunk';

// const URL = 'https://jsonplaceholder.typicode.com/posts/';
const URL = 'http://www.theglobalwarmingfoundation.org/wp-json/jwt-auth/v1/token';
const VALIDATE_URL = 'http://www.theglobalwarmingfoundation.org/wp-json/jwt-auth/v1/token/validate';
export function setUserName(name) {
  return {
    type: 'USER_NAME',
    userName: name,

  };
}

export function setHashedPassword(hashedPassword) {
  return {
    type: 'PASSWORD',
    password: hashedPassword,
  };
}

export function isValidUser(userName, password, token) {
  return function action(dispatch) {
    dispatch({ type: 'CHECK_USER_VALID' });
    const options = {};
    options.body = token ? undefined : JSON.stringify({ username: userName, password });
    options.headers = {
      'content-type': 'application/json',
      accept: 'application/json',
      Authorization: token === undefined ? '' : token,
    };
    options.method = 'POST';
    fetch(token === undefined ? URL : VALIDATE_URL, options).then((response) => {
      response.json().then((json) => {
        // console.log(json);
        console.log(json.token);
        dispatch(setUserValid(json.token !== undefined || json.code !== undefined));
        if (json.token) {
          dispatch(captureToken(json.token));
        }
      });
    }).catch((err) => {
      console.log(err);
      dispatch(hasError(true, err));
    });
  };
}

export function setUserValid(bool) {
  return {
    type: 'USER_VALID',
    valid: bool,
  };
}

export function captureToken(token) {
  global.token = token;
  return {
    type: 'USER_TOKEN',
    token,
  };
}
export function hasError(bool, errorMessage) {
  return {
    type: 'USER_ERROR',
    error: bool,
    errorMessage: errorMessage.message,
  };
}

export function updateLoginTimer(seconds) {
  return {
    type: 'TIMER_UPDATE',
    seconds,
  };
}

export function createLoginTimer(seconds, interval) {
  return {
    type: 'TIMER_CREATE',
    seconds,
    interval,
  };
}
