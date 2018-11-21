import types from '../../action_types';

const initialState = {
  defaultProfileId: '',
  target_time: Math.round(new Date() / 1000),
  items: [],
  nextDefaultProfileId: '',
  prevDefaultProfileId: '',
  landingProfileId: '',
  disablePros: [],
  automove: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.DR_PROFILES_REQUEST:
      return {
        ...state,

        defaultProfileId: '',
        nextDefaultProfileId: '',
        prevDefaultProfileId: '',
        landingProfileId: '',
      };
    case types.DR_PROFILES_SUCCESS:
      return {
        ...state,

        items: action.payload.profiles || [],
        defaultProfileId: action.payload.defaultProfileId || '',
        target_time: action.payload.target_time,
        nextDefaultProfileId: action.payload.nextDefaultProfileId || '',
        prevDefaultProfileId: action.payload.prevDefaultProfileId || '',
        disablePros: action.payload.disablePros || [],
        landingProfileId: action.payload.landingProfileId || '',
      };
    case types.DR_PROFILES_FAIL:
      return {
        ...state,

        items: [],
        defaultProfileId: '',
        target_time: 0,
        nextDefaultProfileId: '',
        prevDefaultProfileId: '',
        landingProfileId: '',
      };
    case types.PROFILE_PREPARE_NEXT:
    case types.DR_PROFILE_NEXT: {
      const defaultProfileId = (action.payload && action.payload.profileid) || '';
      const index = state.items.findIndex(item => item.uid === defaultProfileId);
      const nextDefaultProfile = state.items[index + 1] || {};
      const prevDefaultProfile = (index > 1 && state.items[index - 1]) || {};
      return {
        ...state,
        automove: true,
        defaultProfileId,
        nextDefaultProfileId: (nextDefaultProfile.account && nextDefaultProfile.account.memberlogin) || '',
        prevDefaultProfileId: (prevDefaultProfile.account && prevDefaultProfile.account.memberlogin) || '',
      };
    }
    case types.PROFILE_FAIL: {
      return {
        ...state,

        loading: false,
        uid: action.payload.uid,
        flash: action.payload.error.message,
      };
    }

    default:
      return state;
  }
}
