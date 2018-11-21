import { Reducer } from 'redux-testkit';
import recommendations from '../recommendations';
import factory from './utils/factory';

describe('reducer daily recommendations', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(recommendations).execute({});
    expect(state).toEqual(factory.theDefaultState);
  });

  it('Should generate state on action DR_PROFILES_REQUEST', () => {
    const state = Reducer(recommendations).execute({ type: 'DR_PROFILES_REQUEST' });
    expect(state).toEqual(factory.theDefaultState);
  });

  it('Should generate state on action DR_PROFILES_SUCCESS', () => {
    const payload = factory.profileSuccess;
    const state = Reducer(recommendations).execute({ type: 'DR_PROFILES_SUCCESS', payload });
    expect(state).toEqual(factory.profileSuccessState);
  });

  it('Should generate state on action DR_PROFILES_FAIL', () => {
    const payload = factory.profileSuccess;
    const state = Reducer(recommendations).execute({ type: 'DR_PROFILES_FAIL', payload });
    expect(state).toEqual(factory.profileFailState);
  });

  it('Should generate state on action PROFILE_PREPARE_NEXT', () => {
    const nextpayload = factory.profilePrepareNext;
    const payload = factory.profileSuccess;
    // const sucessstate = Reducer(recommendations).execute({type:"DR_PROFILES_SUCCESS",successpayload});
    const state1 = Reducer(recommendations).execute({ type: 'DR_PROFILES_SUCCESS', payload });
    // console.log(state1)
    const state = Reducer(recommendations)
      .withState(state1)
      .execute({ type: 'PROFILE_PREPARE_NEXT', payload: nextpayload });
    expect(state).toEqual(factory.profilePrepareNextSuccess);
  });
});
