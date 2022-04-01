import { GET_ALL_CUSTOMERS, GET_ALL_CUSTOMERS_SUCCESS,RESET,ADD_CUSTOMER,ADD_CUSTOMER_FAILURE} from "./types"

const initialState = {
  requesting: false,
  customers: false,
  backendError: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_CUSTOMERS:
      case ADD_CUSTOMER:
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

      case ADD_CUSTOMER_FAILURE:
      return {
        ...state,
        requesting: false,
        backendError: action.error
      }

      case RESET:
        return {
          ...state,
        requesting: false
        }

    default:
      return state
  }
}
