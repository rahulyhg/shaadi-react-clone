import { Reducer } from 'redux-testkit';
import doorStep from '../../cartPage/doorStep';
import factory from './utils/factory';

describe('reducer door step', () => {
  describe('door step', () => {
    it('should generate the doorStep state on no action', () => {
      const state = Reducer(doorStep).execute({});
      expect(state).toMatchObject({ frequentlyUsedCities: expect.any(Array) });
      expect(state).toMatchObject({ moreCities: expect.any(Array) });
      expect(state).toHaveProperty('loading');
      expect(state).toEqual(factory.theDefaultDoorStepState);
    });

    it('should generate the modified state on SUCCESS DOORSTEP API response', () => {
      const state = doorStep(factory.theDefaultDoorStepState, {
        type: 'DOORSTEP_SUCCESS',
        ...factory.doorStepProps,
      });
      expect(state).toMatchObject({
        frequentlyUsedCities: expect.any(Array),
        moreCities: expect.any(Array),
        loading: false,
      });
      expect(state.frequentlyUsedCities.length).toEqual(1);
      expect(state.moreCities.length).toEqual(3);
    });

    it('should generate the modified state on DETAILS DOORSTEP API requested', () => {
      const state = doorStep(factory.theDefaultDoorStepState, {
        type: 'DOORSTEP_REQUEST',
        action: { response: { data: { data: {} } } },
      });
      expect(state).toMatchObject({ frequentlyUsedCities: expect.any(Array) });
      expect(state).toMatchObject({ moreCities: expect.any(Array) });
      expect(state).toHaveProperty('loading');
      expect(state.frequentlyUsedCities.length).toEqual(0);
      expect(state.moreCities.length).toEqual(0);
      expect(state).toEqual(factory.theDefaultDoorStepState);
    });
  });
});
