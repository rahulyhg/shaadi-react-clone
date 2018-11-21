/* eslint camelcase: 0 */
const baseValue = {
  results_id: '',
  total: 0,
  page: 1,
};

export default (base = baseValue, paginator, search, responseType = 'unviewed', request_count, search_type, remark = {}) => ({
  ...base,
  page: paginator.page,
  total: paginator.total_count,
  max: (search && search.count) || request_count,
  type: search_type,
  category: search_type,
  results_id: paginator.key,
  responseType,
  remark,
});
