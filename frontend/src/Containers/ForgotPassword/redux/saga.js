import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from "connected-react-router";

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { FORGOT_PASSWORD_REQUEST } from './types';

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
    yield put(
      push({
        pathname: '/auth/resetPassword'
      })
    )
    
  } catch (e) {
    const { response } = e
    console.log("fail", response.data.email.email[0])
    yield put(forgotPasswordFaluire(response.data.email.email[0]));

    
  }
}

export default all([
  takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword),
]);
