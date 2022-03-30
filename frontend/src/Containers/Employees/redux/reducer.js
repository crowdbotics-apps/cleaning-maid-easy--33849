import {
  ADD_EMPLOYEE,
  GET_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  RESET,
  GET_EMPLOYEE_LIST,
  UPDATE_EMPLOYEE,
  CHANGE_EMPLOYEE_TEAM,
  DELETE_EMPLOYEE
} from "./types"

const initialState = {
  requesting: false,
  backendError: false,
  employeesList: false,
  getRequesting: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
    case UPDATE_EMPLOYEE:
    case CHANGE_EMPLOYEE_TEAM:
      case DELETE_EMPLOYEE:
      return {
        ...state,
        requesting: true
      }

    case GET_EMPLOYEE_LIST:
      return {
        ...state,
        getRequesting: true
      }

    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employeesList: action.data
      }

    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        backendError: action.error
      }
    case RESET:
      return {
        ...state,
        getRequesting: false,
        requesting: false
      }
    default:
      return state
  }
}
