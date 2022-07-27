import {
  GET_TERMS_CONDITIONS_SUCCESS,
  GET_PRIVACY_POLICY_SUCCESS,
  GET_TERMS_CONDITIONS,
  GET_PRIVACY_POLICY,
  RESET
} from "./types"

const initialState = {
  requesting: false,
  termsConditions: false,
  privacyPolicy: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TERMS_CONDITIONS:
    case GET_PRIVACY_POLICY:
      return {
        ...state,
        requesting: true
      }

    case GET_TERMS_CONDITIONS_SUCCESS:
      return {
        ...state,
        termsConditions: action.data,
        requesting: false
      }
    case GET_PRIVACY_POLICY_SUCCESS:
      return {
        ...state,
        privacyPolicy: action.data,
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
