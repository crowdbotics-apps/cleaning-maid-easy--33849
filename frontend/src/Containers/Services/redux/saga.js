import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from "connected-react-router";
import toast from "react-hot-toast"

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { GET_SERVICES, ADD_SERVICES } from './types';

// actions
import {getServicesSuccess, addServicesFailure, getServices, resetServices} from './actions'


async function getServicesAPI() {
  const URL = `${BASE_URL}/api/v1/operations/services/`;
  const token = await sessionStorage.getItem('authToken');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'GET',
  };

  return XHR(URL, options);
}

function* getService() {
  try {
    const response = yield call(getServicesAPI);
    yield put(getServicesSuccess(response.data))

  } catch (e) {
    const { response } = e
  }
  finally {
    yield put(resetServices())
  }
}

async function addServicesAPI(data) {
  const URL = `${BASE_URL}/api/v1/operations/services/`;
  const token = await sessionStorage.getItem('authToken');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'POST',
    data
  };

  return XHR(URL, options);
}

function* addServices({data, setModal}) {
  try {
    const response = yield call(addServicesAPI, data);
    yield put(getServices())
    setModal(false)
    toast.success("Successfully saved!")
  } catch (e) {
    const { response } = e
    yield put(addServicesFailure(response.data))
    toast.error('Someting wrong!');
  }
  finally {
    yield put(resetServices())
  }
}

export default all([
  takeLatest(GET_SERVICES, getService),
  takeLatest(ADD_SERVICES, addServices)
]);
