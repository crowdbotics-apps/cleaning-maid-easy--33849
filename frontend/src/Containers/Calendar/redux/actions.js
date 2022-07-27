import {
  GET_DAY_ACCEPTED_APPOINTEMENTS,
  GET_NOTES,
  GET_NOTES_SUCCESS,
  GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS,
  GET_WEEK_ACCEPTED_APPOINTEMENTS,
  GET_MONTH_ACCEPTED_APPOINTEMENTS,
  ADD_NOTES,
  UPDATE_NOTES,
  EDIT_APPOINTMENT_CAL,
  RESET,
} from "./types"

export const getDayAcceptedAppointments = (date) => ({
  type: GET_DAY_ACCEPTED_APPOINTEMENTS,
  date,
})

export const getWeekAcceptedAppointments = (startDate, endDate) => ({
  type: GET_WEEK_ACCEPTED_APPOINTEMENTS,
  startDate,
  endDate
})

export const getMonthAcceptedAppointments = (startDate, endDate) => ({
  type: GET_MONTH_ACCEPTED_APPOINTEMENTS,
  startDate,
  endDate
})

export const getNotes = () => ({
  type: GET_NOTES
})

export const addNotes = (data, toggle) => ({
  type: ADD_NOTES,
  data,
  toggle
})

export const updateNotes = (data,id, toggle) => ({
  type: UPDATE_NOTES,
  data,
  id,
  toggle
})

export const getNotesSuccess = data => ({
  type: GET_NOTES_SUCCESS,
  data
})


export const editAppointmentCal = (data, details) => ({
  type: EDIT_APPOINTMENT_CAL,
  data,
  details
})



export const getDayAcceptedAppointmentsSuccess = data => ({
  type: GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS,
  data
})

export const reset = () => ({
  type: RESET
})
