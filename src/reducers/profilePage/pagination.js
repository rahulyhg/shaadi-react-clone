import types from '../../action_types';

const initialState = {
  count: 0,
  profileUid: null,
  prevText: 'Prev',
  prevUrl: null,
  backUrl: null,
  backText: 'Back',
  nextUrl: null,
  nextText: 'Next',
  nextUid: null,
  isVisible: false,
  prevSectionInfo: {
    icon: null,
    iconStatus: null,
  },
  nextSectionInfo: {
    icon: null,
    iconStatus: null,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PROFILE_REQUEST:
      return {
        ...state,
        profileUid: action.payload.uid,
        isVisible: state.isVisible,
      };
    case types.PROFILE_QUEUE_FAIL: {
      return {
        ...state,
        profileUid: state.profileUid,
      };
    }
    case types.PROFILE_QUEUE_REQUEST: {
      return {
        ...state,
        profileUid: state.profileUid,
      };
    }
    case types.PROFILE_QUEUE_CACHE:
    case types.PROFILE_QUEUE_SUCCESS: {
      const {
        uid,
        count,
        prevUrl,
        prevText,
        backUrl,
        backText,
        nextUrl,
        nextText,
        nextUid,
        source,
        prevSectionInfo,
        nextSectionInfo,
      } = action.payload;
      if (uid !== state.profileUid) return state;
      const isVisible = !!(nextUrl || prevUrl || backUrl);
      return {
        ...state,
        count,
        nextUrl,
        nextText,
        prevUrl,
        prevText,
        backUrl,
        backText,
        nextUid,
        isVisible,
        source,
        prevSectionInfo,
        nextSectionInfo,
      };
    }
    default:
      return state;
  }
}
