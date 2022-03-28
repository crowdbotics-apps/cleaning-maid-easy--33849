import { GET_USER_INFO, GET_USER_INFO_SUCCESS } from "./types"

export const getUserInfo = () => ({
  type: GET_USER_INFO
})

export const getUserInfoSuccess = data => ({
  type: GET_USER_INFO_SUCCESS,
  data
})
