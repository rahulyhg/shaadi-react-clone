import { Reducer } from 'redux-testkit';
import privacyReducer from '../privacy';
import factory from './utils/factory';

const privacyFactory = factory.privacy;

describe('astro reducer test', () => {
  it('return default state no action', () => {
    const state = Reducer(privacyReducer).execute({});
    expect(state).toMatchObject(privacyFactory.getState);
  });
  it('SESSION_CACHE', () => {
    const reducerState = Reducer(privacyReducer).execute(privacyFactory.getAction('SESSION_CACHE', {}));
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('SESSION_SUCCESS', () => {
    const reducerState = Reducer(privacyReducer).execute(privacyFactory.getAction('SESSION_SUCCESS', {}));
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('SESSION_CACHE with Payload privacy', () => {
    const execute = privacyFactory.getAction('SESSION_CACHE');
    execute.payload.privacy = execute.payload.data.privacy;
    const reducerState = Reducer(privacyReducer).execute(execute);
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('SESSION_SUCCESS with Payload privacy', () => {
    const execute = privacyFactory.getAction('SESSION_SUCCESS');
    execute.payload.privacy = execute.payload.data.privacy;
    const reducerState = Reducer(privacyReducer).execute(execute);
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('UPDATE_PROFILE_PRIVACY_SETTING_SUCCESS', () => {
    const execute = privacyFactory.getAction('UPDATE_PROFILE_PRIVACY_SETTING_SUCCESS');
    execute.payload.data.privacy = null;
    const reducerState = Reducer(privacyReducer).execute(execute);
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('GET_PROFILE_PRIVACY_SETTING_SUCCESS', () => {
    const execute = privacyFactory.getAction('GET_PROFILE_PRIVACY_SETTING_SUCCESS');
    execute.payload.data.privacy = null;
    const reducerState = Reducer(privacyReducer).execute(execute);
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('UPDATE_PROFILE_PRIVACY_SETTING_SUCCESS with Payload', () => {
    const reducerState = Reducer(privacyReducer).execute(
      privacyFactory.getAction('UPDATE_PROFILE_PRIVACY_SETTING_SUCCESS', { data: { privacy: {} } }),
    );
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('GET_PROFILE_PRIVACY_SETTING_SUCCESS with Payload', () => {
    const reducerState = Reducer(privacyReducer).execute(
      privacyFactory.getAction('GET_PROFILE_PRIVACY_SETTING_SUCCESS', { data: { privacy: {} } }),
    );
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('UPDATE_PROFILE_PRIVACY_SETTING_REQUEST', () => {
    const reducerState = Reducer(privacyReducer).execute(privacyFactory.getAction('UPDATE_PROFILE_PRIVACY_SETTING_REQUEST', {}));
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('UPDATE_PROFILE_PRIVACY_SETTING_FAIL', () => {
    const reducerState = Reducer(privacyReducer).execute(privacyFactory.getAction('UPDATE_PROFILE_PRIVACY_SETTING_FAIL', {}));
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('GET_PROFILE_PRIVACY_SETTING_REQUEST', () => {
    const reducerState = Reducer(privacyReducer).execute(privacyFactory.getAction('GET_PROFILE_PRIVACY_SETTING_REQUEST', {}));
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
  it('GET_PROFILE_PRIVACY_SETTING_FAIL', () => {
    const reducerState = Reducer(privacyReducer).execute(privacyFactory.getAction('GET_PROFILE_PRIVACY_SETTING_FAIL', {}));
    expect(reducerState).toMatchObject({
      ...privacyFactory.getState,
    });
  });
});
