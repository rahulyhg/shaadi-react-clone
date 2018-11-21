import types from '../../action_types';

const initialState = {
  uid: null,
  name: null,
  profilePhoto: null,
  himHer: '',
  history: '',
  automove: false,
  type: null,
  todayFirstAccept: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { uid, modal, name, himHer, profilePhoto, history, automove = false, type = null } = action.payload;
      if (modal !== 'accept_match') {
        return state;
      }
      return {
        ...state,
        uid,
        name,
        profilePhoto,
        himHer,
        history,
        automove,
        type,
        todayFirstAccept: false,
      };
    }
    case types.COUNTS_CACHE:
    case types.COUNTS_SUCCESS: {
      return {
        ...state,
        todayFirstAccept: !action.payload.counts.today_accepts_sent,
      };
    }
    default:
      return state;
  }
}
