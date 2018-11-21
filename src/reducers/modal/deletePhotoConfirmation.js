import types from '../../action_types';

const initialState = {
  uid: null,
  name: '',
  source: null,
  onDelete: () => {},
  photo: {},
  index: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, uid, source, name, photo, index, onDelete } = action.payload;
      if (modal !== 'deletePhotoConfirmation') {
        return state;
      }
      return {
        ...state,
        name,
        uid,
        source,
        photo,
        index,
        onDelete,
      };
    }
    default:
      return state;
  }
}
