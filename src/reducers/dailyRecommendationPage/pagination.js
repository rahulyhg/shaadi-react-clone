import types from '../../action_types';

const initialState = {
  profileUid: null,
  prevText: 'Prev',
  prevUrl: null,
  backUrl: null,
  backText: 'Back',
  nextUrl: null,
  nextText: 'Next',
  nextUid: null,
  isVisible: false,
  loading: true,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.PROFILE_REQUEST:
      return {
        ...initialState,
        profileUid: action.payload.uid,
        isVisible: state.isVisible,
      };
    case types.DR_PROFILES_FAIL: {
      return {
        ...initialState,
        profileUid: state.profileUid,
        loading: false,
      };
    }
    case types.DR_PROFILES_REQUEST: {
      return {
        ...initialState,
        profileUid: state.profileUid,
      };
    }
    case types.DR_PROFILES_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.EOI_REQUEST: {
      return {
        ...state,
        isVisible: false,
        loading: true,
      };
    }

    case types.DR_QUEUE_SUCCESS: {
      const { uid, prevUrl, prevText, backUrl, backText, nextUrl, nextText, nextUid, landingProfileId } = action.payload;
      const isVisible = (nextUrl || prevUrl || backUrl) && landingProfileId !== uid;

      return {
        ...state,
        nextUrl,
        nextText,
        prevUrl,
        prevText,
        backUrl,
        backText,
        nextUid,
        isVisible,
        loading: false,
        uid,
      };
    }
    default:
      return state;
  }
}
