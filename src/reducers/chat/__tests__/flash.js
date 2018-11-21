import { Reducer } from 'redux-testkit';
import flash from '../flash';

describe('reducer Flash', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(flash).execute({ type: '@@INIT' });
    expect(state).toEqual({
      sidebar: '...',
      window: '...',
    });
  });

  it('Should generate state on action CHAT_DATA_REQUEST', () => {
    const payload = {};
    const state = Reducer(flash).execute({ type: 'CHAT_DATA_REQUEST', payload });
    expect(state).toEqual({
      sidebar: null,
      window: '...',
    });
  });

  it('Should generate state on action CHAT_DATA_SUCCESS', () => {
    const payload = {
      online: {
        matches: {
          items: [],
        },
        accepted: {
          items: [],
        },
        chatWindows: [],
        selfPresence: {
          platform: 'web',
          status: 'Online',
          date: 20180125111824,
        },
        otherChatData: {
          items: [],
        },
      },
    };
    const state = Reducer(flash).execute({ type: 'CHAT_DATA_SUCCESS', payload });
    expect(state).toEqual({
      sidebar: null,
      window: '...',
    });
  });

  it('Should generate state on action CHAT_CONNECTING', () => {
    const payload = {};
    const state = Reducer(flash).execute({ type: 'CHAT_CONNECTING', payload });
    expect(state).toEqual({
      sidebar: '...',
      window: null,
    });
  });

  it('Should generate state on action CHAT_CONNECTED', () => {
    const payload = {};
    const state = Reducer(flash).execute({ type: 'CHAT_CONNECTED', payload });
    expect(state).toEqual({
      sidebar: '...',
      window: null,
    });
  });

  it('Should generate state on action CHAT_DATA_FAIL', () => {
    const payload = {
      error: {
        status: 404,
        message: 'No such service.',
        type: 'formatted',
      },
    };
    const state = Reducer(flash).execute({ type: 'CHAT_DATA_FAIL', payload });
    expect(state).toEqual({
      window: '...',
      sidebar: 'No such service.',
    });
  });

  it('Should generate state on action CHAT_DISCONNECTED', () => {
    const payload = {
      flash: false,
    };
    const state = Reducer(flash).execute({ type: 'CHAT_DISCONNECTED', payload });
    expect(state).toEqual({
      sidebar: '...',
      window: 'not connected',
    });
  });
});
