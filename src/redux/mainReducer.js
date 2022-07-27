import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// reducers
import register from '../screens/Register/redux/reducer';
import {loginReducer} from "../screenRedux/loginRedux"
import {forgotPasswordReducer} from '../screenRedux/forgorpasswordRedux'
import {myProfileReducer} from '../screenRedux/myProfileRedux'
import {editProfileReducer} from '../screenRedux/editProfileRedux'

const appPersistConfig = {
  key: 'login',
  storage: AsyncStorage,
  timeout: null,
};

export default {
  login: persistReducer(appPersistConfig, loginReducer),
  register,
  forgotPasswordReducer,
  myProfileReducer,
  editProfileReducer
};
