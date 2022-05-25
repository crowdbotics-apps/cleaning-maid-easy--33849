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
  GET_CALENDAR_TEAM_SUCCESS,
  RESET,
} from './types';

export const getTeam= (calenderDate) => ({
  type: GET_TEAM,
  calenderDate
});

export const getTeamSuccess = (data) => ({
  type: GET_TEAM_SUCCESS,
  data,
});

export const getCalenderTeamSuccess = (data) => ({
  type: GET_CALENDAR_TEAM_SUCCESS,
  data,
});

export const getEmployees= () => ({
  type: GET_EMPLOYEES,
});

export const getUnAssignedEmployees= (index) => ({
  type: GET_UN_ASSIGNED_EMPLOYEES,
  index
});

export const getUnAssignedEmployeesSuccess= (data) => ({
  type: GET_UN_ASSIGNED_EMPLOYEES_SUCCESS,
  data
});

export const getEmployeesSuccess = (data) => ({
  type: GET_EMPLOYEES_SUCCESS,
  data,
});

export const addTeamMember=(data,currentpage,isEmployee, isCalender)=>({
  type: ADD_TEAM_MEMBER,
  data,
  currentpage,
  isEmployee,
  isCalender
})

export const removeTeamMember=(data,currentpage)=>({
  type: REMOVE_TEAM_MEMBER,
  data,
  currentpage
})

export const createTeam= (data, setmodal,setSelectedMebers) => ({
  type: CREATE_TEAM,
  data,
  setmodal,
  setSelectedMebers
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

