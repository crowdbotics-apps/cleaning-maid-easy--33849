import {
  GET_TERMS_CONDITIONS_SUCCESS,
  GET_PRIVACY_POLICY_SUCCESS
} from "./types"

const initialState = {
  requesting: false,
  termsConditions: false,
  privacyPolicy: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_TERMS_CONDITIONS_SUCCESS:
      return {
        ...state,
        termsConditions: action.data,
      }
      case GET_PRIVACY_POLICY_SUCCESS:
        return {
          ...state,
          privacyPolicy: action.data,
        }
    default:
      return state
  }
}
