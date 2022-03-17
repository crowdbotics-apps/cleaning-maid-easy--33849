import {
  GET_TEAM,
  GET_TEAM_SUCCESS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  CREATE_TEAM,
  DELETE_TEAM,
  RESET,
} from './types';

const initialState = {
  employeesData: false,
  requesting: false,
  teamData: false,
  employeeRequesting: false,
  deleteRequesting: false,
  createRequesting: false,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_TEAM:
      return {
        ...state,
        requesting: true,
      };
      case GET_EMPLOYEES:
        return {
          ...state,
          employeeRequesting: true,
        };

    case GET_TEAM_SUCCESS:
      return {
        ...state,
        requesting: false,
        teamData: action.data
      };
      case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeeRequesting: false,
        employeesData: action.data
      };
      case DELETE_TEAM:
        return {
          ...state,
          deleteRequesting: true,
        };
        case CREATE_TEAM:
          return {
            ...state,
            createRequesting: true,
          };
      case RESET:
        return {
          ...state,
          requesting: false,
          employeeRequesting: false,
          deleteRequesting: false,
          createRequesting: false
        };

    default:
      return state;
  }
};
