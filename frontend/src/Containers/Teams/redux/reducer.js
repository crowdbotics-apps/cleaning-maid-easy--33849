import {
  GET_TEAM,
  GET_TEAM_SUCCESS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  CREATE_TEAM,
  DELETE_TEAM,
  GET_UN_ASSIGNED_EMPLOYEES,
  GET_UN_ASSIGNED_EMPLOYEES_SUCCESS,
  GET_CALENDAR_TEAM_SUCCESS,
  RESET
} from "./types"

const initialState = {
  employeesData: false,
  requesting: false,
  teamData: [],
  employeeRequesting: false,
  deleteRequesting: false,
  createRequesting: false,
  unAssignedEmployees: false,
  calendarTeamData:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM:
      return {
        ...state,
        requesting: true
      }
    case GET_EMPLOYEES:
    case GET_UN_ASSIGNED_EMPLOYEES:
      return {
        ...state,
        employeeRequesting: true
      }
    case GET_EMPLOYEES:
    case GET_UN_ASSIGNED_EMPLOYEES:
      return {
        ...state,
        employeeRequesting: true
      }

    case GET_TEAM_SUCCESS:
      return {
        ...state,
        requesting: false,
        teamData: action.data
      }

      case GET_CALENDAR_TEAM_SUCCESS:
        return {
          ...state,
          requesting: false,
          calendarTeamData: action.data
        }
        
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeeRequesting: false,
        employeesData: action.data
      }

    case GET_UN_ASSIGNED_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeeRequesting: false,
        unAssignedEmployees: action.data
      }

    case DELETE_TEAM:
      return {
        ...state,
        deleteRequesting: true
      }
    case CREATE_TEAM:
      return {
        ...state,
        createRequesting: true
      }
    case RESET:
      return {
        ...state,
        requesting: false,
        employeeRequesting: false,
        deleteRequesting: false,
        createRequesting: false
      }

    default:
      return state
  }
}
