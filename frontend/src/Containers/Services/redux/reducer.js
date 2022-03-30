import {
  GET_SERVICES,
  GET_SERVICES_SUCCESS,
  ADD_SERVICES_FAILURE,
  ADD_SERVICES,
  RENDER_HTML_TEXT,
  RESET
} from "./types"

const initialState = {
  requesting: false,
  servicesData: false,
  servicesError: false,
  htmlText: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
    case ADD_SERVICES:
      return {
        ...state,
        requesting: true
      }

    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        requesting: false,
        servicesData: action.data,
        servicesError:false
      }
    case ADD_SERVICES_FAILURE:
      return {
        ...state,
        requesting: false,
        servicesError: action.data
      }
    case RENDER_HTML_TEXT:
      return {
        ...state,
        htmlText: action.data
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
