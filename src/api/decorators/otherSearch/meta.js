const baseValue = {
  results_id: '',
  total: 0,
  page: 1,
  pages: 0,
};

export default (base = baseValue, paginator, search, query, self, partner) => ({
  ...query,
  ...base,
  page: paginator.page,
  total: paginator.total_count,
  max: search.count,
  format: self.location ? (self.location.country === 'India' ? 'list' : 'grid') : query.view || 'list',
  type: search.search_type,
  preferred_selection: search.preferred_selection || '',
  category: search.search_type,
  pages: Math.ceil(paginator.total_count / paginator.limit_per_page),
  results_id: paginator.key,
  viewed: query.viewed,
});
