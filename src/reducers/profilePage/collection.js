import types from '../../action_types';

const initialState = {
  baseUid: null,
  uid: null,
  uids: [],
  urls: [],
  count: 0,
  cache: {},
  prefetchedProfiles: {},
  error: null,
  loading: true,
  prefetching: false,
  backUrl: null,
  leftWall: false,
  rightWall: false,
  searchType: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.COLLECTION_REQUEST:
      return { ...state, loading: true, prefetchedProfiles: {} };
    case types.COLLECTION_DESTROY:
      return initialState;
    case types.COLLECTION_MOVE: {
      if (state.uid === action.payload.uid) return state;

      return {
        ...state,
        uid: action.payload.uid,
      };
    }
    case types.PROFILES_BACKGROUND_REQUEST: {
      if (state.prefetching) return state;

      return {
        ...state,
        prefetching: true,
      };
    }
    case types.PROFILES_BACKGROUND_SUCCESS: {
      const { payload: { profiles } } = action;

      if (!state.prefetching && (!profiles || !profiles.length)) return state;

      const newProfilesMap = profiles.reduce((acc, prof) => ({ ...acc, [prof.uid]: prof }), {});

      return {
        ...state,
        prefetching: false,
        prefetchedProfiles: { ...state.prefetchedProfiles, ...newProfilesMap },
      };
    }
    case types.PROFILE_LIST_REQUEST: {
      const { spinner } = action.payload || {};
      if (state.loading && !state.prefetching) return state;

      return {
        ...state,
        loading: spinner || false,
        prefetching: true,
      };
    }
    case types.PROFILE_LIST_POSTSUCCESS: {
      return {
        ...state,
        loading: false,
        prefetching: false,
      };
    }
    case types.PROFILE_REQUEST: {
      return {
        ...state,
        searchType: action.payload.txtUid ? 'profile_id' : 'default',
      };
    }
    case types.PROFILE_BACKGROUND_SUCCESS:
    case types.PROFILE_SUCCESS: {
      return {
        ...state,
        cache: { ...state.cache, [action.payload.uid]: action.payload },
      };
    }
    case types.CONTACT_EOI_FAIL:
    case types.CONTACT_EOI_SUCCESS:
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS:
    case types.EOI_FAIL:
    case types.EOI_SUCCESS: {
      return {
        ...state,
        cache: { ...state.cache, [action.payload.uid]: undefined },
      };
    }
    case types.COLLECTION_SUCCESS: {
      const { uid, uids, urls, count, backUrl, leftWall, rightWall } = action.payload;
      return {
        baseUid: uid,
        uid,
        uids,
        urls,
        backUrl,
        count,
        loading: false,
        error: null,
        leftWall,
        rightWall,
        cache: state.cache,
      };
    }
    case types.PROFILE_FAIL: {
      const { error = {} } = action.payload;
      return {
        ...state,
        loading: false,
        error: error.message,
        errorCode: error.errorCode || error.message,
      };
    }
    case types.COLLECTION_FAIL:
      return {
        ...initialState,
        loading: false,
        uid: action.payload.uid,
        error: action.payload.error.message,
      };
    default:
      return state;
  }
}
