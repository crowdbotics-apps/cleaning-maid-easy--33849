import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGING_FALUIRE
} from './types';

const initialState = {
  user: false,
  requesting: false,
  error: false,
};

export default (state = initialState, action) => {
  
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        requesting: false,
        user: action.user
      };

    case LOGING_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error
      };

    default:
      return state;
  }
};
