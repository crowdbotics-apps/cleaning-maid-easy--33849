import { GET_ALL_CUSTOMERS, GET_ALL_CUSTOMERS_SUCCESS,ADD_CUSTOMER } from "./types"

export const getAllCustomers = () => ({
  type: GET_ALL_CUSTOMERS
})

export const addCustomer = (data) => ({
  type: ADD_CUSTOMER,
  data
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
