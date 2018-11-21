import types from '../../action_types';
import base from './base';
import flags from './flags';
import presence from './presence';
import summary from './summary';
import shortlists from './shortlists';
import detailed from './detailed';
import requests from './requests';
import photos from './photos';
import astro from './astro';
import drAction from './drAction';
import privacy from './privacy';
import contactSummary from './contactSummary';

const initialState = {
  base: base(undefined, {}),
  flags: flags(undefined, {}),
  presence: presence(undefined, {}),
  summary: summary(undefined, {}),
  detailed: detailed(undefined, {}),
  requests: requests(undefined, {}),
  shortlists: shortlists(undefined, {}),
  photos: photos(undefined, {}),
  astro: astro(undefined, {}),
  privacy: privacy(undefined, {}),
  contactSummary: contactSummary(undefined, {}),
  connectMessages: [],
  thumbnailBlur: '/assets/default-thumbnail.png',
  thumbnail: '/assets/default-thumbnail.png',
  photoBlur: '/assets/default-photo.png',
  photoMedium: '/assets/default-photo.png',
  photo: '/assets/default-photo.png',
  fullPhotoBlur: '/assets/default-full-photo.png',
  fullPhoto: '/assets/default-full-photo.png',
  drAction: {},
  heShe: '...',
  himHer: '...',
  hisHer: '...',
  gender: null,
  tempId: '',
  verification: {
    count: 0,
    shield_state: '',
    derived_text: '',
    verified_proofs: [],
  },
  score: 0,
};

export default (state = initialState, action = {}) => {
  const { payload = {}, type } = action;
  switch (type) {
    case types.CONTACT_EOI_REQUEST:
    case types.CONTACT_EOI_FAIL:
    case types.CONTACT_EOI_SUCCESS:
    case types.PHOTO_EOI_REQUEST:
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS:
    case types.EOI_REQUEST:
    case types.EOI_FAIL:
    case types.EOI_SUCCESS: {
      const newState = {
        ...state,
        flags: flags(state.flags, action),
        presence: presence(state.presence, action),
        summary: summary(state.summary, action),
        shortlists: shortlists(state.shortlists, action),
        detailed: detailed(state.detailed, action),
        requests: requests(state.requests, action),
        drAction: drAction(state.drAction, action),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
    case types.MY_DASHBOARD_WIDGETS_SUCCESS: {
      if (!action.payload) {
        return state;
      }
      const { small, domain_name } = payload.photo_details.photos[0];
      const newState = {
        ...state,
        uid: payload.account.memberlogin || state.uid,
        name: payload.display_name || state.name,
        thumbnail: `${domain_name}${small}` || state.thumbnail,
        userHandle: payload.memberlogin || state.userHandle,
        gender: payload.gender,
        location: payload.location,
        heShe: payload.gender === 'Male' ? 'He' : 'She',
        himHer: payload.gender === 'Male' ? 'Him' : 'Her',
        hisHer: payload.gender === 'Male' ? 'His' : 'Her',
        mrMs: payload.gender === 'Male' ? 'Mr.' : 'Ms.',
        base: base(state.base, action),
        flags: flags(state.flags, action),
        contact: action.payload.contact || {},
      };
      return newState;
    }
    case types.INBOX_DATA_SUCCESS:
    case types.SESSION_CACHE:
    case types.SESSION_SUCCESS:
    case types.PROFILE_SUCCESS:
    case types.NOTIFICATIONS_SUCCESS:
    case types.CHAT_DATA_CACHE:
    case types.CHAT_DATA_SUCCESS:
    case types.WIDGET_MATCHES_CACHE:
    case types.WIDGET_MATCHES_SUCCESS:
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS:
    case types.OTHER_SEARCH_SUCCESS:
    case types.PREFERRED_SEARCH_LOADING:
    case types.MATCHES_GROUP_SUCCESS:
    case types.DR_PROFILES_SUCCESS:
    case types.SIMILAR_PROFILE_SUCCESS:
    case types.CONTACT_SUMMARY_DATA_SUCCESS: {
      if (!action.payload) {
        return state;
      }
      const newState = {
        ...state,
        se: payload.se || state.se,
        uid: payload.uid || state.uid,
        tempId: payload.tempId || state.tempId,
        name: payload.name || payload.display_name || state.name,
        fullName: payload.fullName || state.fullName,
        firstName: payload.firstName || state.firstName,
        lastName: payload.lastName || state.lastName,
        slug: payload.slug || state.slug,

        thumbnail: payload.thumbnail || state.thumbnail,
        photo: payload.photo || state.photo,
        fullPhoto: payload.fullPhoto || state.fullPhoto,

        thumbnailBlur: payload.thumbnailBlur || state.thumbnailBlur,
        photoBlur: payload.photoBlur || state.photoBlur,
        photoMedium: payload.photoMedium || state.photoMedium,
        largePhotoBlur: payload.largePhotoBlur || state.largePhotoBlur,
        largePhoto: payload.largePhoto || state.largePhoto,

        fullPhotoBlur: payload.fullPhotoBlur || state.fullPhotoBlur,
        connectMessages: state.connectMessages.length ? state.connectMessages : payload.connectMessages,
        userHandle: payload.userHandle || state.userHandle,
        gender: payload.gender,
        location: payload.location,
        heShe: payload.gender === 'Male' ? 'He' : 'She',
        himHer: payload.gender === 'Male' ? 'Him' : 'Her',
        hisHer: payload.gender === 'Male' ? 'His' : 'Her',
        mrMs: payload.gender === 'Male' ? 'Mr.' : 'Ms.',
        horoscopeScore: payload.horoscopeScore && payload.horoscopeScore.rankdata ? payload.horoscopeScore : state.horoscopeScore,
        score: payload.score || state.score,
        base: base(state.base, action),
        drAction: drAction(state.drAction, action),
        flags: flags(state.flags, action),
        presence: presence(state.presence, action),
        summary: summary(state.summary, action),
        shortlists: shortlists(state.shortlists, action),
        detailed: detailed(state.detailed, action),
        requests: requests(state.requests, action),
        photos: photos(state.photos, action),
        privacy: privacy(state.privacy, action),
        contactSummary: contactSummary(state.contactSummary, action),
        verification:
          action.payload.verification && action.payload.verification.shield_state ? action.payload.verification : state.verification,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }

    case types.SELECTED_SHORTLISTS_REQUEST:
    case types.SELECTED_SHORTLISTS_SUCCESS:
    case types.SELECTED_SHORTLISTS_FAIL:
      return {
        ...state,
        shortlists: shortlists(state.shortlists, action),
      };
    case types.PREFERRED_PHOTOS_CACHE:
    case types.PREFERRED_PHOTOS_SUCCESS:
    case types.OTHERSEARCH_PHOTOS_CACHE:
    case types.OTHERSEARCH_PHOTOS_SUCCESS: {
      const newState = {
        ...state,

        base: base(state.base, action),
        summary: summary(state.summary, action),
        flags: flags(state.flags, action),
        presence: presence(state.presence, action),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }

    case types.TOGGLE_SKIP: {
      const newState = {
        ...state,
        flags: flags(state.flags, action),
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
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
      return {
        ...state,
        photos: photos(state.photos, action),
      };
    case types.GET_PROFILE_ASTRO_FAIL:
    case types.GET_PROFILE_ASTRO_REQUEST:
    case types.GET_PROFILE_ASTRO_SUCCESS:
      return {
        ...state,
        astro: astro(state.astro, action),
      };
    case types.GET_PROFILE_PRIVACY_SETTING_REQUEST:
    case types.GET_PROFILE_PRIVACY_SETTING_SUCCESS:
    case types.GET_PROFILE_PRIVACY_SETTING_FAIL:
    case types.UPDATE_PROFILE_PRIVACY_SETTING_REQUEST:
    case types.UPDATE_PROFILE_PRIVACY_SETTING_SUCCESS:
    case types.UPDATE_PROFILE_PRIVACY_SETTING_FAIL:
    case types.PHONE_SETTING_DATA_SUCCESS:
      return {
        ...state,
        privacy: privacy(state.privacy, action),
      };
    case types.GET_OTHER_PROFILE_PHOTOS_REQUEST:
    case types.GET_OTHER_PROFILE_PHOTOS_SUCCESS:
    case types.GET_OTHER_PROFILE_PHOTOS_FAIL:
      return {
        ...state,
        detailed: detailed(state.detailed, action),
        flags: flags(state.flags, action),
        photos: photos(state.photos, { type, payload: { photo_details: payload.data && payload.data.photo_details } }),
      };
    default:
      return state;
  }
};
