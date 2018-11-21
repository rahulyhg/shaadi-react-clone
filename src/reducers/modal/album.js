import types from '../../action_types';

const initialState = {
  uid: null,
  album: [],
  isConnectBtnVisible: false,
  isPhotoGamified: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'album') {
        return state;
      }
      return {
        ...state,
        uid: action.payload.uid,
        album: action.payload.album,
        isConnectBtnVisible: action.payload.isConnectBtnVisible,
        isPhotoGamified: action.payload.isPhotoGamified,
      };
    }
    case types.MODAL_HIDE:
      return initialState;
    default:
      return state;
  }
}
