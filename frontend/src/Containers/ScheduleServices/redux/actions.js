import {
  SCHEDULE_SERVICE,
  SCHEDULE_SERVICE_SUCCESS,
  GET_FREQUENCIES,
  GET_FREQUENCIES_SUCCESS
} from "./types"

export const scheduleServices = (data, closeModal,setSlotsValue) => ({
  type: SCHEDULE_SERVICE,
  data,
  closeModal,
  setSlotsValue
})

export const scheduleServicesSuccess = () => ({
  type: SCHEDULE_SERVICE_SUCCESS
})

export const getFrequencies = () => ({
  type: GET_FREQUENCIES
})

export const getFrequenciesSuccess = data => ({
  type: GET_FREQUENCIES_SUCCESS,
  data
})
