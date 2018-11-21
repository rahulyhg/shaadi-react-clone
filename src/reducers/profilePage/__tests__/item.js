import { Reducer } from 'redux-testkit';
import profilePageItem from '../item';
import types from '../../../action_types';
import getPayload from './utils/currentState';

describe('profile', () => {
  describe('ON moving next', () => {
    it('should preserve state from previous actions ,if next and previous profile are the same', () => {
      const eoiState = {
        eoiLoadingStyle: 'none',
        justNow: true,
        justNowText: null,
        justNowIcon: 'test',
        justNowClass: 'test',
      };
      const initialReducer = profilePageItem(undefined, { type: types.PROFILE_SUCCESS, payload: getPayload(types.PROFILE_SUCCESS) });
      const updatedstate = Reducer(profilePageItem)
        .withState({
          ...initialReducer,
          ...eoiState,
        })
        .execute({ type: types.PROFILE_SUCCESS, payload: getPayload(types.PROFILE_SUCCESS) });

      expect(updatedstate.justNowText).toEqual(eoiState.justNowText);
    });
  });
  describe('PROFILE_PAGE_SUCCESS', () => {
    it('should Update previous profile data', () => {
      const initialReducer = profilePageItem(undefined, { type: types.PROFILE_SUCCESS, payload: getPayload(types.PROFILE_SUCCESS) });
      const newActionPayload = {
        ...getPayload(types.PROFILE_SUCCESS),
        uid: 'abcdef',
      };
      const updatedState = Reducer(profilePageItem)
        .withState(initialReducer)
        .execute({ type: types.PROFILE_PAGE_SUCCESS, payload: newActionPayload });
      expect(updatedState.uid).not.toBe(initialReducer.uid);
      expect(updatedState.uid).toBe(newActionPayload.uid);
    });
  });
});
