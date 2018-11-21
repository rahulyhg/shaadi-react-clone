import { Reducer } from 'redux-testkit';
import { identifySearchType } from '../../utils';
import facetBar from '../../otherSearch/facetBar';
import factory from './utils/factory';

describe('reducer otherSearch', () => {
  describe('facetBar', () => {
    it('should generate the the default facet on no action', () => {
      const state = Reducer(facetBar).execute({});
      expect(state.length).toEqual(2);
      expect(state).toMatchObject(factory.theDefaultFacet);
      expect(factory.theDefaultFacet).toMatchObject(state);
    });

    it('should handle annual_income correctly for broader', () => {
      const searchTypeDetail = identifySearchType('/search/broader');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_annual_income], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(2);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_annual_income);
      expect(factory.EXP_annual_income).toMatchObject(state[state.length - 1]);
    });

    it('should handle annual_income correctly for reverse', () => {
      const searchTypeDetail = identifySearchType('/search/personal');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_annual_income], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(1);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_annual_income);
      expect(factory.EXP_annual_income).toMatchObject(state[state.length - 1]);
    });

    it('should handle annual_income correctly for discovery', () => {
      const searchTypeDetail = identifySearchType('/search/discovery/recently-joined');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_annual_income], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_annual_income);
      expect(factory.EXP_annual_income).toMatchObject(state[state.length - 1]);
    });

    it('should handle photo_status correctly for broader', () => {
      const searchTypeDetail = identifySearchType('/search/broader');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_photo_status], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(2);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_photo_status);
      expect(factory.EXP_photo_status).toMatchObject(state[state.length - 1]);
    });

    it('should handle photo_status correctly for reverse', () => {
      const searchTypeDetail = identifySearchType('/search/personal');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_photo_status], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(1);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_photo_status);
      expect(factory.EXP_photo_status).toMatchObject(state[state.length - 1]);
    });

    it('should handle photo_status correctly for discovery', () => {
      const searchTypeDetail = identifySearchType('/search/discovery/recently-joined');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_photo_status], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_photo_status);
      expect(factory.EXP_photo_status).toMatchObject(state[state.length - 1]);
    });

    it('should handle marital_status correctly for 2way', () => {
      const searchTypeDetail = identifySearchType('/search/ematchmaker');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_marital_status], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(1);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_marital_status);
      expect(factory.EXP_marital_status).toMatchObject(state[state.length - 1]);
    });

    it('should handle marital_status correctly for discovery premium', () => {
      const searchTypeDetail = identifySearchType('/search/discovery/premium');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_marital_status], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_marital_status);
      expect(factory.EXP_marital_status).toMatchObject(state[state.length - 1]);
    });

    it('should handle search_v3 correctly for broader', () => {
      const searchTypeDetail = identifySearchType('/search/broader');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_search_v3], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(2);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_search_v3);
      expect(factory.EXP_search_v3).toMatchObject(state[state.length - 1]);
    });

    it('should handle search_v3 correctly for discovery', () => {
      const searchTypeDetail = identifySearchType('/search/discovery/premium');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_search_v3], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_search_v3);
      expect(factory.EXP_search_v3).toMatchObject(state[state.length - 1]);
    });

    it('should handle recently_joined correctly for recently joined', () => {
      const searchTypeDetail = identifySearchType('/search/discovery/premium');
      const action = factory.createProfileSuccessAction({ facets: [factory.FA_recently_joined], searchTypeDetail });
      const state = Reducer(facetBar).execute(action);
      expect(state.length).toEqual(3);
      expect(state[state.length - 1]).toMatchObject(factory.EXP_recently_joined);
      expect(factory.EXP_recently_joined).toMatchObject(state[state.length - 1]);
    });
  });
});
