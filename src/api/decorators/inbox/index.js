import decorators from '../../decorators';
import meta from './meta';
import { formatProfileData } from './utils';
import facets from './facets';
import criteria from './criteria';

export default (memberLogin, payload, requestType, actionType) => {
  const listType = `${requestType}_${actionType}`;
  const profiles = Object.keys(payload).reduce(
    (accum, current) => [...accum, ...payload[current].data.map(prof => decorators.profile(undefined, prof))],
    [],
  );
  const inboxList = formatProfileData(payload.listItem, memberLogin, listType);
  const featuredItems = formatProfileData(payload.featuredItem, memberLogin, listType, 'featured');
  const { listItem } = payload;
  let showTotal =
    listItem.search.criteria && listItem.search.criteria.operands ? Object.keys(listItem.search.criteria.operands).length <= 1 : true;
  showTotal = showTotal ? !listItem.search.inbox_filters.length : showTotal;
  return {
    meta: meta(undefined, { ...inboxList.metaInfo, showTotal }),
    items: inboxList.items,
    profiles,
    facets: (listItem.paginator.total_count > 0 && facets(listItem.search.facet_fields, listItem.search.criteria)) || [],
    criteria: (listItem.search.criteria && criteria(undefined, listItem.search, listItem.search.criteria)) || [],
    customFilter: listItem.search.inbox_filters || [],
    featuredItems: { items: featuredItems.items, meta: featuredItems.metaInfo && meta(undefined, featuredItems.metaInfo) },
  };
};
