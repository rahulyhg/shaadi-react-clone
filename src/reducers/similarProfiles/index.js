import types from '../../action_types';
import { createAlertReducer } from '../utils';

const tooltipReducer = createAlertReducer(['similar_profile'], ['eoi', 'photo']);

const initialItemState = {
  eoiLoadingStyle: 'none',
  photoLoading: false,
  justNow: false,
  justNowText: null,
};

const resultItemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS: {
      const { uid } = action.payload;
      if (uid !== state.uid) {
        return state;
      }
      return {
        ...state,
        photoLoading: false,
      };
    }
    case types.EOI_FAIL: {
      const { uid, error, justNowText = 'Oops! Something went wrong' } = action.payload;
      if (uid !== state.uid) {
        return state;
      }
      return {
        ...state,
        eoiLoadingStyle: 'none',
        justNow: true,
        justNowText: error.type === 'formatted' ? error.message : justNowText,
      };
    }
    case types.EOI_SUCCESS: {
      const { uid, source } = action.payload;
      if (uid !== state.uid) {
        return state;
      }
      return {
        ...state,
        justNow: true,
        eoiLoadingStyle: 'none',
        source,
      };
    }
    case types.EOI_REQUEST: {
      const { uid, source, loadingStyle, type } = action.payload;
      if (uid !== state.uid) {
        return state;
      }

      return {
        ...state,
        eoiLoadingStyle: loadingStyle || 'full',
        eoiReqType: type,
        source,
        justNowText: null,
        justNow: false,
      };
    }
    default:
      return state;
  }
};

const initialState = {};

const itemDefault = {
  items: [],
  count: 0,
  loading: true,
  tooltip: tooltipReducer(undefined, {}),
};
export default function(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case types.EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS:
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_REQUEST:
    case types.CONTACT_EOI_SUCCESS:
    case types.CONTACT_EOI_FAIL:
    case types.CONTACT_EOI_REQUEST:
    case types.EOI_SUCCESS:
    case types.EOI_REQUEST: {
      const { uid } = payload;
      const actionedItems =
        (Object.keys(state).length &&
          Object.keys(state).filter(profileId => {
            const similarItem = state[profileId].items || [];
            const actionedItem = (similarItem.length && similarItem.filter(i => i.uid === uid)) || [];
            return actionedItem.length > 0;
          })) ||
        [];
      if (actionedItems.length <= 0) {
        return state;
      }
      const newState = { ...state };
      actionedItems.map(i => {
        newState[i] = {
          ...newState[i],
          items: newState[i].items.map(item => resultItemReducer(item, action)),
        };
        return true;
      });
      return {
        ...newState,
      };
    }

    case types.SIMILAR_PROFILE_SUCCESS: {
      const { items, uid, results } = payload.similarProfiles;
      return {
        ...state,
        [uid]: {
          ...itemDefault,
          items,
          count: items.length,
          loading: false,
          results,
        },
      };
    }
    case types.SIMILAR_PROFILE_REQUEST: {
      const uid = payload.similarProfiles.uid;
      return {
        ...state,
        [uid]: {
          ...itemDefault,
        },
      };
    }

    case types.SIMILAR_PROFILE_FAIL:
    default:
      return state;
  }
}
