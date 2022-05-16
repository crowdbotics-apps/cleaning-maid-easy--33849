import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"
import toast from "react-hot-toast"

import moment from "moment"

// config
import { BASE_URL } from "../../../config/app"

// utils
import XHR from "../../../utils/XHR"

// types
import {
  GET_TEAM,
  GET_EMPLOYEES,
  CREATE_TEAM,
  DELETE_TEAM,
  GET_UN_ASSIGNED_EMPLOYEES,
  REMOVE_TEAM_MEMBER,
  ADD_TEAM_MEMBER
} from "./types"

// actions
import {
  getTeamSuccess,
  resetTeam,
  getEmployeesSuccess,
  getTeam,
  getUnAssignedEmployeesSuccess,
  getUnAssignedEmployees as getUnAssignedEmployeesData
} from "./actions"
// import {getDayAcceptedAppointments} from '../../Calendar/redux/actions'
import { getEmployeeList } from "../../Employees/redux/actions"

async function getTeamAPI(calenderDate) {
  const URL = `${BASE_URL}/api/v1/operations/teams${
    calenderDate ? "/?request_date=" + calenderDate : "/"
  }`
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

function* getTeams({ calenderDate }) {
  try {
    const response = yield call(getTeamAPI, calenderDate)
    yield put(getTeamSuccess(response.data))
  } catch (e) {
    const { response } = e
  } finally {
    yield put(resetTeam())
  }
}

async function getEmployeesAPI() {
  const URL = `${BASE_URL}/api/v1/users/users_list/?user_type=Employee`
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

function* getEmployees() {
  try {
    const response = yield call(getEmployeesAPI)
    yield put(getEmployeesSuccess(response?.data?.results))
  } catch (e) {
    const { response } = e
  } finally {
    yield put(resetTeam())
  }
}

async function createTeamApi(data) {
  const URL = `${BASE_URL}/api/v1/operations/create_team/`
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

function* createTeam({ data, setmodal, setSelectedMebers }) {
  try {
    const response = yield call(createTeamApi, data)
    if (response?.data?.Error) {
      toast.error(response?.data?.Error)
    } else {
      setmodal(false)
      setSelectedMebers([])
      yield put(getTeam())
      yield put(getUnAssignedEmployeesData(1))
      toast.success("Successfully saved!")
    }
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  } finally {
    yield put(resetTeam())
  }
}

async function deleteTeamApi(data) {
  const URL = `${BASE_URL}/api/v1/operations/teams/${data}/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "DELETE",
    data
  }

  return XHR(URL, options)
}

function* deleteTeam({ data }) {
  try {
    const response = yield call(deleteTeamApi, data)
    yield put(getTeam())
    toast.success("Successfully deleted!")
    yield put(getUnAssignedEmployeesData(1))
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  } finally {
    yield put(resetTeam())
  }
}

async function getUnAssignedEmployeesAPi(index) {
  const URL = `${BASE_URL}/api/v1/users/users_list/?page=${index}&un_assigned=${true}%2F%3Fpage%3D1&user_type=Employee`
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

function* getUnAssignedEmployees({ index }) {
  try {
    const response = yield call(getUnAssignedEmployeesAPi, index)
    yield put(getUnAssignedEmployeesSuccess(response?.data))
  } catch (e) {
    const { response } = e
  } finally {
    yield put(resetTeam())
  }
}

async function removeTeamMemberApi(data) {
  const URL = `${BASE_URL}/api/v1/operations/remove_team_member/`
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

function* removeTeamMember({ data, currentpage }) {
  try {
    const response = yield call(removeTeamMemberApi, data)
    yield put(getTeam())
    yield put(getUnAssignedEmployeesData(currentpage))
    // yield put (getDayAcceptedAppointments(date))
    toast.success("Successfully removed!")
    // const newDate = sessionStorage.getItem('date');
    // const userDate = JSON.parse(newDate)
    // const dateFormate=moment(userDate).format("YYYY-MM-DD")
    // yield put (getDayAcceptedAppointments(dateFormate))
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  } finally {
    yield put(resetTeam())
  }
}

async function addTeamMemberApi(data) {
  const URL = `${BASE_URL}/api/v1/operations/add_team_member/`
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

function* addTeamMember({ data, currentpage, isEmployee }) {
  try {
    const response = yield call(addTeamMemberApi, data)
    if (isEmployee) {
      yield put(getEmployeeList(currentpage))
    } else {
      yield put(getTeam())
      yield put(getUnAssignedEmployeesData(currentpage))
    }

    toast.success("Successfully added!")
    // const newDate = sessionStorage.getItem('date');
    // const userDate = JSON.parse(newDate)
    // const dateFormate=moment(userDate).format("YYYY-MM-DD")
    // yield put (getDayAcceptedAppointments(dateFormate))
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  } finally {
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
])
