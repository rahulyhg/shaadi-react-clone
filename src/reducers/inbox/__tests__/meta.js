import { Reducer } from 'redux-testkit';
import meta from '../meta';
import factory from './utils/factory';

describe('reducer inbox', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(meta).execute({});
    expect(state).toEqual(factory.meta.state.default);
  });

  it('Should generate state on action INBOX_DATA_REQUEST', () => {
    const payload = factory.meta.payload.request;
    const state = Reducer(meta).execute({ type: 'INBOX_DATA_REQUEST', payload });
    expect(state).toEqual(factory.meta.state.request);
  });

  it('Should generate state on action INBOX_DATA_SUCCESS', () => {
    const payload = factory.meta.payload.success;
    const state = Reducer(meta).execute({ type: 'INBOX_DATA_SUCCESS', payload });
    expect(state).toEqual(factory.meta.state.success);
  });

  it('Should generate state on action COUNTS_SUCCESS', () => {
    const payload = factory.meta.payload.count_success;
    const state = Reducer(meta).execute({ type: 'COUNTS_SUCCESS', payload });
    expect(state).toEqual(factory.meta.state.count_success);
  });
});
