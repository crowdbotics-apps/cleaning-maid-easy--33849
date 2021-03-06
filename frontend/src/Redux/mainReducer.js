import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { connectRouter } from "connected-react-router"

//Reducers
import login from "../Containers/Login/redux/reducer"
import forgotPassword from "../Containers/ForgotPassword/redux/reducer"
import services from "Containers/Services/redux/reducer"
import teams from "Containers/Teams/redux/reducer"
import pendingRequests from "Containers/PendingServices/redux/reducer"
import scheduleServices from "Containers/ScheduleServices/redux/reducer"
import profile from "Containers/Profile/redux/reducer"
import calendar from 'Containers/Calendar/redux/reducer'
import employees from 'Containers/Employees/redux/reducer'

import customers from 'Containers/Customers/redux/reducer'
import termsConditions from '../Containers/TermsConditions/redux/reducer'
import notifications from '../Containers/Notifications/redux/reducer'
import updateScheduleServices from '../Containers/UpdateScheduleServices/redux/reducer'


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
  scheduleServices,
  profile,
  calendar,
  scheduleServices,
  employees,
  customers,
  termsConditions,
  notifications,
  updateScheduleServices
})
