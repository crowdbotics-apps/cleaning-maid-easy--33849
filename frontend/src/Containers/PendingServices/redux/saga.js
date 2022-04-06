import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

// utils
import XHR from "../../../utils/XHR"
import toast from "react-hot-toast"

// types
import {
  GET_APPOINTMENT_DETAILS,
  GET_PENDING_REQUESTS,
  REQUEST_ACTION
} from "./types"

// actions
import {
  getPendingRequestsSuccess,
  reset,
  getAppointmentDetailsSuccess,
  getPendingRequests as getPendingRequestsData
} from "./actions"

async function getPendingRequestsAPI() {
  const URL = `${BASE_URL}/api/v1/operations/pending_requests/`
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

async function getApointmentDetailsAPI() {
  const URL = `${BASE_URL}/api/v1/operations/appointment/4/`
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

async function requestActionAPI(data) {
  const URL = `${BASE_URL}/api/v1/operations/request_action/`
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

function* requestAction({ data, modalToggle }) {
  try {
    const response = yield call(requestActionAPI, data)
    yield put (getPendingRequestsData())
    modalToggle()
    toast.success(`Successfully ${data?.action}ed!`)
  } catch (e) {
    const { response } = e
    toast.error('Someting wrong!');
  }
}

function* getPendingRequests() {
  try {
    const response = yield call(getPendingRequestsAPI)
    yield put(getPendingRequestsSuccess(response.data.results))
  } catch (e) {
    const { response } = e
  } finally {
    yield put(reset())
  }
}

function* getAppointmentDetails({ data }) {
  try {
    const response = yield call(getApointmentDetailsAPI, data)
    // yield put(getAppointmentDetailsSuccess(response.data.results))
  } catch (e) {
    const { response } = e
  } finally {
    yield put(reset())
  }
}

export default all([
  takeLatest(GET_PENDING_REQUESTS, getPendingRequests),
  takeLatest(GET_APPOINTMENT_DETAILS, getAppointmentDetails),
  takeLatest(REQUEST_ACTION, requestAction)
])
