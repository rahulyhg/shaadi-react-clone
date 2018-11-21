import meta from './meta';
import facets from './facets';
import profile from '../profile';
import criteria from './criteria';

const baseValue = {
  profiles: [],
  meta: {},
  facets: {},
  criteria: {},
  spotlight: [],
  featuredProfiles: [],
};

export default (base = baseValue, payload = {}, query = {}, self = {}, partner = {}) => ({
  ...base,
  profiles: payload.data.map(prof => profile(undefined, prof, { partner })),
  meta: meta(undefined, payload.paginator, payload.search, query, self, { partner }),
  facets: (payload.search.count > 0 && facets(payload.search.facet_fields, payload.search.criteria)) || [],
  criteria: criteria(undefined, payload.search, payload.search.criteria) || [],
  spotlight: (payload.search && payload.search.spotlight) || [],
  featuredProfiles: payload.featured.map(prof => profile(undefined, prof, { partner })),
});
