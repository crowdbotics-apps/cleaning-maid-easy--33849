import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

import toast from "react-hot-toast"

// utils
import XHR from "../../../utils/XHR"

import moment from "moment"

// types
import { GET_FREQUENCIES, UPDATE_SCHEDULE_SERVICE } from "./types"

// actions
import { getFrequenciesSuccess, scheduleServicesSuccess } from "./actions"
import { getPendingRequests } from "../../PendingServices/redux/actions"
import {
  getDayAcceptedAppointments,
  getWeekAcceptedAppointments,
  getMonthAcceptedAppointments
} from "../../Calendar/redux/actions"

async function updateScheduleServicesApi(data, id) {
  const URL = `${BASE_URL}/api/v1/operations/appointment/${id}/`
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

function* updateScheduleServices({
  data,
  id,
  setBtnText,
  closeUpdateModal,
  viewState,
  currentpage,
  isCalender,
}) {
  try {
    const response = yield call(updateScheduleServicesApi, data, id)
    if (isCalender) {
      closeUpdateModal(false)
    } else {
      setBtnText("Edit")
    }

    const newDate = sessionStorage.getItem("date")
    const currentDate = moment(newDate)

    if (viewState === 2) {
      const weekStart = currentDate.clone().startOf("isoWeek")
      const newWeekStart = weekStart.subtract(1, "days")
      const weekEnd = currentDate.clone().endOf("isoWeek")
      const newWeekEnd = weekEnd.subtract(1, "days")
      const startDate = moment(newWeekStart._d).format("YYYY-MM-DD")
      const endDate = moment(newWeekEnd._d).format("YYYY-MM-DD")
      yield put(getWeekAcceptedAppointments(startDate, endDate))
    } else if (viewState === 3) {
      const startOfMonth = moment(new Date(newDate))
        .startOf("month")
        .format("YYYY-MM-DD")
      const endOfMonth = moment(new Date(newDate))
        .endOf("month")
        .format("YYYY-MM-DD")
      yield put(getMonthAcceptedAppointments(startOfMonth, endOfMonth))
    } else {
      if (viewState !== undefined) {
        if(isCalender){
          const userDate = JSON.parse(newDate)
          const dateFormate = moment(userDate).format("YYYY-MM-DD")
          yield put(getDayAcceptedAppointments(dateFormate))
        }else {
          yield put(getPendingRequests(currentpage))
        }
       
      } else {
        yield put(getPendingRequests(currentpage))
      }
    }

    toast.success("Successfully schedule services updated!")
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  } finally {
    yield put(scheduleServicesSuccess())
  }
}

export default all([
  takeLatest(UPDATE_SCHEDULE_SERVICE, updateScheduleServices),
  takeLatest(GET_FREQUENCIES, getFrequencies)
])
