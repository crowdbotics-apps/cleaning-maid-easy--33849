import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { connectRouter } from "connected-react-router"

//Reducers
import login from "../Containers/Login/redux/reducer"
import forgotPassword from "../Containers/ForgotPassword/redux/reducer"
import services from "Containers/Services/redux/reducer"
import teams from "Containers/Teams/redux/reducer"
import pendingRequests from "Containers/PendingServices/redux/reducer"
import calendar from 'Containers/Calendar/redux/reducer'

import scheduleServices from 'Containers/ScheduleServices/redux/reducer'
// const signInPersistConfig = {
//     key: 'login',
//     storage,
//     timeout: null
//   }

export const combinedReducers = history => ({
  login,
  forgotPassword,
  services,
  teams,
  pendingRequests,
  calendar,
  scheduleServices
})
