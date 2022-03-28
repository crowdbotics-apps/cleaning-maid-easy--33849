import { GET_ALL_CUSTOMERS, GET_ALL_CUSTOMERS_SUCCESS } from "./types"

export const getAllCustomers = () => ({
  type: GET_ALL_CUSTOMERS
})

export const getAllCustomersSuccess = data => ({
  type: GET_ALL_CUSTOMERS_SUCCESS,
  data
})
