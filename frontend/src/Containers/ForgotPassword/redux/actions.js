import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FALUIRE,
  FORGOT_PASSWORD_RESET_MSG,
  RESET_NEW_PASSWORD
} from "./types"

export const forgetPasswordRequest = data => ({
  type: FORGOT_PASSWORD_REQUEST,
  data
})

export const resetNewPassword = data => ({
  type: RESET_NEW_PASSWORD,
  data
})

export const forgotPasswordSuccess = data => ({
  type: FORGOT_PASSWORD_SUCCESS,
  data
})

export const forgotPasswordFaluire = error => ({
  type: FORGOT_PASSWORD_FALUIRE,
  error
})

export const resetMsg = () => ({
  type: FORGOT_PASSWORD_RESET_MSG
})
