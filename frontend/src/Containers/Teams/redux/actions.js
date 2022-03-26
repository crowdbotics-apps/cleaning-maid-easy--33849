import {
  GET_TEAM,
  GET_TEAM_SUCCESS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  CREATE_TEAM,
  CREATE_TEAM_FAILURE,
  DELETE_TEAM,
  RESET,
} from './types';

export const  getTeam= () => ({
  type: GET_TEAM,
});

export const getTeamSuccess = (data) => ({
  type: GET_TEAM_SUCCESS,
  data,
});

export const  getEmployees= () => ({
  type: GET_EMPLOYEES,
});

export const getEmployeesSuccess = (data) => ({
  type: GET_EMPLOYEES_SUCCESS,
  data,
});

export const  createTeam= (data, setmodal) => ({
  type: CREATE_TEAM,
  data,
  setmodal
});

export const  createTeamFailure= (data) => ({
  type: CREATE_TEAM_FAILURE,
  data,
});

export const  deleteTeam= (data) => ({
  type: DELETE_TEAM,
  data,
});

export const resetTeam = () => ({
  type: RESET
});

