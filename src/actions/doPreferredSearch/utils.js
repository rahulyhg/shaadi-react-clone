/* eslint camelcase: 0 */
import { parse, stringify } from 'qs';
import perPage from '../../constants/perPage';

const cacheKey = (pageName, uid, query) => `${uid}::${pageName}?${stringify(query)}`;

const encode64 = obj => window.btoa(unescape(encodeURIComponent(JSON.stringify(obj))));

const searchParams = ({ path, query, changes, isMostPreferred, defaultFormat }) => {
  const { pg_searchresults_id, page, sort_type, vtype, matches } = {
    ...query,
    ...changes,
  };
  const { cluster, values } = changes;
  const results_id = pg_searchresults_id && pg_searchresults_id.length > 0 ? pg_searchresults_id : undefined;
  const format = 'server-based';
  const search_type = matches === 'twoways' ? '2-way' : 'server-based';
  const viewed = /viewed/i.test(path) ? 'Y' : 'N';
  const per_page = `${perPage('/search/partner')}`;

  if (['moreMatches'].includes(cluster)) {
    return {
      search_type: `switch-to-${values[0]}`,
      format: vtype || 'server-based',
      viewed,
      per_page,
    };
  }

  if (['matches'].includes(cluster)) {
    return {
      search_type: values[0] === '2-way' ? '2-way' : 'server-based',
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
  const path = viewed === 'Y' ? '/search/partner/viewed' : '/search/partner';
  const query = {
    pg_searchresults_id: results_id,
    page: page === 1 ? undefined : page,
    sort_type: sort === 'score' ? undefined : sort,
    vtype: format,
    spn: format,
    matches: type === 'preferred' ? undefined : type === '2-way' ? 'twoways' : undefined,
  };
  return {
    href: `${path}?${stringify(query)}`,
    path,
    query,
    params: searchParams({ path, query, changes: {}, defaultFormat }),
  };
};

export { cacheKey, encode64, searchParams, canonicalUrl };
