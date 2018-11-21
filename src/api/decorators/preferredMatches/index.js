import meta from './meta';
import facets from './facets';
import profile from '../profile';

const baseValue = {
  profiles: [],
  meta: {},
  facets: {},
  featuredProfiles: [],
};

export default (base = baseValue, payload = {}, query = {}, self = {}, partner = {}, config = {}) => ({
  ...base,
  profiles: payload.data.map(prof => profile(undefined, prof, { partner })),
  meta: meta(undefined, payload.paginator, payload.search, payload.tourShowable, query, self, { partner }, { config }),
  facets: (payload.search.count > 0 && facets(payload.search.facet_fields, payload.search.criteria)) || [],
  featuredProfiles: payload.featured.map(prof => profile(undefined, prof, { partner })),
});
