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
  return {
    type: 'USER_VALID',
    valid: userName === USERNAME && password === PASSWORD,
  };
}

export function hasError(bool) {
  return {
    type: 'USER_ERROR',
    error: bool,
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
