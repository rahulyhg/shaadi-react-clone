import { Reducer } from 'redux-testkit';
import uaeCities from '../../cartPage/uaeCities';
import factory from './utils/factory';

describe('reducer UAE Cities', () => {
  describe('UAE Cities', () => {
    it('should generate the uaeCities state on no action', () => {
      const state = Reducer(uaeCities).execute({});
      expect(state).toMatchObject({ cities: expect.any(Array) });
      expect(state).toMatchObject({ centers: expect.any(Array) });
      expect(state).toHaveProperty('loading');
      expect(state).toEqual(factory.theDefaultUaeCitiesState);
    });

    it('should generate the modified state on SUCCESS SHAADICENTERS API response', () => {
      const state = uaeCities(factory.theDefaultUaeCitiesState, {
        type: 'UAE_EXCHANGE_SUCCESS',
        ...factory.shaadiCentersProps,
      });
      expect(state).toMatchObject({
        cities: expect.any(Array),
        centers: expect.any(Array),
        loading: false,
      });
      expect(state.cities.length).toEqual(2);
      expect(state.centers.length).toEqual(3);

      const state2 = uaeCities(factory.theDefaultShaadiCentersState, {
        type: 'UAE_EXCHANGE_SUCCESS',
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
      const state = uaeCities(factory.theDefaultUaeCitiesState, {
        type: 'UAE_EXCHANGE_REQUEST',
        action: { response: { data: { data: {} } } },
      });
      expect(state).toMatchObject({ cities: expect.any(Array) });
      expect(state).toMatchObject({ centers: expect.any(Array) });
      expect(state).toHaveProperty('loading');
      expect(state.cities.length).toEqual(0);
      expect(state.centers.length).toEqual(0);
      expect(state).toEqual(factory.theDefaultUaeCitiesState);
    });
  });
});
