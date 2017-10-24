const initialState = { userName: '', password: '', isValidUser: 'initial', secondsToWait: 0, interval: null };

const userReducer = function (state = initialState, action = {}) {

    switch (action.type) {
      case 'USER_NAME':
        {
          return Object.assign({}, state, { userName: action.userName });

        }

        break;

      case 'PASSWORD':
        {
          return Object.assign({}, state, { password: action.password });

        }

        break;

      case 'USER_VALID':
        {
          let valid = action.valid;
          if (typeof state.isValidUser === 'number' && !valid) {
            valid = state.isValidUser + 1;
          } else if (!valid && typeof state.isValidUser === 'boolean')
              valid = 1;
          console.log('Valid? ' + valid);
          return Object.assign({}, state, { isValidUser: valid });

        }
        break;
        case 'TIMER_UPDATE':
        {   if (action.seconds === 0)
        {
            clearInterval(state.interval);
            return Object.assign({}, state, {secondsToWait: action.seconds, interval: null, isValidUser:'reset'})
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


      default:
        {
          return state;
        }
    }
  };

export default userReducer;
