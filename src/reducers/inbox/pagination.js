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
    case types.INBOX_DATA_SUCCESS: {
      const { meta } = action.payload;
      return {
        ...state,
        isVisible: true,
        page: `${meta.page}`,
        activePage: parseInt(meta.page, 0),
        pageCount: meta.pages,
        itemPerPage: meta.itemPerPage,
        total: meta.total,
      };
    }
    case types.INBOX_DATA_REQUEST:
      return { ...state, isVisible: false };
    default:
      return state;
  }
};
