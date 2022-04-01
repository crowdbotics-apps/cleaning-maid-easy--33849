import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from "connected-react-router";
// import AsyncStorage from '@react-native-community/async-storage';

// import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { LOGIN_REQUEST } from './types';

// actions
import {
  loginSuccess,
  loginFaluire,
} from './actions';
import { getUserInfo } from 'Containers/Profile/redux/actions';

function loginAPI(data) {
  const URL = `${BASE_URL}/rest-auth/login/`;
  const options = {
    headers: {
      Accept: 'application/json', 
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data,
  };


  return XHR(URL, options);
}

function* login({ data }) {
  try {
    const response = yield call(loginAPI, data);
    sessionStorage.setItem('authToken', response.data.key)
    yield put(loginSuccess(response.data));
    yield put(getUserInfo())
    
    yield put(
      push({
        pathname: '/admin/services'
      })
    )

  } catch (e) {
    const { response } = e
    yield put(loginFaluire(response?.data?.non_field_errors[0]));
    console.log("faild", response?.data?.non_field_errors[0])
  }
}

export default all([
  takeLatest(LOGIN_REQUEST, login),
]);
