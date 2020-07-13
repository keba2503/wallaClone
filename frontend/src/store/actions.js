import * as TYPES from './types';
import { getADSSQuantityInCart } from './selectors';

import ADSService from '../services/ADS';

export const fetchADSRequest = () => ({
  type: TYPES.FETCH_ADS_REQUEST,
});

export const fetchADSFailure = error => ({
  type: TYPES.FETCH_ADS_FAILURE,
  error,
});

export const fetchADSSuccess = ADS => ({
  type: TYPES.FETCH_ADS_SUCCESS,
  ADS,
});

export const fetchADS = () =>
  async function (dispatch, getState) {
    dispatch(fetchADSRequest());
    try {
      const ADS = await ADSService.getAllADS();
      dispatch(fetchADSSuccess(ADS));
    } catch (error) {
      dispatch(fetchADSFailure(error));
    }
  };

export const addToCartRequest = () => ({
  type: TYPES.ADD_TO_CART_REQUEST,
});

export const addToCartSuccess = (ADSSId, quantity = 1) => ({
  type: TYPES.ADD_TO_CART_SUCCESS,
  ADSSId,
  quantity,
});

export const addToCartFailure = error => ({
  type: TYPES.ADD_TO_CART_FAILURE,
  error,
});

export const addToCart = ADSSId =>
  async function (dispatch, getState, { ADSService }) {
    dispatch(addToCartRequest());
    try {
      await ADSService.addToCart();
      dispatch(addToCartSuccess(ADSSId));
    } catch (error) {
      dispatch(addToCartFailure(error));
    }
  };

export const removeFromCartRequest = () => ({
  type: TYPES.REMOVE_FROM_CART_REQUEST,
});

export const removeFromCartSuccess = (ADSSId, quantity) => ({
  type: TYPES.REMOVE_FROM_CART_SUCCESS,
  ADSSId,
  quantity,
});

export const removeFromCartFailure = error => ({
  type: TYPES.REMOVE_FROM_CART_FAILURE,
  error,
});

export const removeFromCart = ADSSId =>
  async function (dispatch, getState, { ADSService }) {
    dispatch(removeFromCartRequest());
    try {
      await ADSService.removeFromCart();
      const quantity = getADSSQuantityInCart(getState(), ADSSId);
      dispatch(removeFromCartSuccess(ADSSId, quantity));
    } catch (error) {
      dispatch(removeFromCartFailure(error));
    }
  };

export const checkoutCartRequest = () => ({
  type: TYPES.CHECKOUT_CART_REQUEST,
});

export const checkoutCartSuccess = () => ({
  type: TYPES.CHECKOUT_CART_SUCCESS,
});

export const checkoutCartFailure = error => ({
  type: TYPES.CHECKOUT_CART_FAILURE,
  error,
});

export const checkoutCartAndNavigate = () =>
  async function (dispatch, getState, { ADSService, history }) {
    dispatch(checkoutCartRequest());
    try {
      await ADSService.checkoutCart();
      dispatch(checkoutCartSuccess());
      history.push('/');
    } catch (error) {
      dispatch(checkoutCartFailure(error));
    }
  };
