import types from '../../action_types';

const initialItemState = {
  id: null,
  uid: null,
  name: null,
  message: null,
  autoHide: false,
};

const itemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS_TOAST_SHOW: {
      return {
        ...state,
        id: action.payload.id,
        uid: action.payload.uid || null,
        name: action.payload.name || null,
        message: action.payload.message,
        autoHide: action.payload.autoHide,
      };
    }
    default:
      return state;
  }
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS_TOAST_SHOW: {
      return [...state.filter(i => i.id !== action.payload.id), itemReducer(undefined, action)];
    }
    case types.NOTIFICATIONS_TOAST_HIDE: {
      return state.filter(i => i.id !== action.payload.id);
    }
    default:
      return state;
  }
};
