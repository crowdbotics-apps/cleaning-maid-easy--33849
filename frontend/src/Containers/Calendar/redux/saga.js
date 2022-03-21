import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from "connected-react-router";

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { GET_DAY_ACCEPTED_APPOINTEMENTS } from './types';

// actions
import {getDayAcceptedAppointmentsSuccess} from './actions'


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
    // console.log("responseees",response);
    // yield put(getDayAcceptedAppointmentsSuccess(response.data))

  } catch (e) {
    const { response } = e
    // console.log("responseees failllllll",response);
  }
}



export default all([
  takeLatest(GET_DAY_ACCEPTED_APPOINTEMENTS, getDayAcceptedAppointments),
]);
