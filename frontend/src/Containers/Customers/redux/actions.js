import { GET_ALL_CUSTOMERS, GET_ALL_CUSTOMERS_SUCCESS,ADD_CUSTOMER,ADD_CUSTOMER_FAILURE,CHANGE_NOTIFICATION,UPDATE_CUSTOMER,DELETE_CUSTOMER,SEARCH_CUSTOMERS,RESET } from "./types"

export const getAllCustomers = (index, isTrue) => ({
  type: GET_ALL_CUSTOMERS,
  index,
  isTrue
})

export const addCustomer = (data,toggle,currentpage) => ({
  type: ADD_CUSTOMER,
  data,
  toggle,
  currentpage
})

export const changeNotification = (data,id,currentpage) => ({
  type: CHANGE_NOTIFICATION,
  data,
  id,
  currentpage
})

export const searchCustomers = (data) => ({
  type: SEARCH_CUSTOMERS,
  data,
})

export const updateCustomer = (data,id,toggle,currentpage) => ({
  type: UPDATE_CUSTOMER,
  data,
  id,
  toggle,
  currentpage
})

export const deleteCustomer = (id,currentpage) => ({
  type: DELETE_CUSTOMER,
  id,
  currentpage
})


// export const getService = () => ({
//   type: GET_ALL_CUSTOMERS
// })

// export const getFrequency = () => ({
//   type: GET_ALL_CUSTOMERS
// })

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
