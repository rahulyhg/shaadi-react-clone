import { Reducer } from 'redux-testkit';
import shaadiCenters from '../../cartPage/shaadiCenters';
import factory from './utils/factory';

describe('reducer shaadi Centers', () => {
  describe('shaadi Centers', () => {
    it('should generate the shaadiCenters state on no action', () => {
      const state = Reducer(shaadiCenters).execute({});
      expect(state).toMatchObject({ cities: expect.any(Array) });
      expect(state).toMatchObject({ centers: expect.any(Array) });
      expect(state).toHaveProperty('loading');
      expect(state).toEqual(factory.theDefaultShaadiCentersState);
    });

    it('should generate the modified state on SUCCESS SHAADICENTERS API response', () => {
      const state = shaadiCenters(factory.theDefaultShaadiCentersState, {
        type: 'SHAADICENTER_SUCCESS',
        ...factory.shaadiCentersProps,
      });
      expect(state).toMatchObject({
        cities: expect.any(Array),
        centers: expect.any(Array),
        loading: false,
      });
      expect(state.cities.length).toEqual(2);
      expect(state.centers.length).toEqual(3);

      const state2 = shaadiCenters(factory.theDefaultShaadiCentersState, {
        type: 'SHAADICENTER_SUCCESS',
        action: { response: { data: { data: {} } } },
      });
      expect(state2).toMatchObject({
        cities: expect.any(Array),
        centers: expect.any(Array),
        loading: false,
      });
      expect(state2.cities.length).toEqual(0);
      expect(state2.centers.length).toEqual(0);
    });

    it('should generate the modified state on DETAILS SHAADICENTERS API requested', () => {
      const state = shaadiCenters(factory.theDefaultShaadiCentersState, {
        type: 'SHAADICENTER_REQUEST',
        action: { response: { data: { data: {} } } },
      });
      expect(state).toMatchObject({ cities: expect.any(Array) });
      expect(state).toMatchObject({ centers: expect.any(Array) });
      expect(state).toHaveProperty('loading');
      expect(state.cities.length).toEqual(0);
      expect(state.centers.length).toEqual(0);
      expect(state).toEqual(factory.theDefaultShaadiCentersState);
    });
  });
});
