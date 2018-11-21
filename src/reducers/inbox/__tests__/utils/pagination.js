const defaultState = {
  isVisible: false,
  page: '-1',
  activePage: 0,
  pageCount: 0,
  total: 0,
};

const state = {
  default: {
    ...defaultState,
  },
  request: {
    ...defaultState,
  },
  success: {
    ...defaultState,
    isVisible: true,
    page: '1',
    activePage: 1,
    pageCount: 1,
    itemPerPage: 10,
    total: 3,
  },
};

const payload = {
  success: {
    meta: {
      itemPerPage: 10,
      listType: 'list_type',
      page: 1,
      pages: 1,
      permalink: 'permalink',
      requestType: { type: 'connect', action: 'accepted' },
      results_id: 'results_id',
      total: 3,
    },
  },
};

const pagination = {
  state,
  payload,
};

it('should export state, payload', () => {
  expect(Object.keys(pagination).length).toEqual(2);
});

export default pagination;
