import {
  GET_PENDING_REQUESTS,
  GET_PENDING_REQUESTS_SUCCESS,
  GET_APPOINTMENT_DETAILS,
  GET_APPOINTMENT_DETAILS_SUCCESS,
  RESET,
  REQUEST_ACTION
} from "./types"

export const getPendingRequests = () => ({
  type: GET_PENDING_REQUESTS
})

export const getPendingRequestsSuccess = data => ({
  type: GET_PENDING_REQUESTS_SUCCESS,
  data
})

export const reset = () => ({
  type: RESET
})

export const getAppointmentDetails = () => ({
  type: GET_APPOINTMENT_DETAILS
})

export const getAppointmentDetailsSuccess = data => ({
  type: GET_APPOINTMENT_DETAILS_SUCCESS,
  data
})

export const requestAction = (data, modalToggle) => ({
  type: REQUEST_ACTION,
  data,
  modalToggle
})