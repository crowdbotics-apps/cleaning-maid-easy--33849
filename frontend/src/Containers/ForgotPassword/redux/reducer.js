import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FALUIRE,
  FORGOT_PASSWORD_RESET_MSG,
  RESET_NEW_PASSWORD
} from "./types"

const initialState = {
  msg: false,
  requesting: false,
  error: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_NEW_PASSWORD:
      return {
        ...state,
        requesting: true
      }

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        requesting: false,
        msg: action.data
      }

    case FORGOT_PASSWORD_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error
      }
    case FORGOT_PASSWORD_RESET_MSG:
      return {
        ...state,
        error: "",
        msg: ""
      }

    default:
      return state
  }
}
