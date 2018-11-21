import types from '../../action_types';

const initialState = {
  uid: null,
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'facetBar') {
        return state;
      }
      return {
        ...state,
        items: action.payload.facetBar,
      };
    }
    case types.MODAL_HIDE:
      return initialState;
    case types.PREFERRED_FACET_UPDATE: {
      const items = state.items.map(value => {
        if (value.id === action.payload.cluster) {
          value.selected = action.payload.values.length > 1 ? 'Multiple Selected' : action.payload.values[0];
        }
        return value;
      });

      return { ...state, items };
    }
    default:
      return state;
  }
}
