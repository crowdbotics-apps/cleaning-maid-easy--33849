import {
  GET_FREQUENCIES,
  GET_FREQUENCIES_SUCCESS,
  SCHEDULE_SERVICE,
  SCHEDULE_SERVICE_SUCCESS
} from "./types"

const initialState = {
  requesting: false,
  frequencies: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULE_SERVICE:
      return {
        ...state,
        requesting: true
      }
    case SCHEDULE_SERVICE_SUCCESS:
      return {
        ...state,
        requesting: false
      }

    case GET_FREQUENCIES_SUCCESS:
      return {
        ...state,
        frequencies: action.data
      }

    default:
      return state
  }
}
