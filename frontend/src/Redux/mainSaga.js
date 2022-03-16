import {all} from 'redux-saga/effects'
import {push} from 'connected-react-router'

//Saga
import login from "../Containers/Login/redux/saga"
import forgotPassword from "../Containers/ForgotPassword/redux/saga"
import services from '../Containers/Services/redux/saga'

export function* mainSaga() {
  yield all([
    login,
    forgotPassword,
    services
  ])
}
