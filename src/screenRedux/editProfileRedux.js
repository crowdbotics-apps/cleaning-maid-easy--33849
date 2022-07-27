import { all, call, put, takeLatest } from "redux-saga/effects"
import AsyncStorage from "@react-native-community/async-storage"
import { showMessage } from "react-native-flash-message";
import {profileDataSuccess} from './myProfileRedux'

// config
import { appConfig } from "src/config/app"

// utils
import XHR from "src/utils/XHR"
import { errorAlert } from "src/utils/alerts"

//Types
const EDIT_PROFILE_DATA = "SCREEN/EDIT_PROFILE_DATA"
const RESET= "SCREEN/editprofile/RESET"

const initialState = {
  requesting: false,
}

//Actions
export const editProfile = (data, id) => ({
  type: EDIT_PROFILE_DATA,
  data,
  id
})

export const reset = () => ({
    type: RESET,
  })


//Reducers
export const editProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE_DATA:
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
async function editProfileAPI(data, id) {
  const URL = `${appConfig.backendServerURL}/api/v1/user_detail/${id}/`
  const accessToken = await AsyncStorage.getItem('authToken')
  const options = {
    headers: {
     Accept: 'application/json',
     'Content-Type': 'multipart/form-data',
      Authorization: `Token ${accessToken}`,
    },
    method: 'PATCH',
    data,
  }

  return XHR(URL, options)
}

function* editProfileData({data, id}) {
  try {
    const response = yield call(editProfileAPI, data, id)
    yield put(profileDataSuccess(response.data))
    showMessage({
        message: "Profile Updated Successfully",
        type: "success",
      });
  } catch (e) {
    showMessage({
        message: "Something went Wrong",
        type: "danger",
      });
  }
  finally {
    yield put(reset())
  }
}


export default all([
  takeLatest(EDIT_PROFILE_DATA, editProfileData)
])
