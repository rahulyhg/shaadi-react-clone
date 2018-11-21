import meta from './meta';
import profile from '../profile';

const baseValue = {
  profiles: [],
  meta: {},
};

export default (base = baseValue, payload = {}, query = {}) => ({
  ...base,
  profiles: payload.data.map(prof => profile(undefined, prof)),
  meta: meta(undefined, payload.paginator, payload.search, query),
});
