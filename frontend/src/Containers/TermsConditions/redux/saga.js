import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

// utils
import XHR from "../../../utils/XHR"

// types
import { GET_TERMS_CONDITIONS, GET_PRIVACY_POLICY } from "./types"

// actions
import { getTermsConditionsSuccess, getPrivacyPolicySuccess,reset } from "./actions"

async function getTermsConditionsApi() {
  const URL = `${BASE_URL}/api/v1/terms_and_conditions/`
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

function* getTermsConditions() {
  try {
    const response = yield call(getTermsConditionsApi)
    yield put(getTermsConditionsSuccess(response.data))
  } catch (e) {
    const { response } = e
  }
  finally {
    yield put(reset())
  }
}

async function getPrivacyPolicyApi() {
  const URL = `${BASE_URL}/api/v1/privacy_policy/`
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

function* getPrivacyPolicy() {
  try {
    const response = yield call(getPrivacyPolicyApi)
    yield put(getPrivacyPolicySuccess(response.data))
  } catch (e) {
    const { response } = e
  }
 finally {
    yield put(reset())
  }
}

export default all([
  takeLatest(GET_TERMS_CONDITIONS, getTermsConditions),
  takeLatest(GET_PRIVACY_POLICY, getPrivacyPolicy)
])
