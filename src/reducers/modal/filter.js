import types from '../../action_types';

const initialState = {
  name: '',
  source: '',
  type: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, source, facetBar } = action.payload;
      if (modal !== 'filters') {
        return state;
      }
      return {
        ...state,
        source,
        type: source,
        facetBar,
      };
    }
    default:
      return state;
  }
}
