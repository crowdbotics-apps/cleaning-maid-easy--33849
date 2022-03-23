import {
  GET_DAY_ACCEPTED_APPOINTEMENTS,
  GET_NOTES,
  GET_NOTES_SUCCESS,
  GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS
} from './types';

export const  getDayAcceptedAppointments= (date) => ({
  type: GET_DAY_ACCEPTED_APPOINTEMENTS,
  date
});

export const getNotes= () => ({
  type: GET_NOTES,
});

export const getNotesSuccess= (data) => ({
  type: GET_NOTES_SUCCESS,
  data
});

export const getDayAcceptedAppointmentsSuccess = (data) => ({
  type: GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS,
  data,
});

