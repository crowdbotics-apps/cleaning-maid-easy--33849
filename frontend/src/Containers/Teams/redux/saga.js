import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from "connected-react-router";
import toast from "react-hot-toast"

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { GET_TEAM, GET_EMPLOYEES, CREATE_TEAM, DELETE_TEAM,GET_UN_ASSIGNED_EMPLOYEES,REMOVE_TEAM_MEMBER,ADD_TEAM_MEMBER} from './types';

// actions
import {getTeamSuccess, resetTeam, getEmployeesSuccess, getTeam,getUnAssignedEmployeesSuccess,getUnAssignedEmployees as getUnAssignedEmployeesData} from './actions'


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
    yield put((getEmployeesSuccess(response?.data?.results)))

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
    toast.success("Successfully saved!")
  } catch (e) {
    const { response } = e
    toast.error('Someting wrong!');
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
    toast.success("Successfully deleted!")
  } catch (e) {
    const { response } = e
    toast.error('Someting wrong!');
  }
  finally {
    yield put(resetTeam())
  }
}


async function getUnAssignedEmployeesAPi() {
  const URL = `${BASE_URL}/api/v1/users/users_list/?user_type=Employee&un_assigned=${true}`;
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

function* getUnAssignedEmployees() {
  try {
    const response = yield call(getUnAssignedEmployeesAPi);
    yield put((getUnAssignedEmployeesSuccess(response?.data?.results)))

  } catch (e) {
    const { response } = e

  }
  finally {
    yield put(resetTeam())
  }
}


async function removeTeamMemberApi(data) {
  const URL = `${BASE_URL}/api/v1/operations/remove_team_member/`;
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

function* removeTeamMember({data}) {
  try {
    const response = yield call(removeTeamMemberApi,data);
    yield put((getTeam()))
    yield put (getUnAssignedEmployeesData())
    toast.success("Successfully removed!")
  } catch (e) {
    const { response } = e
    toast.error('Someting wrong!');
  }
  finally {
    yield put(resetTeam())
  }
}

async function addTeamMemberApi(data) {
  const URL = `${BASE_URL}/api/v1/operations/add_team_member/`;
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

function* addTeamMember({data}) {
  try {
    const response = yield call(addTeamMemberApi,data);
    yield put((getTeam()))
    yield put (getUnAssignedEmployeesData())
    toast.success("Successfully added!")

  } catch (e) {
    const { response } = e
    toast.error('Someting wrong!');
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
  takeLatest(GET_UN_ASSIGNED_EMPLOYEES, getUnAssignedEmployees),
  takeLatest(REMOVE_TEAM_MEMBER, removeTeamMember),
  takeLatest(ADD_TEAM_MEMBER, addTeamMember)
]);
