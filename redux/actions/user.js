import { dispatch } from 'redux-thunk';

const USERNAME = 'Jodde';
const PASSWORD = 'rocks!!';

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

export function isValidUser(userName, password) {
  return function action(dispatch) {
    dispatch({ type: 'CHECK_USER_VALID', });
    fetch('http://www.tgwf.org//wp-json/jwt-auth/v1/token',
      { method: 'POST',

          body: JSON.stringify({"username": userName, "password": password }), }).then((response) => console.log(response)).catch((err)=>console.log(err));
  };
}

export function setUserValid(bool)
{
  return {
    type: 'USER_VALID',
    valid: bool,
  };
}

export function hasError(bool, message) {
  return {
    type: 'USER_ERROR',
    error: bool,
    message,
  };
}

export function updateLoginTimer(seconds)
{
  return {
    type: 'TIMER_UPDATE',
    seconds,
  };
}

export function createLoginTimer(seconds, interval)
{
  return {
        type: 'TIMER_CREATE',
        seconds,
        interval,
      };
}
