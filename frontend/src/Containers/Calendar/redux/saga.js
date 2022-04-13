import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

// utils
import XHR from "../../../utils/XHR"

import toast from "react-hot-toast"
import moment from "moment"

// types
import {
  GET_DAY_ACCEPTED_APPOINTEMENTS,
  GET_NOTES,
  ADD_NOTES,
  UPDATE_NOTES,
  GET_WEEK_ACCEPTED_APPOINTEMENTS,
  GET_MONTH_ACCEPTED_APPOINTEMENTS,
  EDIT_APPOINTMENT_CAL
} from "./types"

// actions
import {
  getDayAcceptedAppointmentsSuccess,
  getNotesSuccess,
  getNotes as getLatestNotes,
  reset,
  getDayAcceptedAppointments as getDayAcceptedAppointmentsData,
  getWeekAcceptedAppointments as getWeekAcceptedAppointmentsData,
  getMonthAcceptedAppointments as getMonthAcceptedAppointmentsData
} from "./actions"

async function getDayAcceptedAppointmentsApi(date) {
  const URL = `${BASE_URL}/api/v1/operations/day_calendar/?day=${date}`
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

function* getDayAcceptedAppointments({ date }) {
  try {
    const response = yield call(getDayAcceptedAppointmentsApi, date)
    yield put(getDayAcceptedAppointmentsSuccess(response.data))
  } catch (e) {
    const { response } = e
  }
}

async function getWeekAcceptedAppointmentsApi(startDate, endDate) {
  const URL = `${BASE_URL}/api/v1/operations/range_calendar/?date_from=${startDate}&date_to=${endDate}`
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

function* getWeekAcceptedAppointments({ startDate, endDate }) {
  try {
    const response = yield call(
      getWeekAcceptedAppointmentsApi,
      startDate,
      endDate
    )
    yield put(getDayAcceptedAppointmentsSuccess(response.data))
  } catch (e) {
    const { response } = e
  }
}

async function getMonthAcceptedAppointmentsApi(startDate, endDate) {
  const URL = `${BASE_URL}/api/v1/operations/range_calendar/?date_from=${startDate}&date_to=${endDate}`
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

function* getMonthAcceptedAppointments({ startDate, endDate }) {
  try {
    const response = yield call(
      getMonthAcceptedAppointmentsApi,
      startDate,
      endDate
    )
    yield put(getDayAcceptedAppointmentsSuccess(response.data))
  } catch (e) {
    const { response } = e
  }
}

async function getNotesApi() {
  const URL = `${BASE_URL}/api/v1/operations/notes/`
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

function* getNotes() {
  try {
    const response = yield call(getNotesApi)
    yield put(getNotesSuccess(response.data))
  } catch (e) {
    const { response } = e
  }
}

async function addNotesApi(data) {
  const URL = `${BASE_URL}/api/v1/operations/notes/`
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

function* addNotes({ data, toggle }) {
  try {
    yield call(addNotesApi, data)
    yield put(getLatestNotes())
    toggle()
    toast.success("Successfully saved!")
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  } finally {
    yield put(reset())
  }
}

async function updateNotesApi(data, id) {
  const URL = `${BASE_URL}/api/v1/operations/notes/${id}/`
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

function* updateNotes({ data, id, toggle }) {
  try {
    yield call(updateNotesApi, data, id)
    yield put(getLatestNotes())
    toggle()
    toast.success("Successfully updated!")
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  } finally {
    yield put(reset())
  }
}

async function editAppointmentCalApi(data, id) {
  const URL = `${BASE_URL}/api/v1/operations/appointment/${id}/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`
    },
    method: "PATCH",
    data
  }

  return XHR(URL, options)
}

function* editAppointmentCal({ data, id, viewState }) {
  try {
    yield call(editAppointmentCalApi, data, id)
    const newDate = sessionStorage.getItem("date")
    const weekDate = sessionStorage.getItem("weekDate")
    const monthDate = sessionStorage.getItem("monthDate")

    const userDate = JSON.parse(newDate)
    const userWeekDate = JSON.parse(weekDate)
    const userMonthDate = JSON.parse(monthDate)

    const dateFormate = moment(userDate).format("YYYY-MM-DD")
      
    if (viewState === 3) {
      const startDateMonth = moment(userMonthDate.startDate).format("YYYY-MM-DD")
    const endDateMonth = moment(userMonthDate.endDate).format("YYYY-MM-DD")

    yield put(getMonthAcceptedAppointmentsData(startDateMonth, endDateMonth))
    } else if (viewState === 2) {
      const startDateWeek = moment(userWeekDate.startDate).format("YYYY-MM-DD")
    const endDateWeek = moment(userWeekDate.endDate).format("YYYY-MM-DD")
      yield put(getWeekAcceptedAppointmentsData(startDateWeek, endDateWeek))
    } else {
      
      yield put(getDayAcceptedAppointmentsData(dateFormate))
    }

    toast.success("Successfully updated!")
  } catch (e) {
    const { response } = e
    console.log("error", response)
    toast.error("Someting wrong!")
  } finally {
    yield put(reset())
  }
}

export default all([
  takeLatest(GET_DAY_ACCEPTED_APPOINTEMENTS, getDayAcceptedAppointments),
  takeLatest(GET_NOTES, getNotes),
  takeLatest(ADD_NOTES, addNotes),
  takeLatest(UPDATE_NOTES, updateNotes),
  takeLatest(GET_WEEK_ACCEPTED_APPOINTEMENTS, getWeekAcceptedAppointments),
  takeLatest(GET_MONTH_ACCEPTED_APPOINTEMENTS, getMonthAcceptedAppointments),
  takeLatest(EDIT_APPOINTMENT_CAL, editAppointmentCal)
])
