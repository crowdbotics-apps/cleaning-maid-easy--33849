import {
  GET_DAY_ACCEPTED_APPOINTEMENTS,
  GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS,
  GET_WEEK_ACCEPTED_APPOINTEMENTS,
  GET_MONTH_ACCEPTED_APPOINTEMENTS,
  GET_NOTES,
  GET_NOTES_SUCCESS,
  ADD_NOTES,
  UPDATE_NOTES,
  RESET
} from "./types"

const initialState = {
  requesting: false,
  appointmentsDays: [],
  notes: false,
  notesRequesting:false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_DAY_ACCEPTED_APPOINTEMENTS:
      case GET_WEEK_ACCEPTED_APPOINTEMENTS:
        case GET_MONTH_ACCEPTED_APPOINTEMENTS:
      return {
        ...state,
        requesting: true
      }

    case GET_NOTES:
    case ADD_NOTES:
    case UPDATE_NOTES:
      return {
        ...state,
        notesRequesting: true
      }

    case GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS:
      return {
        ...state,
        requesting: false,
        appointmentsDays: action.data
      }

    case GET_NOTES_SUCCESS:
      return {
        ...state,
        notesRequesting: false,
        notes: action.data
      }
    // case ADD_SERVICES_FAILURE:
    //   return {
    //     ...state,
    //     requesting: false,
    //     servicesError: action.data
    //   };

    case RESET:
      return {
        ...state,
        notesRequesting: false
      }

    default:
      return state
  }
}
