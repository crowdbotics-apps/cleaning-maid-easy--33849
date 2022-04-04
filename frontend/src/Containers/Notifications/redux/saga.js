import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

// utils
import XHR from "../../../utils/XHR"

// types
import { GET_NOTIFICATIONS,READ_NOTIFICATIONS,REPLY_NOTIFICATIONS} from "./types"

// actions
import { getNotificaionsSuccess,  } from "./actions"

async function getNotificaionsAPi() {
  const URL = `${BASE_URL}/api/v1/operations/notifications/`
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

function* getNotificaions() {
  try {
    const response = yield call(getNotificaionsAPi)
    yield put(getNotificaionsSuccess(response.data))
  } catch (e) {
    const { response } = e
  }
}


async function readNotificaionsAPi(id) {
  const URL = `${BASE_URL}/api/v1/operations/read_notification/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "POST",
    id
  }

  return XHR(URL, options)
}

function* readNotificaions({id}) {
  try {
    const response = yield call(readNotificaionsAPi,id)
    // yield put(getNotificaionsSuccess(response.data))
  } catch (e) {
    const { response } = e
  }
}


async function replyNotificaionsAPi(data) {
  const URL = `${BASE_URL}/api/v1/operations/reply_notification/`
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

function* replyNotificaions({id}) {
  try {
    const response = yield call(readNotificaionsAPi,id)
    // yield put(getNotificaionsSuccess(response.data))
  } catch (e) {
    const { response } = e
  }
}



export default all([
  takeLatest(GET_NOTIFICATIONS, getNotificaions),
  takeLatest(READ_NOTIFICATIONS, readNotificaions),
  takeLatest(REPLY_NOTIFICATIONS, replyNotificaions)

])
