/* eslint camelcase: 0 */
const profileQueue = ({ uid, results_id, page, viewed, sort, format, refined_cluster, refined_values, refine_type, ...props }) => {
  const request = {
    method: 'get',
    url: `/searches/${uid}`,
    params: {
      _debug: 'search_partner',
      type: refine_type || 'preferred',
      page,
      limit_per_page: 20,
      viewed,
      profile_options: '{"fieldset":["account"]}',
      result_options: '{"fieldset":["profileids", "count"]}',
      sort,
      view: format,
      key: results_id && results_id.length > 0 ? results_id : null,
    },
  };

  const refined_options =
    refined_cluster === 'caste'
      ? refined_values.map(v => (v === 'All' ? 'All' : { religion: v.split(':')[0], caste: v.split(':')[1] }))
      : refined_values;

  if (results_id) {
    request.params.type = refine_type || 'pagination';
  }
  if (results_id && refined_cluster) {
    request.method = 'post';
    request.params.type = 'refine';
    request.data = {
      key: results_id,
      refined_action: 'insert',
      refined_cluster,
      refined_options: JSON.stringify(refined_options),
    };
  }

  return request;
};

export default profileQueue;
