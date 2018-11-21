import types from '../../action_types';

const initialState = {
  socket: 0, // offset to be applied to messages coming from socket
  api: 0, // offset to be applied to messages coming from api
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_SKEW: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
