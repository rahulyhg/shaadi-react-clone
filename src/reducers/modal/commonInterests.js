import types from '../../action_types';

const initialState = {
  hisHer: '',
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, himHer, items } = action.payload;
      if (modal !== 'commonInterests') {
        return state;
      }
      return {
        ...state,
        himHer,
        items,
      };
    }
    default:
      return state;
  }
}
