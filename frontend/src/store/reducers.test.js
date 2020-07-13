import * as reducers from './reducers';
import * as TYPES from './types';

describe('reducers', () => {
  describe('ADS', () => {
    test('should handle ANY action', () => {
      const action = {
        type: TYPES.ANY_ACTION,
      };
      const expectedState = [];
      expect(reducers.ADS(undefined, action)).toEqual(expectedState);
    });

    test('should handle a FETCH_ADS_SUCCESS action', () => {
      const initialState = [];
      const ADS = [{ id: '1', stock: 10 }];
      const action = {
        type: TYPES.FETCH_ADS_SUCCESS,
        ADS,
      };
      const expectedState = ADS;
      expect(reducers.ADS(initialState, action)).toEqual(expectedState);
    });
  });
});
