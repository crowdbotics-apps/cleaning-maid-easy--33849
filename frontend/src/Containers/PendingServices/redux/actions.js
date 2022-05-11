import {
  GET_PENDING_REQUESTS,
  GET_PENDING_REQUESTS_SUCCESS,
  GET_APPOINTMENT_DETAILS_SUCCESS,
  RESET,
  REQUEST_ACTION
} from "./types"

export const getPendingRequests = (index) => ({
  type: GET_PENDING_REQUESTS,
  index
})

export const getPendingRequestsSuccess = data => ({
  type: GET_PENDING_REQUESTS_SUCCESS,
  data
})

export const reset = () => ({
  type: RESET
})

export const getAppointmentDetailsSuccess = data => ({
  type: GET_APPOINTMENT_DETAILS_SUCCESS,
  data
})

export const requestAction = (data, modalToggle,index) => ({
  type: REQUEST_ACTION,
  data,
  modalToggle,
  index
})
