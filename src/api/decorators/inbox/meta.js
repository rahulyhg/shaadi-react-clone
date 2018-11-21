const baseValue = {
  results_id: '',
  total: 0,
  page: 1,
  pages: 0,
  requestType: {},
};

export default (base = baseValue, metaInfo, paginator, requestType) => ({
  ...base,
  showTotal: metaInfo.showTotal,
  listType: metaInfo.listType,
  requestType: metaInfo.requestType,
  page: metaInfo.paginator.page,
  total: metaInfo.paginator.total_count,
  itemPerPage: metaInfo.paginator.limit_per_page,
  pages: Math.ceil(metaInfo.paginator.total_count / metaInfo.paginator.limit_per_page),
  ...metaInfo.track_info,
});
