import types from '../../action_types';

const extract = (key, obj = {}, fallback) => ([null, undefined].includes(obj[key]) ? fallback[key] : obj[key]);

const initialState = {
  onlineStatus: 'invisible',
  onlineStatusDetails: '...',
  onlineAt: 0,
  device: 'none',
  platform: 'none',
  lastOnline: '...',
  lastOnlineDetails: '...',
  ready: false,
  chatIcon: 'none',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_SUCCESS:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
    case types.MATCHES_GROUP_SUCCESS: {
      const { presence } = action.payload || {};
      if (!presence || state.ready) {
        return state;
      }
      const newState = {
        ...state,
        onlineStatus: extract('onlineStatus', presence, state),
        onlineStatusDetails: extract('onlineStatusDetails', presence, state),
        onlineAt: extract('onlineAt', presence, state),
        device: extract('device', presence, state),
        platform: extract('platform', presence, state),
        lastOnline: extract('lastOnline', presence, state),
        lastOnlineDetails: extract('lastOnlineDetails', presence, state),
        ready: true,
        chatIcon: extract('chatIcon', presence, state),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    default: {
      const { presence } = action.payload || {};
      if (!presence || state.ready) {
        return state;
      }
      const newState = {
        ...state,
        onlineStatus: extract('onlineStatus', presence, state),
        onlineStatusDetails: extract('onlineStatusDetails', presence, state),
        onlineAt: extract('onlineAt', presence, state),
        device: extract('device', presence, state),
        platform: extract('platform', presence, state),
        lastOnline: extract('lastOnline', presence, state),
        lastOnlineDetails: extract('lastOnlineDetails', presence, state),
        chatIcon: extract('chatIcon', presence, state),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
  }
};
