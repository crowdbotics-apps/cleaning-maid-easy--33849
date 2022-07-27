import { all, call, put, takeLatest } from "redux-saga/effects"
import AsyncStorage from "@react-native-community/async-storage"
import { showMessage } from "react-native-flash-message"

// config
import { appConfig } from "src/config/app"

// utils
import XHR from "src/utils/XHR"
import { errorAlert } from "src/utils/alerts"

//Types
const GET_PROFILE_DATA = "SCREEN/GET_PROFILE_DATA"
const RESET = "SCREEN/RESET"
const GET_PROFILE_DATA_SUCCESS = "SCREEN/GET_PROFILE_DATA_SUCCESS"

const initialState = {
  requesting: false,
  profileData: false
}

//Actions
export const profileDataAction = data => ({
  type: GET_PROFILE_DATA,
  data
})

export const reset = () => ({
  type: RESET
})

export const profileDataSuccess = data => ({
  type: GET_PROFILE_DATA_SUCCESS,
  data
})

//Reducers
export const myProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_DATA:
      return {
        ...state,
        requesting: true
      }
    case GET_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        requesting: false,
        profileData: action.data
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
async function getProfileDataAPI(data) {
  const URL = `${appConfig.backendServerURL}/api/v1/user_detail/${data}/`
  const accessToken = await AsyncStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${accessToken}`
    },
    method: "GET"
  }

  return XHR(URL, options)
}

function* getProfileData({ data }) {
  try {
    const response = yield call(getProfileDataAPI, data)

    yield put(profileDataSuccess(response.data))
  } catch (e) {
    if(e.response){
      
    }
  } finally {
    yield put(reset())
  }
}

export default all([takeLatest(GET_PROFILE_DATA, getProfileData)])
