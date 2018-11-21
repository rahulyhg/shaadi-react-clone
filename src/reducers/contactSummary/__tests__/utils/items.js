const initialState = {
  uid: null,
  justNow: false,
  photoLoading: false,
  changeCursorStatus: true,
  displayStatusMessage: '',
  viewSmsShowStatus: false,
};

const getAction = (type, data = {}) => ({
  type,
  payload: {
    error: data.error || {},
    uid: data.uid || '',
    albumStatus: data.albumStatus || '',
    source: data.source || '',
    type: data.type || '',
    meta: data.meta || {},
    profiles: data.profiles || {},
    items: {
      items: data.items || [],
      tooltip: data.tooltip || {},
    },
    body: data.body || {},
    page: data.page || '',
    positions: data.positions || [],
    key: data.key || '',
  },
});

const factory = { initialState, getAction };

it('should export state and action', () => {
  expect(Object.keys(factory).length).toEqual(2);
});

export default factory;
