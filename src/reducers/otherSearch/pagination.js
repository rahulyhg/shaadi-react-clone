import types from '../../action_types';

const initialState = {
  isVisible: false,
  page: '-1',
  activePage: 0,
  pageCount: 0,
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.OTHER_SEARCH_SUCCESS: {
      const { meta } = action.payload;
      return {
        ...state,
        isVisible: true,
        page: `${meta.page}`,
        activePage: meta.page,
        pageCount: meta.pages,
        total: meta.total,
      };
    }
    case types.OTHER_SEARCH_REQUEST:
      return { ...state, isVisible: false };
    default:
      return state;
  }
};
