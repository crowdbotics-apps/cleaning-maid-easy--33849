import {
  GET_PENDING_REQUESTS,
  GET_PENDING_REQUESTS_SUCCESS,
  GET_APPOINTMENT_DETAILS_SUCCESS,
  REQUEST_ACTION,
  RESET
} from "./types"
const initialState = {
  pendingRequests: false,
  requesting: false,
  appointmentDetails: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PENDING_REQUESTS:
    case REQUEST_ACTION:
      return {
        ...state,
        requesting: true
      }
    case GET_PENDING_REQUESTS_SUCCESS:
      return {
        ...state,
        requesting: false,
        pendingRequests: action.data
      }

    case GET_APPOINTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        requesting: false,
        appointmentDetails: action.data
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
