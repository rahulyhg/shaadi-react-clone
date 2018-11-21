const initialState = {
  loading: false,
};

const getAction = (type, data = {}) => ({
  type,
  payload: {
    loading: data.loading || false,
    file_extension: data.file_extension || '',
    page: data.page || '0',
    pages: data.pages || 0,
    request_id: data.request_id || '',
    results_id: data.results_id || '',
    t: data.t || 0,
    total: data.total || 0,
    meta: data.meta || {},
  },
});

const factory = { initialState, getAction };

it('should export meta:state and action', () => {
  expect(Object.keys(factory).length).toEqual(2);
});

export default factory;
