import {
  GET_DAY_ACCEPTED_APPOINTEMENTS,
  GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS,
} from './types';

export const  getDayAcceptedAppointments= (date) => ({
  type: GET_DAY_ACCEPTED_APPOINTEMENTS,
  date
});

export const getDayAcceptedAppointmentsSuccess = (data) => ({
  type: GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS,
  data,
});

