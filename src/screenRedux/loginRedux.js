import { all, call, put, takeLatest } from "redux-saga/effects"
import AsyncStorage from "@react-native-community/async-storage"
import { showMessage } from "react-native-flash-message"

// config
import { appConfig } from "src/config/app"

// utils
import XHR from "src/utils/XHR"
import { errorAlert } from "src/utils/alerts"

//Types
const LOGIN = "SCREEN/LOGIN"
const FACEBOOK_LOGIN = "SCREEN/FACEBOOK_LOGIN"
const GOOGLE_LOGIN = "SCREEN/GOOGLE_LOGIN"
const SET_ACCESS_TOKEN = "SCREEN/SET_ACCESS_TOKEN"
const SET_USER_DETAIL = "SCREEN/SET_USER_DETAIL"
const RESET = "SCREEN/RESET"

const initialState = {
  requesting: false,
  userDetail: false,
  accessToken: false
}

//Actions
export const loginUser = data => ({
  type: LOGIN,
  data
})

export const facebookLoginUser = accessToken => ({
  type: FACEBOOK_LOGIN,
  accessToken
})

export const googleLoginUser = accessToken => ({
  type: GOOGLE_LOGIN,
  accessToken
})

export const setAccessToken = accessToken => ({
  type: SET_ACCESS_TOKEN,
  accessToken
})

export const setUserDetail = data => ({
  type: SET_USER_DETAIL,
  data
})

export const reset = () => ({
  type: RESET
})

//Reducers
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        requesting: true
      }

    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
        requesting: false
      }
    case SET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.data,
        requesting: false
      }

    case RESET:
      return {
        ...state,
        requesting: false
      }

    default:
      return state
  }
}

//Saga
function loginAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/login/`
  const options = {
    method: "POST",
    data
  }

  return XHR(URL, options)
}

function facebookLoginAPI(accessToken) {
  const data = { access_token: accessToken }
  const URL = `${appConfig.backendServerURL}/modules/social-auth/facebook/login/`
  const options = {
    method: "POST",
    data
  }

  return XHR(URL, options)
}

function googleLoginAPI(accessToken) {
  const data = { access_token: accessToken }
  const URL = `${appConfig.backendServerURL}/modules/social-auth/google/login/`
  const options = {
    method: "POST",
    data
  }

  return XHR(URL, options)
}

function* login({ data }) {
  try {
    const response = yield call(loginAPI, data)
    AsyncStorage.setItem("authToken", response.data.token)

    yield put(setAccessToken(response.data.token))
    yield put(setUserDetail(response.data.user))

    showMessage({
      message: "Login successfully",
      type: "success"
    })
  } catch (e) {
    yield put(reset())
    showMessage({
      message: "Invalid email and password",
      type: "danger"
    })
  }
}

function* facebookLogin({ accessToken }) {
  try {
    const res = yield call(facebookLoginAPI, accessToken)
    AsyncStorage.setItem("authToken", res.data.key)

    yield put(setAccessToken(res.data.key))
    yield put(setUserDetail(res.data.user_detail))
    showMessage({
      message: "Facebook login successfully",
      type: "success"
    })
  } catch (e) {
    const { response } = e
    yield put(reset())
    showMessage({
      message: "Something want wronge",
      type: "danger"
    })
  }
}

function* googleLogin({ accessToken }) {
  try {
    const res = yield call(googleLoginAPI, accessToken)
    AsyncStorage.setItem("authToken", res.data.key)

    yield put(setAccessToken(res.data.key))
    yield put(setUserDetail(res.data.user_detail))
    showMessage({
      message: "Google login successfully",
      type: "success"
    })
  } catch (e) {
    const { response } = e
    yield put(reset())
    showMessage({
      message: response?.data?.non_field_errors[0]
        ? response.data.non_field_errors[0]
        : "Something want wrong",
      type: "danger"
    })
  }
}

export default all([
  takeLatest(LOGIN, login),
  takeLatest(FACEBOOK_LOGIN, facebookLogin),
  takeLatest(GOOGLE_LOGIN, googleLogin)
])
