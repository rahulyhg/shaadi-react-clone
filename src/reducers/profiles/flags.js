import types from '../../action_types';

const extract = (key, obj = {}, fallback) => ([null, undefined].includes(obj[key]) ? fallback[key] : obj[key]);

const initialState = {
  isFree: false,
  isPremium: false,
  membershipLevel: 'none',
  connectionNote: null,
  connectionError: false,
  connectionStatus: 'unknown',
  connectionAction: 'not_contacted',
  connectionJustNowText: null,
  contactAction: 'none',
  contactStatus: 'none',
  horoscopeStatus: 'none',
  loading: 'none',
  isDeleted: false,
  isNri: false,
  isWatermarked: false,
  isTwoWayMatch: false,
  isBoldListing: false,
  canUnblock: false,
  unblockMessage: null,
  canUnignore: false,
  canRemind: false,
  canCancelInvite: false,
  isSameGender: false,
  activeStatus: 'none',
  isPreferredMatch: false,
  isConnectLimitExceeded: false,
  showHistory: false,
  membershipTags: 'free',
  isNameLocked: true,
  isMaskedProfile: false,
  canCallSendSMS: false,
  canSendEmail: false,
  canSendEmailReminder: false,
  canSendSMS: false,
  canViewPhoneNo: false,
  isPhoneNoViewed: false,
  isSmsAlreadySent: false,
  showChatNow: false,
  showPostOnWall: false,
  isFiltered: false,
  isSkipped: false,
  isProfileViewed: false,
  canViewPhotosOnConnectOnly: false,
  canPremiumMemberViewPhoto: false,
  canCommunicate: false,
};

const photoAlbumStatusMap = {
  password_request_sent: 'passwordRequested',
  password: 'requestPassword',
  when_i_contact: 'visibleOnUpgrade',
  only_when_i_contact: 'visibleOnAccept',
  show_photo: 'default',
  photo_request_sent: 'photoRequestSent',
  none: 'noPhoto',
  coming_soon: 'photoComingSoon',
  member_photo_not_screened: 'photoUnderScreening',
};

const actionsWithShortlistData = [
  types.PROFILE_SUCCESS,
  types.PREFERRED_SEARCH_CACHE,
  types.PREFERRED_SEARCH_SUCCESS,
  types.OTHER_SEARCH_SUCCESS,
];

export default (state = initialState, action = {}) => {
  const { payload = {}, type } = action;
  switch (type) {
    case types.EOI_REQUEST: {
      return {
        ...state,
        connectionError: false,
        connectionJustNowText: null,
      };
    }
    case types.EOI_FAIL: {
      const { error } = action.payload;
      if (['limit_exceeded', 'Invitation limit exceeded.'].includes(error.message)) {
        return {
          ...state,
          limitExceeded: true,
          connectionError: true,
          connectionJustNowText: action.payload.justNowText,
        };
      }
      return {
        ...state,
        connectionError: true,
        connectionJustNowText: null,
      };
    }
    case types.PHOTO_EOI_SUCCESS: {
      const { albumStatus } = action.payload;
      return {
        ...state,
        albumStatus: albumStatus || state.albumStatus,
      };
    }
    case types.CONTACT_EOI_SUCCESS: {
      const { contactStatus } = action.payload;
      return {
        ...state,
        contactStatus: contactStatus || state.contactStatus,
      };
    }
    case types.EOI_SUCCESS: {
      const { connectionStatus, justNowText } = action.payload;
      const isDeleted = action.payload.type === 'decline_with_delete' ? true : state.isDeleted;
      const canRemind = ['remind_confirm', 'remind'].includes(action.payload.type) ? false : state.canRemind;
      const canCancelInvite = action.payload.type === 'cancel_invitation' ? false : state.canCancelInvite;
      const connectionAction = ['reportMisuse_confirm', 'block_confirm'].includes(action.payload.type)
        ? 'member_blocked'
        : state.connectionAction;
      return {
        ...state,
        isDeleted,
        connectionStatus: connectionStatus || state.connectionStatus,
        connectionAction,
        connectionJustNowText: justNowText,
        canRemind,
        canCancelInvite,
      };
    }
    case types.PREFERRED_PHOTOS_CACHE:
    case types.PREFERRED_PHOTOS_SUCCESS:
    case types.OTHERSEARCH_PHOTOS_CACHE:
    case types.OTHERSEARCH_PHOTOS_SUCCESS:
      return state;
    case types.PREFERRED_SEARCH_LOADING:
      return {
        ...state,
        loading: action.payload.position,
      };
    case types.TOGGLE_SKIP: {
      return {
        ...state,
        isSkipped: !state.isSkipped,
      };
    }
    case types.GET_OTHER_PROFILE_PHOTOS_SUCCESS:
      return {
        ...state,
        albumStatus:
          photoAlbumStatusMap[payload && payload.data && payload.data.photo_details && payload.data.photo_details.status] || 'noPhoto',
      };
    case types.PROFILE_SUCCESS:
    default: {
      const { flags } = action.payload || {};
      if (!flags) {
        return state;
      }
      const membershipLevel = flags.membershipLevel || state.membershipLevel;
      const membershipTags = flags.membershipTags || state.membershipTags;
      const connectionStatus =
        state.connectionStatus !== 'unknown' && flags.connectionStatus === 'default' && !actionsWithShortlistData.includes(type)
          ? state.connectionStatus
          : extract('connectionStatus', flags, state);
      const connectionError = false;
      const isTwoWayMatch = !actionsWithShortlistData.includes(type) ? state.isTwoWayMatch : extract('isTwoWayMatch', flags, state);
      const { privacy: { photo: photoDisplaySetting } = {} } = payload;
      const canViewPhotosOnConnectOnly = photoDisplaySetting
        ? photoDisplaySetting === 'Only When I Contact'
        : state.canViewPhotosOnConnectOnly;
      const canPremiumMemberViewPhoto = photoDisplaySetting ? photoDisplaySetting === 'When I Contact' : state.canPremiumMemberViewPhoto;
      const newState = {
        ...state,
        ...flags,
        isFree: membershipLevel === 'Free',
        isPremium: membershipLevel !== 'Free' && membershipLevel !== 'none',
        isDeleted: extract('isDeleted', flags, state),
        membershipLevel,
        connectionNote: extract('connectionNote', flags, state),
        isNri: extract('isNri', flags, state),
        connectionStatus,
        connectionError,
        connectionAction: extract('connectionAction', flags, state),
        contactAction: extract('contactAction', flags, state),
        contactStatus: extract('contactStatus', flags, state),
        horoscopeStatus: extract('horoscopeStatus', flags, state),
        albumStatus: extract('albumStatus', flags, state),
        isWatermarked: extract('isWatermarked', flags, state),
        isTwoWayMatch,
        isPreferredMatch: extract('isPreferredMatch', flags, state),
        activeStatus: extract('activeStatus', flags, state),
        isBoldListing: extract('isBoldListing', flags, state),
        isHoroscopeApplicable: extract('isHoroscopeApplicable', flags, state),
        isAstroReady: extract('isAstroReady', flags, state),
        canCancelInvite: extract('canCancelInvite', flags, state),
        canRemind: extract('canRemind', flags, state),
        canUnblock: extract('canUnblock', flags, state),
        showHistory: extract('showHistory', flags, state),
        membershipTags,
        isNameLocked: extract('isNameLocked', flags, state),
        isMaskedProfile: extract('isMaskedProfile', flags, state),
        canCommunicate: extract('canCommunicate', flags, state),
        // relationship actions - instant contacts flags
        canCallSendSMS: extract('canCallSendSMS', flags, state),
        canSendEmail: extract('canSendEmail', flags, state),
        canSendEmailReminder: extract('canSendEmailReminder', flags, state),
        canSendSMS: extract('canSendSMS', flags, state),
        canViewPhoneNo: extract('canViewPhoneNo', flags, state),
        isPhoneNoViewed: extract('isPhoneNoViewed', flags, state),
        isSmsAlreadySent: extract('isSmsAlreadySent', flags, state),
        showChatNow: extract('showChatNow', flags, state),
        showPostOnWall: extract('showPostOnWall', flags, state),
        isFiltered: extract('isFiltered', flags, state),
        isProfileViewed: extract('isProfileViewed', flags, state),
        canViewPhotosOnConnectOnly,
        canPremiumMemberViewPhoto,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
  }
};
