import types from '../../action_types';

const initialState = {
  listStyle: 'list',
  loading: true,
  isMoreMatchesVisible: false,
  isMoreMatchesSelected: false,
  showMoreMatchesTour: false,
  frozenBy: null,
  flash: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PREFERRED_FACET_UPDATE:
      if (action.payload.cluster !== 'moreMatches') {
        return state;
      }
      return {
        ...state,
        isMoreMatchesSelected: action.payload.values[0] === 'most_preferred',
      };
    case types.PREFERRED_SEARCH_REQUEST:
      return {
        ...state,
        listStyle: ['list', 'grid'].includes(action.payload.format) ? action.payload.format : state.listStyle,
        loading: true,
        frozenBy: null,
        flash: null,
      };
    case types.PREFERRED_SEARCH_CACHE:
    case types.PREFERRED_SEARCH_SUCCESS: {
      const type = action.payload.meta.type;
      let isMoreMatchesVisibleFlag = false;
      if (['preferred', 'most_preferred'].includes(type)) {
        if (type === 'most_preferred' && action.payload.profiles.length === 0) {
          isMoreMatchesVisibleFlag = false;
        } else {
          isMoreMatchesVisibleFlag = true;
        }
      }

      return {
        ...state,
        listStyle: action.payload.meta.format || state.listStyle,
        loading: false,
        isMoreMatchesVisible: isMoreMatchesVisibleFlag,
        isMoreMatchesSelected: type === 'most_preferred',
        flash: null,
        frozenBy: null,
      };
    }
    case types.MODAL_HIDE: {
      return {
        ...state,
        showMoreMatchesTour: false,
      };
    }
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'mostMatchesTour') {
        return state;
      }
      return {
        ...state,
        showMoreMatchesTour: true,
      };
    }
    case types.PREFERRED_SEARCH_FREEZE: {
      return {
        ...state,
        frozenBy: action.payload,
      };
    }
    case types.PREFERRED_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        flash: action.payload.error.message.slice(0, 300),
        frozenBy: null,
      };
    default:
      return state;
  }
}
