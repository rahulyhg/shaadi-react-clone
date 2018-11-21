import types from '../../action_types';

const initialState = {
  name: '',
  source: '',
  type: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, source } = action.payload;
      if (modal !== 'firstPhotoUpload') {
        return state;
      }
      return {
        ...state,
        name: action.payload.name,
        source,
      };
    }
    default:
      return state;
  }
}
