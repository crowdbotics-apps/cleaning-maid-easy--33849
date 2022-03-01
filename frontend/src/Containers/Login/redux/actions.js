import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGING_FALUIRE,
  FORGOT_RESET_MSG
} from './types';

export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFaluire = (error) => ({
  type: LOGING_FALUIRE,
  error,
});

export const resetMsg = () => ({
  type: FORGOT_RESET_MSG
});