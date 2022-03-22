import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from "connected-react-router";

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { GET_DAY_ACCEPTED_APPOINTEMENTS,GET_NOTES} from './types';

// actions
import {getDayAcceptedAppointmentsSuccess,getNotesSuccess} from './actions'


async function getDayAcceptedAppointmentsApi(date) {
  const URL = `${BASE_URL}/api/v1/operations/day_calendar/?day=${date}`;
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

function* getDayAcceptedAppointments({date}) {
  try {
    const response = yield call(getDayAcceptedAppointmentsApi,date);
    // yield put(getDayAcceptedAppointmentsSuccess(response.data))

  } catch (e) {
    const { response } = e
  }
}

async function getNotesApi() {
  const URL = `${BASE_URL}/api/v1/operations/notes/`;
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

function* getNotes() {
  try {
    const response = yield call(getNotesApi);
    yield put(getNotesSuccess(response.data))

  } catch (e) {
    const { response } = e

  }
}

export default all([
  takeLatest(GET_DAY_ACCEPTED_APPOINTEMENTS, getDayAcceptedAppointments),
  takeLatest(GET_NOTES, getNotes),

]);
