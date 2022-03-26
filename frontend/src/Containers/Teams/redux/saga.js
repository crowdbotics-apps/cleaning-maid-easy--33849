import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from "connected-react-router";

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { GET_TEAM, GET_EMPLOYEES, CREATE_TEAM, DELETE_TEAM } from './types';

// actions
import {getTeamSuccess, resetTeam, getEmployeesSuccess, getTeam} from './actions'


async function getTeamAPI() {
  const URL = `${BASE_URL}/api/v1/operations/teams/`;
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

function* getTeams() {
  try {
    const response = yield call(getTeamAPI);
    yield put((getTeamSuccess(response.data)))

  } catch (e) {
    const { response } = e
  }
  finally {
    yield put(resetTeam())
  }
}

async function getEmployeesAPI() {
  const URL = `${BASE_URL}/api/v1/users/users_list/?user_type=Employee`;
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

function* getEmployees() {
  try {
    const response = yield call(getEmployeesAPI);
    yield put((getEmployeesSuccess(response.data.results)))

  } catch (e) {
    const { response } = e
  }
  finally {
    yield put(resetTeam())
  }
}

async function createTeamApi(data) {
  const URL = `${BASE_URL}/api/v1/operations/create_team/`;
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

function* createTeam({data, setmodal}) {
  try {
    const response = yield call(createTeamApi, data);
    setmodal(false)
    yield put((getTeam()))
  } catch (e) {
    const { response } = e
  }
  finally {
    yield put(resetTeam())
  }
}

async function deleteTeamApi(data) {
  const URL = `${BASE_URL}/api/v1/operations/teams/${data}/`;
  const token = await sessionStorage.getItem('authToken');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'DELETE',
    data
  };

  return XHR(URL, options);
}

function* deleteTeam({data}) {
  try {
    const response = yield call(deleteTeamApi, data);
    yield put((getTeam()))
  } catch (e) {
    const { response } = e
  }
  finally {
    yield put(resetTeam())
  }
}

export default all([
  takeLatest(GET_TEAM, getTeams),
  takeLatest(GET_EMPLOYEES, getEmployees),
  takeLatest(CREATE_TEAM, createTeam),
  takeLatest(DELETE_TEAM, deleteTeam),


]);
