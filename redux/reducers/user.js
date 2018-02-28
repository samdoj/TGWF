const initialState =
    {userName: '',
        password: '',
        isValidUser: 'initial',
        loginAttempts: 0,
        secondsToWait: 0,
        interval: null,
        token: null,
        errorMessage: '',
        email: ''};

const userReducer = function (state = initialState, action = {}) {

    switch (action.type) {
        case 'USER_ERROR':
        {
            return Object.assign({}, state, { errorMessage: action.errorMessage});

        }
        break;
        case 'USER_REFRESH':
        {
            return Object.assign({}, state, {isValidUser: 'initial'})
        }
      case 'USER_NAME':
        {
          return Object.assign({}, state, { userName: action.userName });

        }

        break;

      case 'PASSWORD':
        {
          return Object.assign({}, state, { password: action.password });

        }
        case 'EMAIL':
        {
            return Object.assign({}, state, { email: action.email });

        }
        break;

      case 'USER_VALID':
        {
          let valid = action.valid;
          if (valid === 'initial')
              return Object.assign({}, state, { isValidUser: valid, });

            let loginAttempts;
          if (!valid) {
            loginAttempts = state.loginAttempts + 1;
          }
          else loginAttempts=4;
          return Object.assign({}, state, { isValidUser: valid, loginAttempts: loginAttempts });

        }
        break;
        case 'TIMER_UPDATE':
        {   if (action.seconds === 0)
        {
            clearInterval(state.interval);
            return Object.assign({}, state, {secondsToWait: action.seconds, interval: null, isValidUser:'reset', loginAttempts:0})
        }
        else
                return Object.assign({}, state, {secondsToWait: action.seconds})

        }
         break;
        case 'TIMER_CREATE':
        {
            return Object.assign({}, state, {secondsToWait: action.seconds, interval: action.interval})
        }
        break;
        case 'USER_TOKEN':
        {   console.log(action.token)
            return Object.assign({},state, {token: action.token})
        }
        break;

      default:
        {
          return state;
        }
    }
  };

export default userReducer;
