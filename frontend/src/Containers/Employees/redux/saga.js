import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

import toast from "react-hot-toast"

// utils
import XHR from "../../../utils/XHR"

// types
import {
  ADD_EMPLOYEE,
  GET_EMPLOYEE_LIST,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  CHANGE_EMPLOYEE_TEAM
} from "./types"

// actions
import {
  addEmployeeFailure,
  getEmployeeSuccess,
  getEmployeeList as getEmployeeListData,
  reset
} from "./actions"

async function getEmployeeListApi() {
  const URL = `${BASE_URL}/api/v1/users/employees_list/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "GET"
  }

  return XHR(URL, options)
}

function* getEmployeeList() {
  try {
    const response = yield call(getEmployeeListApi)
    yield put(getEmployeeSuccess(response.data))
  } catch (e) {
    const { response } = e
  } finally {
    yield put(reset())
  }
}

async function addEmployeeAPi(data) {
  const URL = `${BASE_URL}/api/v1/users/create_employee/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "POST",
    data
  }

  return XHR(URL, options)
}

function* addEmployee({ data, toggle }) {
  try {
    const response = yield call(addEmployeeAPi, data)
    yield put(getEmployeeListData())
    toggle()
    toast.success("Successfully saved!")
  } catch (e) {
    const { response } = e
    yield put(addEmployeeFailure(response?.data?.Error))
    toast.error(`${response?.data?.Error ? response?.data?.Error :'Something Wrong!'}`);
  } finally {
    yield put(reset())
  }
}

async function deleteEmployeeApi(id) {
  const URL = `${BASE_URL}/api/v1/users/user_info/${id}/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "DELETE"
  }

  return XHR(URL, options)
}

function* deleteEmployee({ id }) {
  try {
    const response = yield call(deleteEmployeeApi, id)
    yield put(getEmployeeListData())
    toast.success("Successfully deleted!")
  } catch (e) {
    const { response } = e
    toast.error('Someting wrong!');
  }
  finally {
    yield put(reset())
  }
}

async function updateEmployeeApi(data, id) {
  const URL = `${BASE_URL}/api/v1/users/user_info/${id}/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "PATCH",
    data
  }

  return XHR(URL, options)
}

function* updateEmployee({ data, id, toggle }) {
  try {
    const response = yield call(updateEmployeeApi, data, id)
    toggle()
    yield put(getEmployeeListData())
    toast.success("Successfully updated!")
  } catch (e) {
    const { response } = e
    yield put(addEmployeeFailure(response?.data))
    console.log('error', response?.data);
  }
  finally {
    yield put(reset())
  }
}

async function changeEmployeeTeamApi(data) {
  const URL = `${BASE_URL}/api/v1/users/change_employee_team/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "POST",
    data
  }

  return XHR(URL, options)
}

function* changeEmployeeTeam({ data }) {
  try {
    const response = yield call(changeEmployeeTeamApi, data)
    yield put(getEmployeeListData())
    toast.success("Successfully employee changed!")
  } catch (e) {
    const { response } = e
    toast.error('Someting wrong!');
  }
  finally {
    yield put(reset())
  }
}

export default all([
  takeLatest(GET_EMPLOYEE_LIST, getEmployeeList),
  takeLatest(ADD_EMPLOYEE, addEmployee),
  takeLatest(DELETE_EMPLOYEE, deleteEmployee),
  takeLatest(UPDATE_EMPLOYEE, updateEmployee),
  takeLatest(CHANGE_EMPLOYEE_TEAM, changeEmployeeTeam)
])
