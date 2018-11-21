import { Reducer } from 'redux-testkit';
import astroReducer from '../astro';
import factory from './utils/factory';

describe('reducer profile', () => {
  describe('astros', () => {
    it('return default state no action', () => {
      const state = Reducer(astroReducer).execute({});
      expect(state).toMatchObject(factory.astroState.default);
      expect(factory.astroState.default).toMatchObject(state);
    });

    it('return correct state on successfull api call having no astro', () => {
      const state = Reducer(astroReducer).execute({
        type: 'GET_PROFILE_ASTRO_SUCCESS',
        payload: {
          data: {
            details: {},
            chart: {},
          },
        },
      });
      expect(state).toMatchObject(factory.astroState.default);
      expect(factory.astroState.default).toMatchObject(state);
    });

    it('astro success', () => {
      const state = Reducer(astroReducer).execute({
        type: 'GET_PROFILE_ASTRO_REQUEST',
        payload: {
          data: {
            details: {},
            chart: {},
          },
        },
      });
      expect(state).toMatchObject(factory.astroState.default);
      expect(factory.astroState.default).toMatchObject(state);
    });

    it('astro success with empty payload', () => {
      const state = Reducer(astroReducer).execute({
        type: 'GET_PROFILE_ASTRO_SUCCESS',
        payload: {},
      });
      expect(state).toMatchObject(factory.astroState.default);
      expect(factory.astroState.default).toMatchObject(state);
    });

    it('astro success with empty charts or details', () => {
      const state = Reducer(astroReducer).execute({
        type: 'GET_PROFILE_ASTRO_SUCCESS',
        payload: {
          data: {
            details: null,
          },
        },
      });
      expect(state).toMatchObject(factory.astroState.default);
      expect(factory.astroState.default).toMatchObject(state);
    });

    it('astro fail', () => {
      const state = Reducer(astroReducer).execute({
        type: 'GET_PROFILE_ASTRO_FAIL',
        payload: {
          data: {
            details: {},
            chart: {},
          },
        },
      });
      expect(state).toMatchObject(factory.astroState.default);
      expect(factory.astroState.default).toMatchObject(state);
    });
  });
});
