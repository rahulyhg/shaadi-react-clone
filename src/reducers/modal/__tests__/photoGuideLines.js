import { Reducer } from 'redux-testkit';
import PhotoGuidelinesReducer from '../../modal/photoGuidelines';

describe('reducer PhotoGuidelines', () => {
  it('default', () => {
    const state = Reducer(PhotoGuidelinesReducer).execute({});
    expect(state).toEqual({
      uid: null,
      name: '',
      source: null,
    });
  });

  it('show modal photoGuidelines', () => {
    const state = Reducer(PhotoGuidelinesReducer).execute({
      type: 'MODAL_SHOW',
      payload: {
        name: null,
        uid: null,
        modal: 'photoGuidelines',
        source: 'modal/photoGuidelines',
      },
    });
    expect(state).toEqual({
      uid: null,
      name: null,
      source: 'modal/photoGuidelines',
    });
  });

  it('fail to show modal if not photoGuidelines', () => {
    const state = Reducer(PhotoGuidelinesReducer).execute({
      type: 'MODAL_SHOW',
      payload: {
        name: '',
        uid: '',
        modal: 'test',
        source: 'modal/photoGuidelines',
      },
    });
    expect(state).toEqual({
      uid: null,
      name: '',
      source: null,
    });
  });
});
