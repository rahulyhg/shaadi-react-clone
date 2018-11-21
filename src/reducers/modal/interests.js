import types from '../../action_types';

const initialState = {
  uid: null,
  source: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { uid, source, modal, items } = action.payload;
      if (modal !== 'interests') {
        return state;
      }
      return {
        ...state,
        uid,
        source,
        items,
      };
    }
    default:
      return state;
  }
}
