import types from '../../action_types';
import { createAlertReducer } from '../utils';

const tooltipReducer = createAlertReducer(['hoverCard'], ['photo', 'eoi']);

const initialState = {
  uid: null,
  loading: false,
  flash: null,
  tooltip: tooltipReducer(undefined, {}),
  photoLoading: false,
  eoiLoadingStyle: 'none',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PROFILE_HOVER:
      return {
        ...initialState,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
}
