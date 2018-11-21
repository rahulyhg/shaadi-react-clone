const limitPerPage = {
  connect_pending: 20,
};

const searchParam = ({ queryParam, queryStr, postParam = {}, isWebp = false }) => {
  const { action, listType } = queryParam;
  const { page = queryStr.page } = queryParam;
  let { type = 'pagination' } = queryParam;
  const { pg_searchresults_id } = queryStr;
  const { cluster, values } = postParam;
  const limit_per_page = limitPerPage[listType] || 10;
  const results_id = pg_searchresults_id && pg_searchresults_id.length > 0 ? pg_searchresults_id : undefined;
  let methodType = 'get';
  if (Object.keys(postParam).length) {
    methodType = 'post';
    type = 'refine';
  }
  const params = { data: {}, configs: { type, action, isWebp } };

  type === 'pagination' && (params.configs.key = results_id);
  type !== 'refine' && (params.configs.page = page);
  params.configs.limit_per_page = limit_per_page;

  if (methodType === 'post') {
    params.data.key = results_id;
    params.data.refined_action = 'insert';
    params.data.refined_cluster = cluster;
    params.data.refined_options = values;
    params.configs.type = 'refine';
    params.configs.facet_options = {
      sort: 'default',
      order: 'desc',
      view_more: 'true',
    };
  }

  const q = { params, method: methodType };
  return q;
};
export { searchParam };
