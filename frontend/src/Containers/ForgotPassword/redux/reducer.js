import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FALUIRE,
} from './types';

const initialState = {
  msg: false,
  requesting: false,
  error: false,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        requesting: false,
        msg: action.data
      };

    case FORGOT_PASSWORD_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error
      };

    default:
      return state;
  }
};
