import { Reducer } from 'redux-testkit';
import recommendations from '../recommendations';
import factory from './utils/factory';

describe('reducer daily recommendations', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(recommendations).execute({});
    expect(state).toEqual(factory.theDefaultState);
  });

  it('Should should set loading  on action DR_PROFILES_REQUES', () => {
    const state = Reducer(recommendations).execute({ type: 'DR_PROFILES_REQUEST' });
    expect(state).toEqual(factory.theDefaultState);
  });

  it('Should get profiles on action DR_PROFILES_SUCCESS', () => {
    const payload = factory.profileSuccess;
    const state = Reducer(recommendations).execute({ type: 'DR_PROFILES_SUCCESS', payload });
    expect(state).toEqual(factory.profileSuccessState);
  });

  it('Should get 0 porfiles on action DR_PROFILES_SUCCESS when all recommendations viewed', () => {
    const payload = factory.zeroProfileSuccess;
    const state = Reducer(recommendations).execute({ type: 'DR_PROFILES_SUCCESS', payload });
    expect(state).toEqual(factory.zeroProfileSuccessState);
  });

  it('Should get 0 porfiles on  on action DR_PROFILES_SUCCESS with  dr not generated', () => {
    const payload = factory.zeroProfileSuccess;
    const state = Reducer(recommendations).execute({ type: 'DR_PROFILES_SUCCESS', payload });
    expect(state).toEqual(factory.zeroProfileSuccessState);
  });

  it('Should set error message action DR_PROFILES_FAIL', () => {
    const payload = factory.profileSuccess;
    const state = Reducer(recommendations).execute({ type: 'DR_PROFILES_FAIL', payload });
    expect(state).toEqual(factory.profileFailState);
  });
});
