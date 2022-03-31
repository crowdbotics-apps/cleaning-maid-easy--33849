import {
  GET_TEAM,
  GET_TEAM_SUCCESS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  CREATE_TEAM,
  CREATE_TEAM_FAILURE,
  DELETE_TEAM,
  GET_UN_ASSIGNED_EMPLOYEES,
  GET_UN_ASSIGNED_EMPLOYEES_SUCCESS,
  REMOVE_TEAM_MEMBER,
  ADD_TEAM_MEMBER,
  RESET,
} from './types';

export const getTeam= () => ({
  type: GET_TEAM,
});

export const getTeamSuccess = (data) => ({
  type: GET_TEAM_SUCCESS,
  data,
});

export const getEmployees= () => ({
  type: GET_EMPLOYEES,
});

export const getUnAssignedEmployees= () => ({
  type: GET_UN_ASSIGNED_EMPLOYEES,
});

export const getUnAssignedEmployeesSuccess= (data) => ({
  type: GET_UN_ASSIGNED_EMPLOYEES_SUCCESS,
  data
});

export const getEmployeesSuccess = (data) => ({
  type: GET_EMPLOYEES_SUCCESS,
  data,
});

export const addTeamMember=(data)=>({
  type: ADD_TEAM_MEMBER,
  data,
})

export const removeTeamMember=(data)=>({
  type: REMOVE_TEAM_MEMBER,
  data,
})

export const createTeam= (data, setmodal) => ({
  type: CREATE_TEAM,
  data,
  setmodal
});

export const createTeamFailure= (data) => ({
  type: CREATE_TEAM_FAILURE,
  data,
});

export const deleteTeam= (data) => ({
  type: DELETE_TEAM,
  data,
});

export const resetTeam = () => ({
  type: RESET
});

