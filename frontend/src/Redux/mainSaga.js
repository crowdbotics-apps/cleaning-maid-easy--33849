import { all } from "redux-saga/effects"
import { push } from "connected-react-router"

//Saga
import login from "../Containers/Login/redux/saga"
import forgotPassword from "../Containers/ForgotPassword/redux/saga"
import services from "../Containers/Services/redux/saga"
import teams from "Containers/Teams/redux/saga"
import pendingRequests from "Containers/PendingServices/redux/saga"
import scheduleServices from 'Containers/ScheduleServices/redux/saga'
import calendar from 'Containers/Calendar/redux/saga'
import employees from 'Containers/Employees/redux/saga'
import profile from "Containers/Profile/redux/saga"
import customers from "Containers/Customers/redux/saga"
import termsConditions from '../Containers/TermsConditions/redux/saga'
import notifications from '../Containers/Notifications/redux/saga'
import updateScheduleServices from '../Containers/UpdateScheduleServices/redux/saga'

export function* mainSaga() {
  yield all([login, forgotPassword, services, teams, pendingRequests,calendar,scheduleServices,employees,profile,customers,termsConditions,notifications,updateScheduleServices])
}
