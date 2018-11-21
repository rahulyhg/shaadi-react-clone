import { Reducer } from 'redux-testkit';
import pagination from '../pagination';
import factory from './utils/factory';

describe('reducer inbox', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(pagination).execute({});
    expect(state).toEqual(factory.pagination.state.default);
  });

  it('Should generate state on action INBOX_DATA_REQUEST', () => {
    const state = Reducer(pagination).execute({ type: 'INBOX_DATA_REQUEST' });
    expect(state).toEqual(factory.pagination.state.request);
  });

  it('Should generate state on action INBOX_DATA_SUCCESS', () => {
    const payload = factory.pagination.payload.success;
    const state = Reducer(pagination).execute({ type: 'INBOX_DATA_SUCCESS', payload });
    expect(state).toEqual(factory.pagination.state.success);
  });
});
