import { Reducer } from 'redux-testkit';
import results from '../results';
import factory from './utils/factory';

describe('reducer inbox', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(results).execute({});
    expect(state).toEqual(factory.results.state.default);
  });

  it('Should generate state on action INBOX_DATA_SUCCESS', () => {
    const payload = factory.results.payload.success;
    const state = Reducer(results).execute({ type: 'INBOX_DATA_SUCCESS', payload });
    expect(state).toEqual(factory.results.state.success);
  });
});
