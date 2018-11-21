import meta from './meta';
import profile from '../profile';

const baseValue = {
  profiles: [],
  meta: {},
};

export default (baseline = baseValue, payload = {}, queryParams) => ({
  ...baseline,
  profiles: payload.data.map(prof => profile(undefined, prof)),
  meta: meta(undefined, payload.paginator),
});
