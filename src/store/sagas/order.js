import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const res = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.orderData
    );
    yield put(actions.purchaseBurgerSuccess(res.data, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersInit());

  try {
    const res = yield axios.get(
      `/orders.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
    );

    const fetchOrders = [];
    for (let key in res.data) {
      fetchOrders.push({
        ...res.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail());
  }
}
