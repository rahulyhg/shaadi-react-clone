import types from '../../action_types';

const initialState = {
  key: null,
  uid: null,
  name: null,
  himHer: '',
  heShe: '',
  photoUrl: 'https://img.shaadi.com/imgs/profiles/150-no-border-female.gif',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SESSION_CACHE:
    case types.SESSION_SUCCESS: {
      const gender = action.payload.settings.gender || 'Other';
      return {
        ...state,
        heShe: { Male: 'She', Female: 'He', Other: '' }[gender] || '',
        himHer: { Male: 'Her', Female: 'Him', Other: '' }[gender] || '',
      };
    }
    case types.LAYER_SUCCESS: {
      if (action.payload.modal !== 'pendingExitIntent') {
        return state;
      }
      const { display_name, image_path, memberlogin, gender } = action.payload.profiles[0];
      return {
        ...initialState,
        key: memberlogin,
        uid: memberlogin,
        name: display_name,
        heShe: { Male: 'He', Female: 'She', Other: '' }[gender] || state.heShe,
        himHer: { Male: 'Him', Female: 'Her', Other: '' }[gender] || state.himHer,
        photoUrl: image_path,
      };
    }

    default:
      return state;
  }
}
