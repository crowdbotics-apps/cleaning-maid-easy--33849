import { GET_ALL_CUSTOMERS, GET_ALL_CUSTOMERS_SUCCESS } from "./types"

const initialState = {
  requesting: false,
  customers: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        requesting: true
      }
    case GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        requesting: false,
        customers: action.data
      }

    default:
      return state
  }
}
