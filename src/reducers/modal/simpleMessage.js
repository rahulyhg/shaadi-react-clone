import types from '../../action_types';

const initialState = {
  uid: null,
  name: '',
  source: null,
  title: '',
  content: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, uid, source, name, title, content } = action.payload;
      if (modal !== 'simpleMessage') {
        return state;
      }
      return {
        ...state,
        ...action.payload,
        name,
        uid,
        source,
        title,
        content,
      };
    }
    default:
      return state;
  }
}
