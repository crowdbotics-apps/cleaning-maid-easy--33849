import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

// utils
import XHR from "../../../utils/XHR"

import toast from "react-hot-toast"

// types
import { GET_USER_INFO, EDIT_USER_INFO,UPLOAD_IMAGE } from "./types"

// actions
import { getUserInfoSuccess, editUserFailure } from "./actions"

async function getUserInfoAPI() {
  const URL = `${BASE_URL}/api/v1/users/user_info/me/`
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

function* getUserInfo() {
  try {
    const response = yield call(getUserInfoAPI)
    yield put(getUserInfoSuccess(response.data))
    sessionStorage.setItem("userInfo", JSON.stringify(response.data))
  } catch (e) {
    const { response } = e
  }
}

async function editUserInfoApi(data, id) {

  const URL = `${BASE_URL}/api/v1/users/user_info/${id}/`
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

function* editUserInfo({ data, id }) {
  try {
    const response = yield call(editUserInfoApi, data, id)
    yield put(getUserInfoSuccess(response.data))
    sessionStorage.setItem('userInfo', JSON.stringify(response.data))
    yield put(
      push({
        pathname: '/admin/profile',
      })
    );
    toast.success("Successfully profile updated!")
  } catch (e) {
    const { response } = e
    yield put(editUserFailure())
    toast.error('Someting wrong!');
  }
}

async function updateImageApi(data, id) {
  const URL = `${BASE_URL}/api/v1/users/user_info/${id}/`
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

function* updateImage({ data, id }) {
  try {
    const response = yield call(updateImageApi, data, id)
    yield put(getUserInfoSuccess(response.data))
    sessionStorage.setItem('userInfo', JSON.stringify(response.data))
    toast.success("Successfully image uploaded!")
  } catch (e) {
    const { response } = e
    yield put(editUserFailure())
    toast.error('Someting wrong!');
  }
}

export default all([
  takeLatest(GET_USER_INFO, getUserInfo),
  takeLatest(EDIT_USER_INFO, editUserInfo),
  takeLatest(UPLOAD_IMAGE, updateImage)

])
