import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

// utils
import XHR from "../../../utils/XHR"

// types
import { SCHEDULE_SERVICE } from "./types"

// actions
import { scheduleServicesSuccess } from "./actions"

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

function* scheduleServices({ data }) {
  try {
    const response = yield call(scheduleServicesAPI, data)
    console.log("schedulr servoeea success", response)
  } catch (e) {
    const { response } = e
    console.log("schedulr servoeea failed", response)
  }
}

export default all([takeLatest(SCHEDULE_SERVICE, scheduleServices)])
