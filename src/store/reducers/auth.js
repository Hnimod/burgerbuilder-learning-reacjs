import * as actionTypes from '../actions/actionTypes';
import updateState from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authStart = (state, action) => {
  return updateState(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateState(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateState(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateState(state, initialState);
};

const setAuthRedirectPath = (state, action) => {
  return updateState(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
