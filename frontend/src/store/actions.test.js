import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import * as TYPES from './types';

import ADSService from '../services/ADS';

jest.mock('../services/ADS');

const history = {
  push: jest.fn(),
};

const middlewares = [thunk.withExtraArgument({ ADSService, history })];
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('actions', () => {
  describe('addToCartSuccess', () => {
    test('should create one ADD_TO_CART_SUCCESS action with ADSSId and quantity', () => {
      const ADSSId = '5';
      const quantity = 8;
      const expectedAction = {
        type: TYPES.ADD_TO_CART_SUCCESS,
        ADSSId,
        quantity,
      };
      expect(actions.addToCartSuccess(ADSSId, quantity)).toEqual(
        expectedAction
      );
    });

    test('should create one ADD_TO_CART_SUCCESS action with ADSSId and quantity 1', () => {
      const ADSSId = '5';
      const expectedAction = {
        type: TYPES.ADD_TO_CART_SUCCESS,
        ADSSId,
        quantity: 1,
      };
      expect(actions.addToCartSuccess(ADSSId)).toEqual(expectedAction);
    });
  });

  describe('fetchADS', () => {
    test('should dispatch FETCH_ADS_REQUEST and FETCH_ADS_SUCCESS actions', async () => {
      const dispatch = jest.fn();
      const action = actions.fetchADS();
      const getState = () => {};
      const ADS = [];
      ADSService.getAllADS.mockResolvedValue(ADS);

      await action(dispatch, getState);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: TYPES.FETCH_ADS_REQUEST,
      });

      expect(ADSService.getAllADS).toHaveBeenCalled();

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: TYPES.FETCH_ADS_SUCCESS,
        ADS,
      });
    });

    test('should dispatch FETCH_ADS_REQUEST and FETCH_ADS_FAILURE actions', async () => {
      const action = actions.fetchADS();
      const dispatch = jest.fn();
      const getState = () => {};
      const error = 'error';
      ADSService.getAllADS.mockRejectedValue(error);

      await action(dispatch, getState);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: TYPES.FETCH_ADS_REQUEST,
      });

      expect(ADSService.getAllADS).toHaveBeenCalled();

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: TYPES.FETCH_ADS_FAILURE,
        error,
      });
    });
  });

  describe('checkoutCartAndNavigate', () => {
    beforeEach(async () => {
      await store.dispatch(actions.checkoutCartAndNavigate());
    });

    test('should dispatch actions', () => {
      const expectedActions = [
        { type: TYPES.CHECKOUT_CART_REQUEST },
        { type: TYPES.CHECKOUT_CART_SUCCESS },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('should redirect to home', () => {
      expect(history.push).toHaveBeenCalledWith('/');
    });
  });
});
