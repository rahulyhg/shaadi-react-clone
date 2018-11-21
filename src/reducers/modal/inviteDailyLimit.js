import types from '../../action_types';

const initialState = {
  name: 'Pinky',
  profileUrl: '#',
  uid: '322133dd',
  hisHer: 'Her',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, uid, source, name } = action.payload;
      if (modal !== 'inviteDailyLimit') {
        return state;
      }
      return {
        ...state,
        name,
        uid,
        source,
      };
    }
    default:
      return state;
  }
}
