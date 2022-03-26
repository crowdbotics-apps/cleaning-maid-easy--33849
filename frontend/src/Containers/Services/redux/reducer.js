import {
  GET_SERVICES,
  GET_SERVICES_SUCCESS,
  ADD_SERVICES_FAILURE,
  ADD_SERVICES,
  RESET,
} from './types';

const initialState = {
  requesting: false,
  servicesData: false,
  servicesError: false,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_SERVICES:
      case ADD_SERVICES:
      return {
        ...state,
        requesting: true,
      };

    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        requesting: false,
        servicesData: action.data
      };
      case ADD_SERVICES_FAILURE:
        return {
          ...state,
          requesting: false,
          servicesError: action.data
        };

      case RESET:
        return {
          ...state,
          requesting: false,
        };

    default:
      return state;
  }
};
