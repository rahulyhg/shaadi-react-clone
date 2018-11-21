import { Reducer } from 'redux-testkit';
import counts from '../counts';
import factory from './utils/factory';

describe('reducer counts', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(counts).execute({ type: '@@INIT' });
    expect(state).toEqual({
      alerts: 0,
      chats: 0,
      online: 0,
    });
  });

  it('Should generate state on action NOTIFICATIONS_SUCCESS', () => {
    const payload = {
      alerts: {
        items: factory.items,
        count: 111,
        unread: 14,
      },
      markAsRead: false,
    };

    const state = Reducer(counts).execute({ type: 'NOTIFICATIONS_SUCCESS', payload });
    expect(state).toEqual({
      alerts: 14,
      chats: 0,
      online: 0,
    });
  });

  it('Should generate state on action CHAT_DATA_CACHE', () => {
    const payload = {
      chats: {
        unread: 2,
        items: factory.items,
      },
      online: {
        matches: { items: factory.items },
        shortlisted: { items: factory.items },
        accepted: {
          items: factory.items,
        },
      },
    };
    const state = Reducer(counts).execute({ type: 'CHAT_DATA_CACHE', payload });
    expect(state).toEqual({
      alerts: 0,
      chats: 2,
      online: 3,
    });
  });

  it('Should generate state on action CHAT_DATA_SUCCESS', () => {
    const payload = {
      chats: {
        unread: 2,
        items: factory.items,
      },
      online: {
        matches: { items: factory.items },
        shortlisted: { items: factory.items },
        accepted: {
          items: factory.items,
        },
      },
    };
    const state = Reducer(counts).execute({ type: 'CHAT_DATA_SUCCESS', payload });
    expect(state).toEqual({
      alerts: 0,
      chats: 2,
      online: 3,
    });
  });
});
