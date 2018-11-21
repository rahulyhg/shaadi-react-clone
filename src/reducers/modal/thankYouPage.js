import types from '../../action_types';

const initialState = {
  uid: null,
  content: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, uid, content } = action.payload;
      if (modal !== 'thankYouPage') {
        return state;
      }
      return {
        ...state,
        uid,
        content,
      };
    }
    default:
      return state;
  }
}
