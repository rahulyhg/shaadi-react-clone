import { Reducer } from 'redux-testkit';
import facetBar from '../facetBar';
import factory from './utils/factory';

describe('reducer inbox facetbar', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(facetBar).execute({});
    expect(state).toEqual(factory.facetBar.state.default);
  });

  it('Should generate state on action INBOX_DATA_SUCCESS', () => {
    const payload = factory.facetBar.payload.success;
    const state = Reducer(facetBar).execute({ type: 'INBOX_DATA_SUCCESS', payload });
    expect(state).toEqual(factory.facetBar.state.success);
  });
});
