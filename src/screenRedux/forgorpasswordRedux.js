import { all, call, put, takeLatest } from "redux-saga/effects"
import AsyncStorage from "@react-native-community/async-storage"
import { showMessage } from "react-native-flash-message"

// config
import { appConfig } from "src/config/app"

// utils
import XHR from "src/utils/XHR"
import { errorAlert } from "src/utils/alerts"

//Types
const FORGOT_PASSWORD = "SCREEN/FORGOT_PASSWORD"
const RESET = "SCREEN/RESET"

const initialState = {
  requesting: false
}

//Actions
export const forgotPassword = data => ({
  type: FORGOT_PASSWORD,
  data
})

export const reset = () => ({
  type: RESET
})

//Reducers
export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return {
        ...state,
        requesting: true
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
function forgotPasswordAPI(data) {
  const URL = `${appConfig.backendServerURL}/password_reset/`
  const options = {
    method: "POST",
    data
  }

  return XHR(URL, options)
}

function* forgotPasswordData({ data }) {
  try {
    const response = yield call(forgotPasswordAPI, data)
    showMessage({
      message: "Email send successfully",
      type: "success"
    })
  } catch (e) {
    if (e.response) {
      showMessage({
        message: e.response?.data?.email[0]
          ? e.response.data.email[0]
          : "Something went wrong",
        type: "danger"
      })
    }
  } finally {
    yield put(reset())
  }
}

export default all([takeLatest(FORGOT_PASSWORD, forgotPasswordData)])
