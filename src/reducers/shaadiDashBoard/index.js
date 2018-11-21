import get from 'lodash/get';
import types from '../../action_types';

const initialItemState = {
  uid: null,
  justNow: false,
  eoiLoadingStyle: 'none',
  photoLoading: false,
  actionType: '',
  displayStatusMessage: '',
  eoiClose: false,
};

const resultItemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case types.EOI_FAIL:
    case types.EOI_SUCCESS: {
      const { uid, source } = action.payload;

      if (state.uid !== uid || source !== 'my-shaadi') {
        return state;
      }

      return {
        ...state,
        justNow: true,
        eoiLoadingStyle: 'none',
      };
    }
    case types.EOI_REQUEST: {
      const { uid, source, loadingStyle, type } = action.payload;

      if (state.uid !== uid || source !== 'my-shaadi') {
        return state;
      }

      return {
        ...state,
        eoiLoadingStyle: loadingStyle || 'full',
        actionType: type || '',
      };
    }
    case types.MY_DASHBOARD_WIDGETS_SUCCESS: {
      return {
        ...initialItemState,
        uid: action.payload.uid,
      };
    }
    case types.MODAL_SHOW: {
      return {
        ...state,
        eoiClose: false,
      };
    }
    case types.MODAL_HIDE: {
      return {
        ...state,
        eoiClose: !get(action, 'payload.uid'),
      };
    }
    default:
      return state;
  }
};
const initialState = {
  loading: false,
  results: {},
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.EOI_FAIL:
    case types.PHOTO_EOI_SUCCESS:
    case types.PHOTO_EOI_FAIL:
    case types.PHOTO_EOI_REQUEST:
    case types.CONTACT_EOI_SUCCESS:
    case types.CONTACT_EOI_FAIL:
    case types.CONTACT_EOI_REQUEST:
    case types.EOI_SUCCESS:
    case types.EOI_REQUEST:
    case types.MODAL_HIDE: {
      const updatedListItem = { ...state.results };
      Object.keys(updatedListItem).forEach(listType => {
        updatedListItem[listType].data = updatedListItem[listType].data.map(i => resultItemReducer(i, action));
      });
      return {
        ...state,
        results: updatedListItem,
      };
    }
    case types.MY_DASHBOARD_WIDGETS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.MY_DASHBOARD_WIDGETS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        results: { ...payload.listItems },
      };
    }
    default:
      return state;
  }
}
