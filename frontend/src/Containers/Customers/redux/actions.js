import { GET_ALL_CUSTOMERS, GET_ALL_CUSTOMERS_SUCCESS,ADD_CUSTOMER,ADD_CUSTOMER_FAILURE,CHANGE_NOTIFICATION,SEARCH_CUSTOMERS,RESET } from "./types"

export const getAllCustomers = () => ({
  type: GET_ALL_CUSTOMERS
})

export const addCustomer = (data,toggle) => ({
  type: ADD_CUSTOMER,
  data,
  toggle
})

export const changeNotification = (data,id) => ({
  type: CHANGE_NOTIFICATION,
  data,
  id
})

export const searchCustomers = (data) => ({
  type: SEARCH_CUSTOMERS,
  data,
})

export const getService = () => ({
  type: GET_ALL_CUSTOMERS
})

export const getFrequency = () => ({
  type: GET_ALL_CUSTOMERS
})

export const getAllCustomersSuccess = data => ({
  type: GET_ALL_CUSTOMERS_SUCCESS,
  data
})

export const addCustomerFailure = error => ({
  type: ADD_CUSTOMER_FAILURE,
  error
})

export const reset = () => ({
  type: RESET
})
