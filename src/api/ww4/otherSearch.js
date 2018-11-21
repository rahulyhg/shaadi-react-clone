/* eslint camelcase: 0 */
export default ({ uid, results_id, type, page, limit_per_page, viewed, sort, view, refined_cluster, refined_values, file_extension }) => {
  const request = {
    relative_url: `/searches/${uid}`,
    method: 'get',
    query: {
      type,
      page,
      limit_per_page,
      viewed,
      profile_options:
        '{"fieldset":["basic","lifestyle","health_info","appearance","family","trait","origin","doctrine","account","location","profession","education","verification"]}',
      photo_options: `{"fieldset":["count","photos"],"size":["small","medium","semilarge","120X120","450X600","250X310"],"blur":true,"thumb_param":"_nb"${
        file_extension === 'webp' ? ',"file_extension":"webp"' : ''
      }}`,
      astro_options: '{ "fieldset":["details"] }',
      result_options: '{"fieldset":["profileids","paginator","spotlight","criteria","facet_fields","shortlist_count","count","featured"]}',
      contact_options: '{"fieldset":["details"]}',
      derived_options:
        '{"fieldset":["preferences","chat_presence","chat_details","intents","horoscope_score","match_tag","profile_views", "relationship_actions"]}',
      derived_text: '{"fieldset":["matching_data","family_details","horoscope_details","income"]}',
      sort,
      view,
      facet_options: '{"view_more": true}',
      key: results_id,
      days: ['discovery_recent_visitors', 'discovery_recent_visitors_two_way', 'discovery_premium', 'discovery_premium_2way'].includes(type)
        ? 30
        : '',
      preferred_selection: ['recently-joined'].includes(type) ? 'setting' : '',
    },
  };

  const refined_options =
    refined_cluster === 'caste'
      ? refined_values.map(v => (v === 'All' ? 'All' : { religion: v.split(':')[0], caste: v.split(':')[1] }))
      : JSON.stringify(refined_values);

  if (type === 'refine') {
    request.method = 'post';
    request.body = {
      key: results_id,
      refined_action: 'insert',
      refined_cluster,
      refined_options,
    };
  }

  return request;
};
