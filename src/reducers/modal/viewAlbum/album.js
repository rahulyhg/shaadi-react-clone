import types from '../../../action_types';

const initialState = {
  source: '',
  albumInfo: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal } = action.payload;
      if (modal !== 'viewAlbum') {
        return state;
      }
      const { source } = action.payload.meta;
      return {
        ...state,
        source,
        albumInfo: action.payload.data,
        profileInfo: action.payload.profileInfo,
      };
    }
    default:
      return state;
  }
}
