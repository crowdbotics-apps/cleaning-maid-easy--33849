import {
  SCHEDULE_SERVICE_SUCCESS,
  GET_FREQUENCIES,
  GET_FREQUENCIES_SUCCESS,
  UPDATE_SCHEDULE_SERVICE
} from "./types"


export const updateScheduleServices = (data,id, setBtnText,closeUpdateModal, viewState,currentpage, isCalender) => ({
  type: UPDATE_SCHEDULE_SERVICE,
  data,
  id,
  setBtnText,
  closeUpdateModal,
  viewState,
  currentpage,
  isCalender
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
