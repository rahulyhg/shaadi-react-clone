import { Reducer } from 'redux-testkit';
import notifications from '../notifications';

describe('reducer Flash', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(notifications).execute({ type: '@@INIT' });
    expect(state).toEqual([]);
  });

  it('Should generate default state on action NOTIFICATIONS_TOAST_SHOW', () => {
    const state = Reducer(notifications).execute({
      type: 'NOTIFICATIONS_TOAST_SHOW',
      payload: {
        id: 'count',
        message: 'You have new notifications',
        autoHide: true,
      },
    });
    expect(state).toEqual([
      {
        id: 'count',
        uid: null,
        name: null,
        message: 'You have new notifications',
        autoHide: true,
      },
    ]);
  });

  it('Should generate default state on action NOTIFICATIONS_TOAST_HIDE', () => {
    const state = Reducer(notifications).execute({
      type: 'NOTIFICATIONS_TOAST_HIDE',
      payload: {
        id: 'count',
        message: 'You have new notifications',
        autoHide: true,
      },
    });
    expect(state).toEqual([]);
  });
});
