import { Reducer } from 'redux-testkit';
import sidebar from '../sidebar';
// import factory from './utils/factory';

const defaultState = {
  alerts: [],
  chats: [],
  loading: true,
  online: {
    accepted: [],
    shortlisted: [],
    matches: [],
  },
};

describe('reducer Flash', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(sidebar).execute({ type: '@@INIT' });
    expect(state).toEqual(defaultState);
  });

  // it('Should generate default state on action NOTIFICATIONS_SUCCESS', () => {
  //   const payload = { "alerts" :{ "items":factory.items, "count":158,"unread":16}};
  //   const state = Reducer(sidebar).execute({ type: 'NOTIFICATIONS_SUCCESS', payload });
  //   expect(state).toEqual(payload);
  // });

  // it('Should generate default state on action CHAT_DATA_CACHE', () => {
  //   const payload = factory.chatTestData;
  //   const state = Reducer(sidebar).execute({ type: 'CHAT_DATA_CACHE', payload });
  //   expect(state).toEqual([]);
  // });
});
