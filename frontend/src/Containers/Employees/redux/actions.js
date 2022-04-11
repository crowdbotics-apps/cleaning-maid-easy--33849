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

export const addEmployee = (data,toggle,currentpage) => ({
  type: ADD_EMPLOYEE,
  data,
  toggle,
  currentpage
})

export const getEmployeeList = (index) => ({
  type: GET_EMPLOYEE_LIST,
  index
})

export const updateEmployee = (data,id,toggle,currentpage) => ({
  type: UPDATE_EMPLOYEE,
  data,
  id,
  toggle,
  currentpage
})

export const deleteEmployee = (id,currentpage) => ({
  type: DELETE_EMPLOYEE,
  id,
  currentpage
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