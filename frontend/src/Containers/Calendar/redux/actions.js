import {
  GET_DAY_ACCEPTED_APPOINTEMENTS,
  GET_NOTES,
  GET_NOTES_SUCCESS,
  GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS,
  ADD_NOTES,
  UPDATE_NOTES
} from "./types"

export const getDayAcceptedAppointments = (date) => ({
  type: GET_DAY_ACCEPTED_APPOINTEMENTS,
  date,
})

export const getNotes = () => ({
  type: GET_NOTES
})

export const addNotes = (data, setNoteModal) => ({
  type: ADD_NOTES,
  data,
  setNoteModal
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

export const getDayAcceptedAppointmentsSuccess = data => ({
  type: GET_DAY_ACCEPTED_APPOINTEMENTS_SUCCESS,
  data
})
