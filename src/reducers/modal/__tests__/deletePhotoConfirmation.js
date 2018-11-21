import { Reducer } from 'redux-testkit';
import DeletePhotoConfirmation from '../../modal/deletePhotoConfirmation';

const onDelete = () => {};

describe('reducer deletePhotoConfirmation', () => {
  it('default', () => {
    const state = Reducer(DeletePhotoConfirmation).execute({});
    const expectState = {
      uid: null,
      name: '',
      source: null,
      photo: {},
      index: 0,
    };
    expect(JSON.stringify(state)).toEqual(JSON.stringify(expectState));
  });

  it('show modal deletePhotoConfirmation', () => {
    const state = Reducer(DeletePhotoConfirmation).execute({
      type: 'MODAL_SHOW',
      payload: {
        uid: null,
        name: '',
        onDelete,
        index: 0,
        photo: {},
        modal: 'deletePhotoConfirmation',
        source: 'modal/deletePhotoConfirmation',
      },
    });
    const expectState = {
      uid: null,
      name: '',
      source: 'modal/deletePhotoConfirmation',
      photo: {},
      index: 0,
    };
    expect(JSON.stringify(state)).toEqual(JSON.stringify(expectState));
  });

  it('fail to show modal if not deletePhotoConfirmation', () => {
    const state = Reducer(DeletePhotoConfirmation).execute({
      type: 'MODAL_SHOW',
      payload: {
        name: '',
        uid: '',
        modal: 'test',
        source: 'modal/deletePhotoConfirmation',
      },
    });
    const expectState = {
      uid: null,
      name: '',
      source: null,
      photo: {},
      index: 0,
    };
    expect(JSON.stringify(state)).toEqual(JSON.stringify(expectState));
  });
});
