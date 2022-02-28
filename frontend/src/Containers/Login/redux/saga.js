import { all, call, put, takeLatest } from 'redux-saga/effects';
// import AsyncStorage from '@react-native-community/async-storage';

// import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from '../../../config/app';
import localStorage from 'redux-persist/es/storage';

// utils
import XHR from '../../../utils/XHR';

// types
import { LOGIN_REQUEST } from './types';

// actions
import {
  loginSuccess,
  loginFaluire,
} from './actions';

function loginAPI(data) {
  console.log("dataa api", data)
  const URL = `${BASE_URL}/rest-auth/login/`;
  console.log("URL", URL)
  const options = {
    headers: {
      // Accept: 'application/json', 
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data,
  };


  return XHR(URL, options);
}

function* login({ data }) {
  console.log('data', data);
  try {
    const response = yield call(loginAPI, data);

    console.log("response", response)
    // localStorage.setItem('authToken', response?.data?.token);

    // showMessage({
    //   message: 'Login successfully!.',
    //   type: 'success',
    // });
    // yield put(loginSuccess(response?.data?.user));
  } catch (e) {
    const { response } = e
    // yield put(loginFaluire({ e }));
    // showMessage({
    //   message: response?.data?.non_field_errors,
    //   type: 'danger',
    // });
    console.log("faild", e)
  }
}

export default all([
  takeLatest(LOGIN_REQUEST, login),
]);
