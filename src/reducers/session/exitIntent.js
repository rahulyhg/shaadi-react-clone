/* eslint no-underscore-dangle: 0 */
import types from '../../action_types';

// Records which modal if any to show on exit intent
const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LAYER_SUCCESS: {
      if (action.payload.layerId !== 'exitIntent') {
        return state;
      }
      return action.payload.modal;
    }
    default: {
      return state;
    }
  }
}
