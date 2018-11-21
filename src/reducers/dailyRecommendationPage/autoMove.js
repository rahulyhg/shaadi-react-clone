import types from '../../action_types';

const initialState = {
  pending: false,
  profileid: null,
  nextUrl: '',
  history: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.POSTPONE_AUTO_MOVE: {
      if (action.payload.source === 'daily-recommendations') {
        return {
          ...state,
          pending: true,
          ...action.payload,
        };
      }
      return state;
    }
    case types.PROFILE_PREPARE_NEXT: {
      return initialState;
    }
    default:
      return state;
  }
}
