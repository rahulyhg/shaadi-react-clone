/* eslint camelcase: 0 */
import { parse, stringify } from 'qs';
import perPage from '../../constants/perPage';

const cacheKey = (pageName, uid, query) => `${uid}::${pageName}?${stringify(query)}`;

const encode64 = obj => window.btoa(unescape(encodeURIComponent(JSON.stringify(obj))));

const searchParams = ({ path, query, changes, searchList_type, defaultFormat }) => {
  const { pg_searchresults_id, page, sort_type, vtype } = {
    ...query,
    ...changes,
  };
  const { cluster, values } = changes;
  const results_id = pg_searchresults_id && pg_searchresults_id.length > 0 ? pg_searchresults_id : undefined;
  const format = 'server-based';
  const search_type = searchList_type || 'server-based';
  const viewed = /viewed/i.test(path) ? 'Y' : 'N';
  const per_page = perPage(`${path}`);

  if (['matches'].includes(cluster)) {
    return {
      search_type: search_type || 'server-based',
      format: vtype || 'server-based',
      viewed,
      per_page,
    };
  }

  if (['recentlyViewed'].includes(cluster)) {
    return {
      search_type,
      format: vtype || 'server-based',
      viewed: values[0] || viewed,
      per_page,
    };
  }

  if (cluster && results_id) {
    return parse(
      stringify({
        results_id,
        search_type: 'refine',
        sort: sort_type,
        viewed,
        format: vtype,
        refined_cluster: cluster,
        refined_values: values,
        per_page,
      }),
      { arrayLimit: 1000 },
    );
  }

  if (results_id) {
    const q = {
      search_type: 'pagination',
      results_id,
      viewed,
      format: vtype || 'server-based',
      per_page,
    };
    if (page) q.page = page;
    if (sort_type) q.sort = sort_type;
    return q;
  }

  const q = { search_type, format, viewed, per_page };
  if (sort_type) q.sort = sort_type;
  return q;
};

const canonicalUrl = ({ results_id, page, viewed, sort, format, type }, defaultFormat) => {
  let path = '';
  let matches = '';
  switch (type) {
    case 'recently-joined':
      path = viewed === 'Y' ? '/search/new-matches/viewed' : '/search/new-matches';
      break;
    case 'near_me':
      path = viewed === 'Y' ? '/search/near-me/viewed' : '/search/near-me';
      break;
    case 'broader':
      path = viewed === 'Y' ? '/search/broader/viewed' : '/search/broader';
      break;
    case 'reverse':
      path = '/search/personal';
      break;
    case '2-way':
      path = '/search/ematchmaker';
      break;
    case 'discovery_newly_joined':
    case 'discovery_newly_joined_2way':
      path = viewed === 'Y' ? '/search/discovery/recently-joined-viewed' : '/search/discovery/recently-joined';
      matches = type === 'discovery_newly_joined_2way' ? 'twoways' : undefined;
      break;
    case 'discovery_premium':
    case 'discovery_premium_2way':
      path = viewed === 'Y' ? '/search/discovery/premium-viewed' : '/search/discovery/premium';
      matches = type === 'discovery_premium_2way' ? 'twoways' : undefined;
      break;
    case 'discovery_recent_visitors':
    case 'discovery_recent_visitors_two_way':
      path = viewed === 'Y' ? '/search/discovery/recent-visitors-viewed' : '/search/discovery/recent-visitors';
      matches = type === 'discovery_recent_visitors_two_way' ? 'twoways' : undefined;
      break;
    case 'myshaadi_smartsearch':
    case 'basic_search':
      path = '/search/basic_search';
      break;
    case 'smart_search':
      path = '/search/smart_search';
      break;
    case 'whoisonline':
      path = '/search/online';
      break;
    case 'specialcase_search':
      path = '/search/specialcase';
      break;
    case 'astrology_search':
      path = '/search/astro';
      break;
    default:
      break;
  }

  const query = {
    pg_searchresults_id: results_id,
    page: page === 1 ? undefined : page,
    sort_type: sort === 'score' ? undefined : sort,
    vtype: format,
    spn: format,
    matches: matches || undefined,
  };
  return {
    href: `${path}?${stringify(query)}`,
    path,
    query,
    params: searchParams({ path, query, changes: {}, defaultFormat }),
  };
};

export { cacheKey, encode64, searchParams, canonicalUrl };
