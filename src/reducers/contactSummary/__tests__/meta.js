import { Reducer } from 'redux-testkit';
import metaReducer from '../meta';
import factory from './utils/factory';

const metaFactory = factory.meta;

describe('reducer meta of contactSummary', () => {
  describe('items', () => {
    it('return default state no action', () => {
      const state = Reducer(metaReducer).execute({});
      expect(metaFactory.initialState).toMatchObject(state);
    });
    it('return when conatct summary data request', () => {
      const state = Reducer(metaReducer).execute(
        metaFactory.getAction('CONTACT_SUMMARY_DATA_REQUEST', {
          file_extension: 'webp',
          page: '2',
          pages: 0,
          request_id: 'eyJ0IjoxNTE5NDE3NTIzOTExfQ==',
          results_id: 'contacts:9d347dde80ed5c27569f7d50163d3e1d',
          t: 1519417523911,
          total: 0,
        }),
      );
      expect(factory.metaDataRequest).toMatchObject(state);
    });
    it('return when conatct summary data request without payload', () => {
      const state = Reducer(metaReducer).execute(metaFactory.getAction('CONTACT_SUMMARY_DATA_REQUEST', {}));
      expect(factory.metaDataRequestWithoutPayload).toMatchObject(state);
    });
    it('return when conatct summary data suceess', () => {
      const state = Reducer(metaReducer).execute(
        metaFactory.getAction('CONTACT_SUMMARY_DATA_SUCCESS', {
          meta: {
            page: '2',
            pages: 12,
            permaLink: '/inbox/contact-summary?pg_searchresults_id=contacts%3A9d347dde80ed5c27569f7d50163d3e1d&page=2',
            results_id: 'contacts:9d347dde80ed5c27569f7d50163d3e1d',
            total: 113,
          },
        }),
      );
      expect(factory.metaDataSuccess).toMatchObject(state);
    });
  });
});
