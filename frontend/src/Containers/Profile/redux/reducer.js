import { GET_USER_INFO, GET_USER_INFO_SUCCESS } from "./types"

const initialState = {
  userInfo: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.data
      }

    default:
      return state
  }
}
