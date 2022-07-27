import {
  GET_SERVICES,
  GET_SERVICES_SUCCESS,
  ADD_SERVICES,
  ADD_SERVICES_FAILURE,
  RESET,
  RENDER_HTML_TEXT,
  EDIT_SERVICES,
  DELETE_SERVICES
} from "./types"

export const getServices = () => ({
  type: GET_SERVICES
})

export const getServicesSuccess = data => ({
  type: GET_SERVICES_SUCCESS,
  data
})

export const addServices = (data, closeModal) => ({
  type: ADD_SERVICES,
  data,
  closeModal
})
export const editServices = (data, id, closeModal) => ({
  type: EDIT_SERVICES,
  data,
  id,
  closeModal
})

export const deleteServices = id => ({
  type: DELETE_SERVICES,
  id
})

export const addServicesFailure = data => ({
  type: ADD_SERVICES_FAILURE,
  data
})

export const renderHtmlText = data => ({
  type: RENDER_HTML_TEXT,
  data
})

export const resetServices = () => ({
  type: RESET
})
