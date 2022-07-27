import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from "connected-react-router";
import toast from "react-hot-toast"

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { GET_SERVICES, ADD_SERVICES,EDIT_SERVICES,DELETE_SERVICES } from './types';

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

function* addServices({data, closeModal}) {
  try {
    const response = yield call(addServicesAPI, data);
    yield put(getServices())
    closeModal()
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

async function editServicesAPI(data,id) {
  const URL = `${BASE_URL}/api/v1/operations/services/${id}/`;
  const token = await sessionStorage.getItem('authToken');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'PATCH',
    data
  };

  return XHR(URL, options);
}

function* editServices({data,id, closeModal}) {
  try {
    const response = yield call(editServicesAPI, data,id);
    yield put(getServices())
    closeModal()
    toast.success("Successfully updated!")
  } catch (e) {
    const { response } = e
    yield put(addServicesFailure(response.data))
    toast.error('Someting wrong!');
  }
  finally {
    yield put(resetServices())
  }
}

async function deleteServicesAPI(id) {
  const URL = `${BASE_URL}/api/v1/operations/services/${id}/`;
  const token = await sessionStorage.getItem('authToken');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
  };

  return XHR(URL, options);
}

function* deleteServices({id}) {
  try {
    const response = yield call(deleteServicesAPI,id);
    yield put(getServices())
    toast.success("Successfully deleted!")
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
  takeLatest(ADD_SERVICES, addServices),
  takeLatest(EDIT_SERVICES, editServices),
  takeLatest(DELETE_SERVICES, deleteServices)
]);
