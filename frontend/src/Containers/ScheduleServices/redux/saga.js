import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

import toast from "react-hot-toast"

// utils
import XHR from "../../../utils/XHR"

// types
import { GET_FREQUENCIES, SCHEDULE_SERVICE } from "./types"

// actions
import { getFrequenciesSuccess, scheduleServicesSuccess } from "./actions"
import {getPendingRequests} from '../../PendingServices/redux/actions'

async function scheduleServicesAPI(data) {
  const URL = `${BASE_URL}/api/v1/operations/appointment/`
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

async function getFrequenciesAPI() {
  const URL = `${BASE_URL}/api/v1/operations/frequency/`
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

function* getFrequencies() {
  try {
    const response = yield call(getFrequenciesAPI)
    yield put(getFrequenciesSuccess(response.data))
  } catch (e) {
    const { response } = e
    yield put(getFrequenciesSuccess(false))

  }
}

function* scheduleServices({data,closeModal,setSlotsValue}) {
  try {
    const response = yield call(scheduleServicesAPI, data)
    // closeModal(false)
    if(closeModal){
      yield put(getPendingRequests(1))
    }
    toast.success("Successfully schedule services saved!")
    closeModal && setSlotsValue(false)
    closeModal ? closeModal(false) :yield put(
      push({
        pathname: '/admin/PendingServices',
      })
    );
    
  } catch (e) {
    const { response } = e
    toast.error('Someting wrong!');
  } finally {
    yield put(scheduleServicesSuccess())
  }
}

export default all([
  takeLatest(SCHEDULE_SERVICE, scheduleServices),
  takeLatest(GET_FREQUENCIES, getFrequencies)
])
