const baseValue = {
  results_id: '',
  total: 0,
  page: 1,
  pages: 0,
};

export default (base = baseValue, paginator, search, tourShowable, query, self, partner, config) => ({
  ...query,
  ...base,
  page: paginator.page,
  total: paginator.total_count,
  max: search.count,
  tourShowable: !!tourShowable,
  format: query.view ? query.view : ((config.config || config).listing_view || {}).type || 'list',
  type: search.preferred_selection === 'most_preferred' ? 'most_preferred' : search.search_type,
  category: search.search_type,
  selection: search.preferred_selection,
  pages: Math.ceil(paginator.total_count / paginator.limit_per_page),
  results_id: paginator.key,
  viewed: query.viewed,
});
