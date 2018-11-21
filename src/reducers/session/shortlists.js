/* eslint no-underscore-dangle: 0 */
import types from '../../action_types';

const initialState = {
  items: [],
};

const rename = str => (str === 'My 1st List' ? `My Maybe's` : str);

const shortlist = (state = {}, action) => {
  switch (action.type) {
    case types.SHORTLIST_CREATE_SUCCESS:
    case types.SESSION_SUCCESS:
      return {
        ...state,
        key: `sl-${action.payload.id}`,
        id: `${action.payload.id}`,
        label: rename(action.payload.name),
      };
    default:
      return state;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SESSION_CACHE:
    case types.SESSION_SUCCESS:
      return {
        ...state,
        items: action.payload.map(item => shortlist(undefined, { ...action, payload: item })),
      };
    case types.SHORTLIST_CREATE_SUCCESS:
      return {
        ...state,
        items: state.items.concat([shortlist(undefined, action)]),
      };
    case types.UNAUTH:
      return false;
    default:
      return state;
  }
}
