import types from '../../action_types';

const initialState = {
  uid: null,
  name: '',
  source: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, uid, source, name } = action.payload;
      if (modal !== 'photoGuidelines') {
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
