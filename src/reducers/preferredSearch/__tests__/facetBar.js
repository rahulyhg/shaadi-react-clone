import { Reducer } from 'redux-testkit';
import facetBar from '../../preferredSearch/facetBar';
import factory from './utils/factory';

describe('reducer preferredSearch', () => {
  describe('facetBar', () => {
    it('should generate the the default facet on no action', () => {
      const state = Reducer(facetBar).execute({});
      expect(state.length).toEqual(2);
      expect(state).toMatchObject(factory.theDefaultFacet);
      expect(factory.theDefaultFacet).toMatchObject(state);
    });

    it('should handle annual_income correctly', () => {
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_annual_income] });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_annual_income);
      expect(factory.EXP_annual_income).toMatchObject(state[state.length - 1]);
    });

    it('should handle photo_status correctly', () => {
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_photo_status] });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_photo_status);
      expect(factory.EXP_photo_status).toMatchObject(state[state.length - 1]);
    });

    it('should handle marital_status correctly', () => {
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_marital_status] });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_marital_status);
      expect(factory.EXP_marital_status).toMatchObject(state[state.length - 1]);
    });

    it('should handle search_v3 correctly', () => {
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_search_v3] });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_search_v3);
      expect(factory.EXP_search_v3).toMatchObject(state[state.length - 1]);
    });

    it('should handle recently_joined correctly', () => {
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_recently_joined] });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_recently_joined);
      expect(factory.EXP_recently_joined).toMatchObject(state[state.length - 1]);
    });

    it('should handle drink correctly', () => {
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_drink] });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_drink);
      expect(factory.EXP_drink).toMatchObject(state[state.length - 1]);
    });

    it('should handle smoke correctly', () => {
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_smoke] });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_smoke);
      expect(factory.EXP_smoke).toMatchObject(state[state.length - 1]);
    });

    it('should handle diet correctly', () => {
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_diet] });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_diet);
      expect(factory.EXP_diet).toMatchObject(state[state.length - 1]);
    });
  });
});
