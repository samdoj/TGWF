import { dispatch } from 'redux-thunk';

const USERNAME = 'Jodde';
const PASSWORD = 'rocks!!';
//const URL = 'https://jsonplaceholder.typicode.com/posts/';
const URL = 'http://www.theglobalwarmingfoundation.org/wp-json/jwt-auth/v1/token';
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
    let options = {};
    options.body =  JSON.stringify({username:userName, password});
    options.headers = {
      "content-type": 'application/json',
        accept: 'application/json',
    };
    options.method = 'POST';
    fetch(URL, options).then((response) => {
        response.json().then((json) =>
        {
          //console.log(json);
          console.log(json.token);
          dispatch(setUserValid(json.token!==undefined));
              })
    }).catch((err)=>
    {
      console.log(err);
      hasError(true, err);
    });
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
