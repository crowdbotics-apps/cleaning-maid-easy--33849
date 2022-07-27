import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  REPLY_NOTIFICATIONS,
  READ_NOTIFICATIONS
} from "./types"

export const getNotificaions = () => ({
  type: GET_NOTIFICATIONS
})

export const readNotificaions = (id) => ({
  type: READ_NOTIFICATIONS,
  id
})

export const replyNotificaions = (data) => ({
  type: REPLY_NOTIFICATIONS,
  data
})

export const getNotificaionsSuccess = data => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  data
})