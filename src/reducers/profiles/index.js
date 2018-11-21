import types from '../../action_types';
import profile from './profile';

const initialState = {
  default: {
    ...profile(undefined, {}),
    uid: null,
    name: '...',
  },
  self: {
    ...profile(undefined, {}),
  },
};
export default function(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case types.SESSION_CACHE:
    case types.SESSION_SUCCESS:
      return {
        ...state,
        self: profile(state.self, { ...action, payload: action.payload.self }),
      };
    case types.INBOX_DATA_SUCCESS:
    case types.WIDGET_MATCHES_CACHE:
    case types.WIDGET_MATCHES_SUCCESS:
    case types.PREFERRED_PHOTOS_CACHE:
    case types.PREFERRED_PHOTOS_SUCCESS:
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHERSEARCH_PHOTOS_CACHE:
    case types.OTHERSEARCH_PHOTOS_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
    case types.SIMILAR_PROFILE_SUCCESS:
    case types.MATCHES_GROUP_SUCCESS: {
      let combineProfiles = [...action.payload.profiles];
      if (action.payload.featuredProfiles) {
        combineProfiles = [...combineProfiles, ...action.payload.featuredProfiles];
      }
      return combineProfiles.reduce((obj, pro) => ({ ...obj, [pro.uid]: profile(state[pro.uid], { ...action, payload: pro }) }), {
        ...state,
      });
    }
    case types.MY_DASHBOARD_WIDGETS_SUCCESS: {
      const { profiles } = action.payload;

      return Object.keys(profiles).reduce((obj, pro) => ({ ...obj, [pro]: profile(state[pro], { ...action, payload: profiles[pro] }) }), {
        ...state,
      });
    }

    case types.DR_PROFILES_SUCCESS:
    case types.CONTACT_SUMMARY_DATA_SUCCESS: {
      const { profiles } = action.payload;
      return profiles.reduce((obj, pro) => ({ ...obj, [pro.uid]: profile(state[pro.uid], { ...action, payload: pro }) }), {
        ...state,
      });
    }

    case types.PREFERRED_SEARCH_LOADING: {
      const pro = state[action.payload.profileid] || {};
      return {
        ...state,
        [action.payload.profileid]: profile(pro, action),
      };
    }
    case types.NOTIFICATIONS_SUCCESS: {
      const { alerts } = action.payload;
      const profiles = alerts.items.filter(h => !h.isSystem).map(h => h.profile);
      return profiles.reduce((obj, pro) => ({ ...obj, [pro.uid]: profile(state[pro.uid], { ...action, payload: pro }) }), {
        ...state,
      });
    }
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS: {
      const { chats, online, otherChatData } = action.payload;
      const { accepted, shortlisted, matches } = online;
      const profiles = [...otherChatData.items, ...chats.items, ...accepted.items, ...shortlisted.items, ...matches.items].map(
        h => h.profile,
      );
      return profiles.reduce(
        (obj, pro) => {
          const newProfile = profile(state[pro.uid], { ...action, payload: pro });
          return {
            ...obj,
            [pro.uid]: JSON.stringify(newProfile) === JSON.stringify(state[pro.uid]) ? state[pro.uid] : newProfile,
          };
        },
        {
          ...state,
        },
      );
    }
    case types.SELECTED_SHORTLISTS_REQUEST:
    case types.SELECTED_SHORTLISTS_SUCCESS:
    case types.SELECTED_SHORTLISTS_FAIL:
    case types.CONTACT_EOI_REQUEST:
    case types.CONTACT_EOI_SUCCESS:
    case types.CONTACT_EOI_FAIL:
    case types.PHOTO_EOI_REQUEST:
    case types.PHOTO_EOI_SUCCESS:
    case types.PHOTO_EOI_FAIL:
    case types.EOI_REQUEST:
    case types.EOI_SUCCESS:
    case types.EOI_FAIL:
    case types.PROFILE_SUCCESS:
    case types.GET_PROFILE_ASTRO_SUCCESS:
    case types.GET_PROFILE_ASTRO_FAIL:
    case types.GET_PROFILE_ASTRO_REQUEST:
    case types.GET_REJECTED_ALBUM_PHOTOS_SUCCESS:
    case types.GET_REJECTED_ALBUM_PHOTOS_FAIL:
    case types.GET_REJECTED_ALBUM_PHOTOS_REQUEST:
    case types.GET_PROFILE_PHOTOS_SUCCESS:
    case types.GET_PROFILE_PHOTOS_FAIL:
    case types.GET_PROFILE_PHOTOS_REQUEST:
    case types.DELETE_PHOTO_SUCCESS:
    case types.DELETE_PHOTO_FAIL:
    case types.DELETE_PHOTO_REQUEST:
    case types.UPDATE_PHOTO_SUCCESS:
    case types.UPDATE_PHOTO_FAIL:
    case types.UPDATE_PHOTO_REQUEST:
    case types.GET_PROFILE_PRIVACY_SETTING_REQUEST:
    case types.GET_PROFILE_PRIVACY_SETTING_SUCCESS:
    case types.GET_PROFILE_PRIVACY_SETTING_FAIL:
    case types.GET_OTHER_PROFILE_PHOTOS_REQUEST:
    case types.GET_OTHER_PROFILE_PHOTOS_SUCCESS:
    case types.GET_OTHER_PROFILE_PHOTOS_FAIL:
    case types.UPDATE_PROFILE_PRIVACY_SETTING_REQUEST:
    case types.UPDATE_PROFILE_PRIVACY_SETTING_SUCCESS:
    case types.UPDATE_PROFILE_PRIVACY_SETTING_FAIL:
    case types.GET_PROFILE_PHOTO_REQUEST:
    case types.GET_PROFILE_PHOTO_SUCCESS:
    case types.GET_PROFILE_PHOTO_FAIL:
    case types.TOGGLE_SKIP: {
      const { uid } = payload;
      const profileUid = uid === state.self.uid ? 'self' : uid;
      const newProfile = profile(state[profileUid], action);
      if (JSON.stringify(newProfile) === JSON.stringify(state[profileUid])) {
        return state;
      }
      return {
        ...state,
        [action.payload.uid]: newProfile,
      };
    }

    default:
      return state;
  }
}
