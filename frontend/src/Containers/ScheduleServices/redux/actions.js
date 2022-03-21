import { SCHEDULE_SERVICE, SCHEDULE_SERVICE_SUCCESS } from "./types"

export const scheduleServices = (data) => ({
  type: SCHEDULE_SERVICE,
  data
})

export const scheduleServicesSuccess = () => ({
  type: SCHEDULE_SERVICE_SUCCESS
})
