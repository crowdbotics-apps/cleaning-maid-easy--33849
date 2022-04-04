import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
} from "./types"

const initialState = {
  requesting: false,
  notifications: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.data,
      }
    
    default:
      return state
  }
}
