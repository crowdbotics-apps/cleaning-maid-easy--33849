import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

// utils
import XHR from "../../../utils/XHR"
import toast from "react-hot-toast"

// types
import {
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

async function getPendingRequestsAPI(index) {
  const URL = `${BASE_URL}/api/v1/operations/pending_requests/?page=${index}`
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

function* requestAction({ data, modalToggle,index }) {
  try {
    const response = yield call(requestActionAPI, data)
    yield put (getPendingRequestsData(index))
    modalToggle()
    toast.success(`Successfully ${data?.action}ed!`)
  } catch (e) {
    const { response } = e
    toast.error('Someting wrong!');
  }
}

function* getPendingRequests({index}) {
  try {
    const response = yield call(getPendingRequestsAPI,index)
    yield put(getPendingRequestsSuccess(response.data))
  } catch (e) {
    const { response } = e
  } finally {
    yield put(reset())
  }
}


export default all([
  takeLatest(GET_PENDING_REQUESTS, getPendingRequests),
  takeLatest(REQUEST_ACTION, requestAction)
])
