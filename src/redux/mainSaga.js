import { all } from 'redux-saga/effects';

// sagas
import login from '../screenRedux/loginRedux';
import forgot from '../screenRedux/forgorpasswordRedux'
import myProfile from '../screenRedux/myProfileRedux'
import editProfile from '../screenRedux/editProfileRedux'

export function* mainSaga() {
  yield all([
    login,
    forgot,
    myProfile,
    editProfile
  ]);
}