import profile from '../profile';
import meta from './meta';

const baseValue = {
  profiles: [],
  meta: {},
};

export default (base = baseValue, payload = {}) => ({
  ...base,
  profiles: payload.data.map(prof => profile(undefined, prof)) || [],
  meta: meta(
    undefined,
    payload.paginator,
    payload.search,
    payload.responseType,
    payload.request_count,
    payload.search_type,
    payload.remark,
  ),
});
