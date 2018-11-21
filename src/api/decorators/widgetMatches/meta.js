const baseValue = {
  results_id: '',
  total: 0,
  page: 1,
  pages: 0,
};

export default (base = baseValue, payload, search = {}, query = {}) => ({
  ...query,
  ...base,
  page: payload.page,
  total: payload.total_count,
  max: search.count,
  type: search.search_type,
  pages: Math.round(payload.total_count / payload.limit_per_page),
  results_id: payload.key,
});
