import {
  EDIT_USER_INFO,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  EDIT_USER_FAILURE
} from "./types"

const initialState = {
  requesting: false,
  userInfo: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER_INFO:
      return {
        ...state,
        requesting: true
      }

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.data,
        requesting: false
      }
    case EDIT_USER_FAILURE:
      return {
        ...state,
        requesting: false
      }
    default:
      return state
  }
}
