import types from '../../action_types';

const initialState = {
  items: [
    {
      key: 'score',
      label: 'Default Order',
      isSelected: true,
    },
    {
      key: 'recorddate',
      label: 'Newest First',
      isSelected: false,
    },
    {
      key: 'lastlogindate',
      label: 'Last Logged In',
      isSelected: false,
    },
  ],
};

const option = (state = {}, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_REQUEST:
      if (!action.payload.sort) {
        return state;
      }
      return {
        ...state,
        isSelected: action.payload.sort === state.key,
      };
    case types.OTHER_SEARCH_SUCCESS:
      return {
        ...state,
        isSelected: action.payload.meta.sort === state.key,
      };
    default:
      return state;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.OTHER_SEARCH_REQUEST:
    case types.OTHER_SEARCH_SUCCESS:
      return {
        items: state.items.map(opt => option(opt, action)),
      };
    default:
      return state;
  }
}
