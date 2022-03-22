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
export function* mainSaga() {
  yield all([login, forgotPassword, services, teams, pendingRequests,calendar,scheduleServices])
}