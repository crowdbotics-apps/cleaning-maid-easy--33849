import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FALUIRE,
} from './types';

export const  forgetPasswordRequest= (data) => ({
  type: FORGOT_PASSWORD_REQUEST,
  data,
});

export const forgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  data
});

export const forgotPasswordFaluire = (error) => ({
  type: FORGOT_PASSWORD_FALUIRE,
  error,
});
