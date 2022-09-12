import * as actions from './actionTypes';

const accountReducer = (state, action) => {
  switch (action.type) {
    case actions.ACCOUNT_INITIALISE: {
      const { isLoggedIn, user } = action.payload;
      return {
        ...state,
        isLoggedIn,
        isInitialised: true,
        user
      };
    }
    case actions.LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user
      };
    }
    case actions.GETUSER: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    case actions.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
