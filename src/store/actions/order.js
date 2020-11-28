import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
  };
};

export const fetchOrdersSuccess = (fetchOrders) => {
  return {
    type: actionTypes.FETCH_ODERS_SUCCESS,
    orders: fetchOrders,
  };
};

export const fetchOrdersFail = () => {
  return {
    type: actionTypes.FETCH_ODERS_FAIL,
  };
};

export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ODERS_INIT,
  };
};

export const purchaseBurgerFetching = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token,
  };
};

export const fetchOrdersStart = (token, userId) => {
  return {
    type: actionTypes.FETCH_ODERS,
    token: token,
    userId: userId,
  };
};
