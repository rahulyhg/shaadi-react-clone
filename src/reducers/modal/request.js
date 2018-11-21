import types from '../../action_types';

const initialState = {
  loading: false,
  name: '',
  uid: 'bleh',
  evtRef: 'profile-request',
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'request') return state;

      return {
        ...state,
        loading: true,
        name: action.payload.display_name,
      };
    }
    case types.REQUEST_MODAL_SHOW: {
      const { modal, display_name, profileid } = action.payload;
      if (modal !== 'request') return state;

      const newState = {
        ...state,
        uid: profileid,
        loading: false,
        name: display_name,
        items: [...state.items],
      };

      return newState;
    }
    case types.PROFILE_CACHE:
    case types.PROFILE_SUCCESS: {
      if (action.payload && action.payload.request && action.payload.request.details && action.payload.request.details.request_type) {
        const { request: { details: { request_type } } } = action.payload;
        const newState = {
          ...state,
          items: request_type,
        };

        return newState;
      }
      return state;
    }
    default:
      return state;
  }
}
