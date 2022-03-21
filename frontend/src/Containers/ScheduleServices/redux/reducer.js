import { SCHEDULE_SERVICE, SCHEDULE_SERVICE_SUCCESS } from "./types"

const initialState = {
  requesting: false
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

    default:
      return state
  }
}
