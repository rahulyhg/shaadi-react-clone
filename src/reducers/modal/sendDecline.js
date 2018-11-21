import types from '../../action_types';

const initialState = {
  title: null,
  message: null,
  uid: null,
  wishToSendMessage: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { uid, message, title, source, wishToSendMessage } = action.payload;
      return {
        ...state,
        message,
        title,
        uid,
        source,
        wishToSendMessage,
      };
    }
    default:
      return state;
  }
}
