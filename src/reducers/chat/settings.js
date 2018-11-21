import types from '../../action_types';

const initialState = {
  status: 'online',
  sounds: 'on',
  isOpen: true,
  activeTab: 'online',
  profileCardDisplay: false,
  beepSoundPlay: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_SETTINGS_CACHE: {
      return {
        ...state,
        status: action.payload.status,
        sounds: action.payload.sounds,
        isOpen: action.payload.status === 'offline' ? false : action.payload.isOpen,
        activeTab: action.payload.activeTab === 'alerts' ? state.activeTab : action.payload.activeTab,
      };
    }
    case types.CHAT_SETTINGS_CHANGE: {
      const { key, value } = action.payload;
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (key === 'status' && value === 'offline') {
        return {
          ...state,
          status: 'offline',
          isOpen: false,
        };
      }

      if (key === 'status' && value === 'online') {
        return {
          ...state,
          status: 'online',
          isOpen: width > 1280,
        };
      }

      return {
        ...state,
        [key]: value,
      };
    }
    case types.SESSION_SUCCESS: {
      const { self } = action.payload;
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return {
        ...state,
        isOpen: self.flags.activeStatus === 'default' ? !!(state.isOpen && width > 1280) : false,
      };
    }
    case types.CHAT_DATA_SUCCESS: {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return {
        ...state,
        activeTab: action.payload.chats.unread > 0 ? 'chats' : 'online',
        status: action.payload.selfPresence.status ? action.payload.selfPresence.status.toLowerCase() : state.status,
        isOpen: width > 1280 && action.payload.selfPresence.status !== 'Offline',
      };
    }
    case types.BEEP_SOUND_PLAY: {
      return {
        ...state,
        beepSoundPlay: true,
      };
    }
    case types.BEEP_SOUND_STOP: {
      return {
        ...state,
        beepSoundPlay: false,
      };
    }
    default:
      return state;
  }
}
