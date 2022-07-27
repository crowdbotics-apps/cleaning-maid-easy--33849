import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from "connected-react-router";
import toast from "react-hot-toast"

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { FORGOT_PASSWORD_REQUEST , RESET_NEW_PASSWORD} from './types';

// actions
import {
  forgotPasswordSuccess,
  forgotPasswordFaluire,
} from './actions';

function forgotPasswordApi(data) {
  const URL = `${BASE_URL}/rest-auth/password/reset/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* forgotPassword({ data }) {
  try {
    const response = yield call(forgotPasswordApi, data);
    yield put(forgotPasswordSuccess(response?.data.detail));
    toast.success("Password reset e-mail has been sent.")
    yield put(
      push({
        pathname: '/auth/login'
      })
    )
    
  } catch (e) {
    const { response } = e
    yield put(forgotPasswordFaluire(response?.data?.email?.email[0]));
    toast.error(`${response?.data?.email?.email[0]}`);
    
  }
}

function resetNewPasswordApi(data) {
  const URL = `${BASE_URL}/rest-auth/password/reset/confirm/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* resetNewPassword({ data }) {
  try {
    const response = yield call(resetNewPasswordApi, data);
    yield put(forgotPasswordSuccess(response?.data?.detail));
    yield put(
      push({
        pathname: '/auth/login'
      })
    )
    toast.success("Password has been reset with the new password.")
  } catch (e) {
    const { response } = e
    yield put(forgotPasswordFaluire(response));
    if(response.data.new_password2){
      toast.error(`${response.data.new_password2[0]}`);
    }
    else {
      toast.error(`${response.data.token[0]}`);
    }
    
    
  }
}

export default all([
  takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword),
  takeLatest(RESET_NEW_PASSWORD, resetNewPassword)
]);
