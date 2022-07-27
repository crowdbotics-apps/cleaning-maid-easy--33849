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
  getRequesting: false,
  changeEmployeeRequesting:false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
    case UPDATE_EMPLOYEE:
      case DELETE_EMPLOYEE:
      return {
        ...state,
        requesting: true
      }

      case CHANGE_EMPLOYEE_TEAM:
        return {
          ...state,
          changeEmployeeRequesting: true
        }

    case GET_EMPLOYEE_LIST:
      return {
        ...state,
        getRequesting: true
      }

    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employeesList: action.data,
        changeEmployeeRequesting:false,
        getRequesting: false,
        requesting: false,
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
        requesting: false,
        changeEmployeeRequesting:false
      }
    default:
      return state
  }
}
