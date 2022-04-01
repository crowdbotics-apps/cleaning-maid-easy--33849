import {
  EDIT_USER_INFO,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  EDIT_USER_FAILURE
} from "./types"

export const getUserInfo = () => ({
  type: GET_USER_INFO
})

export const editUserInfo = (data, id) => ({
  type: EDIT_USER_INFO,
  data,
  id
})

export const getUserInfoSuccess = data => ({
  type: GET_USER_INFO_SUCCESS,
  data
})

export const editUserFailure = () => ({
  type: EDIT_USER_FAILURE
})
