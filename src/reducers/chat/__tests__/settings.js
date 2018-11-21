import { Reducer } from 'redux-testkit';
import settings from '../settings';

const defaultState = { status: 'online', beepSoundPlay: false, sounds: 'on', isOpen: true, activeTab: 'online', profileCardDisplay: false };

describe('reducer Flash', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(settings).execute({ type: '@@INIT' });
    expect(state).toEqual(defaultState);
  });

  it('Should generate default state on action CHAT_SETTINGS_CACHE', () => {
    const payload = {
      status: 'online',
      sounds: 'on',
      isOpen: true,
      activeTab: 'online',
      profileCardDisplay: false,
      beepSoundPlay: false,
    };
    const state = Reducer(settings).execute({ type: 'CHAT_SETTINGS_CACHE', payload });
    expect(state).toEqual(payload);
  });

  it('Should generate default state on action CHAT_SETTINGS_CHANGE', () => {
    const payload = { key: 'profileCardDisplay', value: false };
    const state = Reducer(settings).execute({ type: 'CHAT_SETTINGS_CHANGE', payload });
    expect(state).toEqual(defaultState);
  });

  it('Should generate default state on action CHAT_SETTINGS_CHANGE offline', () => {
    const payload = { key: 'status', value: 'offline' };
    const state = Reducer(settings).execute({ type: 'CHAT_SETTINGS_CHANGE', payload });
    expect(state).toEqual({
      ...defaultState,
      status: 'offline',
      isOpen: false,
    });
  });

  it('Should generate default state on action CHAT_SETTINGS_CHANGE active tab', () => {
    const payload = { key: 'activeTab', value: 'online' };
    const state = Reducer(settings).execute({ type: 'CHAT_SETTINGS_CHANGE', payload });
    expect(state).toEqual({ ...defaultState, activeTab: 'online' });
  });

  it('Should generate default state on action CHAT_SETTINGS_CHANGE isOpen', () => {
    const payload = { key: 'isOpen', value: true };
    const state = Reducer(settings).execute({ type: 'CHAT_SETTINGS_CHANGE', payload });
    expect(state).toEqual({ ...defaultState, isOpen: true });
  });

  it('Should generate default state on action CHAT_SETTINGS_CHANGE online', () => {
    const payload = { key: 'status', value: 'online' };
    const state = Reducer(settings).execute({ type: 'CHAT_SETTINGS_CHANGE', payload });
    expect(state).toEqual({ ...defaultState, status: 'online', isOpen: false });
  });

  it('Should generate default state on action SESSION_SUCCESS', () => {
    const payload = { ...defaultState, self: { se: null, flags: { activeStatus: 'default' } } };
    const state = Reducer(settings).execute({ type: 'SESSION_SUCCESS', payload });
    expect(state).toEqual({ ...defaultState, status: 'online', isOpen: false });
  });

  it('Should generate default state on action CHAT_DATA_SUCCESS', () => {
    const payload = { ...defaultState, chats: { unread: 0 }, selfPresence: { status: 'Online' } };
    const state = Reducer(settings).execute({ type: 'CHAT_DATA_SUCCESS', payload });
    expect(state).toEqual({
      ...defaultState,
      activeTab: 'online',
      status: 'online',
      isOpen: false,
    });
  });
});
