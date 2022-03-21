import {
  GET_DAY_ACCEPTED_APPOINTEMENTS,
  GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS,
} from './types';

const initialState = {
  requesting: false,
  appointmentsDays: false,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_DAY_ACCEPTED_APPOINTEMENTS:
      return {
        ...state,
        requesting: true,
      };

    case GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS:
      return {
        ...state,
        requesting: false,
        appointmentsDays: action.data
      };
      // case ADD_SERVICES_FAILURE:
      //   return {
      //     ...state,
      //     requesting: false,
      //     servicesError: action.data
      //   };

    default:
      return state;
  }
};
