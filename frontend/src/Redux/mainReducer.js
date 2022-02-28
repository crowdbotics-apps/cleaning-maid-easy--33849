import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {connectRouter} from 'connected-react-router'

//Reducers
import login from "../Containers/Login/redux/reducer"
import forgotPassword from "../Containers/ForgotPassword/redux/reducer"


const signInPersistConfig = {
    key: 'login',
    storage,
    timeout: null
  }

export const combinedReducers = history => ({
    login: persistReducer(signInPersistConfig, login),
    forgotPassword
})
