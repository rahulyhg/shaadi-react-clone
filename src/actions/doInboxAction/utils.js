import { parse } from 'qs';

const setFilterReq = (uid, args) => {
  const [, action] = args[0].split('_');
  const type = 'refine';
  const facet_options = {
    sort: 'default',
    order: 'desc',
    view_more: 'true',
  };
  const queryParam = { action, type, facet_options, uid };
  const { pg_searchresults_id: key } = (window.location.search && parse(window.location.search.slice(1))) || '';
  const postParam = {
    key,
    refined_action: 'insert',
    refined_cluster: args[1],
    refined_options: [args[2]],
  };
  return { queryParam, postParam };
};

export { setFilterReq };
