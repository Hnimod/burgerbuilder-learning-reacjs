import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.authLogoutSuccessful());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJ4oHA3OJU_Nomvn6PWUPcsKQy7CCr1DQ';
  if (!action.isSignup) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJ4oHA3OJU_Nomvn6PWUPcsKQy7CCr1DQ';
  }
  try {
    const res = yield axios.post(url, authData);

    const expirationDate = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', res.data.localId);

    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthtimeout(res.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthtimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.authLogout());
    }
  }
}
