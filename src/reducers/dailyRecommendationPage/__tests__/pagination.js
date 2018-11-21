import { Reducer } from 'redux-testkit';
import pagination from '../pagination';
import factory from './utils/factory';

describe('reducer daily recommendations', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(pagination).execute({});
    expect(state).toEqual(factory.defaultPaginationState);
  });

  it('Should generate state on action DR_PROFILES_REQUEST', () => {
    const state = Reducer(pagination).execute({ type: 'DR_PROFILES_REQUEST' });
    expect(state).toEqual({ ...factory.defaultPaginationState, loading: true });
  });

  it('Should generate state on action DR_PROFILES_SUCCESS', () => {
    const state = Reducer(pagination).execute({ type: 'DR_PROFILES_SUCCESS' });
    expect(state).toEqual({ ...factory.defaultPaginationState, loading: false });
  });

  it('Should generate state on action DR_PROFILES_FAIL', () => {
    const state = Reducer(pagination).execute({ type: 'DR_PROFILES_FAIL' });
    expect(state).toEqual({ ...factory.defaultPaginationState, loading: false });
  });

  it('Should generate state on action DR_QUEUE_SUCCESS', () => {
    const state = Reducer(pagination)
      .withState(factory.paginationState)
      .execute({ type: 'DR_QUEUE_SUCCESS', payload: { ...factory.paginationState, defaultProfileId: '' } });
    expect(state).toEqual(factory.paginationState);
  });
});
