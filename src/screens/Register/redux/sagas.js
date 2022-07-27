import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showMessage } from 'react-native-flash-message';

// config
import { appConfig } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

// actions
import { } from './actions';

function registerAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/token/login/`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* register({ data }) {
  try {
    const response = yield call(registerAPI, data);
  } catch (e) {
    showMessage({
      message: 'Unable to login, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([takeLatest(types.register, register)]);
