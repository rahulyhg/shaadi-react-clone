import { Reducer } from 'redux-testkit';
import SimpleMessageReducer from '../../modal/simpleMessage';

const initialState = {
  uid: null,
  name: '',
  content: '',
  title: '',
  source: null,
};

describe('reducer simpleMessage', () => {
  it('default', () => {
    const state = Reducer(SimpleMessageReducer).execute({});
    expect(state).toEqual(initialState);
  });

  it('show modal simpleMessage', () => {
    const state = Reducer(SimpleMessageReducer).execute({
      type: 'MODAL_SHOW',
      payload: {
        name: null,
        uid: null,
        modal: 'simpleMessage',
        source: 'modal/simpleMessage',
        content: 'Some content',
        title: 'Some title',
      },
    });
    expect(state).toEqual({
      uid: null,
      name: null,
      modal: 'simpleMessage',
      source: 'modal/simpleMessage',
      content: 'Some content',
      title: 'Some title',
    });
  });

  it('fail to show modal if not simpleMessage', () => {
    const state = Reducer(SimpleMessageReducer).execute({
      type: 'MODAL_SHOW',
      payload: {
        name: '',
        uid: '',
        modal: 'test',
        source: 'modal/simpleMessage',
        content: '',
        title: '',
      },
    });
    expect(state).toEqual(initialState);
  });
});
