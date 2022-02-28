import { all, call, put, takeLatest } from 'redux-saga/effects';

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { FORGOT_PASSWORD_REQUEST } from './types';

// actions
import {
  loginSuccess,
  loginFaluire,
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
    // localStorage.setItem('authToken', response?.data?.token);

    // yield put(loginSuccess(response?.data?.user));
  } catch (e) {
    const { response } = e
    console.log("errorrrrr", e)
  }
}

export default all([
  takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword),
]);
