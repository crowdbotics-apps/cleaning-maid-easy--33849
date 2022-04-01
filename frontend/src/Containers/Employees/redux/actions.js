import {
  ADD_EMPLOYEE,
  GET_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_LIST,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  CHANGE_EMPLOYEE_TEAM,
  RESET
} from "./types"

export const addEmployee = (data,toggle) => ({
  type: ADD_EMPLOYEE,
  data,
  toggle
})

export const getEmployeeList = () => ({
  type: GET_EMPLOYEE_LIST,
})

export const updateEmployee = (data,id,toggle) => ({
  type: UPDATE_EMPLOYEE,
  data,
  id,
  toggle
})

export const deleteEmployee = id => ({
  type: DELETE_EMPLOYEE,
  id
})

export const changeEmployeeTeam=(data)=>({
  type: CHANGE_EMPLOYEE_TEAM,
  data
})

export const getEmployeeSuccess = data => ({
  type: GET_EMPLOYEE_SUCCESS,
  data
})

export const addEmployeeFailure = error => ({
  type: ADD_EMPLOYEE_FAILURE,
  error
})

export const reset = () => ({
  type: RESET,
})