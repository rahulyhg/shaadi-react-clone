import { stringify } from 'qs';
import { asFullDate } from '../utils';

const inboxlistTrackMap = {
  connect_pending: {
    evtRef: 'inbox-interests',
    permalink: `/inbox/pending/interests`,
  },
  connect_accepted: {
    evtRef: 'inbox-accepted_members',
    permalink: `/inbox/accepted/interests`,
  },
  connect_filtered: {
    evtRef: 'inbox-filteredout',
    permalink: `/inbox/filteredout`,
  },
  connect_awaiting: {
    evtRef: 'inbox-sent_interests',
    permalink: `/inbox/sent/interests`,
  },
  connect_deleted: {
    evtRef: 'inbox-deleted_interests',
    permalink: `/inbox/archived/interests`,
  },
  request_pending: {
    evtRef: 'inbox-requests',
    permalink: `/inbox/pending/requests`,
  },
  request_accepted: {
    evtRef: 'inbox-accepted_requests',
    permalink: `/inbox/accepted/requests`,
  },
  request_awaiting: {
    evtRef: 'inbox-sent_requests',
    permalink: `/inbox/sent/requests`,
  },
  featured: {
    evtRef: 'featured_invitation',
    permalink: `/inbox/pending/interests`,
  },
};

const visitorsTrackingInfo = (listType = 'connect_pending', { page, key }) => {
  const queryStr = stringify({ page, pg_searchresults_id: key });
  return {
    ...inboxlistTrackMap[listType],
    permalink: `${inboxlistTrackMap[listType].permalink}?${queryStr}`,
  };
};

const extractListItem = ({ request }, requestType = 'default') => {
  const KeyDataMap = {
    request: request.photo || request.contact || {},
    connect: request.connect || {},
    default: {},
  };
  return KeyDataMap[requestType];
};

const inboxMetaInfo = (metaDataSource, type, action, subList = '') => {
  if (!metaDataSource) {
    return {};
  }
  const listType = subList || `${type}_${action}`;
  return {
    paginator: metaDataSource,
    listType,
    track_info: {
      ...visitorsTrackingInfo(listType, metaDataSource),
      results_id: metaDataSource.key,
    },
    requestType: { type, action },
  };
};
const getRequestDirection = (memberLogin, reqInfo) => (memberLogin === reqInfo.to ? 'in' : 'out');
const formatProfileData = (inboxPayload, memberLogin, listType, subList = '') => {
  if (!inboxPayload) {
    return {};
  }
  const [requestType, actionType] = listType.split('_');
  const items = inboxPayload.data.map(profile => {
    let { viewed_date } = profile.connect;
    const request = extractListItem(profile, requestType);
    ['photo', 'contact'].includes(request.type) && (viewed_date = request.accepted_date);
    const uid = profile.account.memberlogin;
    const from = request.from ? request.from : profile.connect.from;
    const to = request.to ? request.to : profile.connect.to;

    const direction = memberLogin === to ? 'in' : 'out';
    const listInfo = ['photo', 'contact'].includes(request.type) ? request : profile.connect;

    const requestDirection = getRequestDirection(memberLogin, listInfo);
    const requestInfo = {
      type: request.type,
      action: actionType,
      from,
      to,
      isNew: request.isNew,
      actionDate: request.action_date_text,
      actionTS: request.action_date && asFullDate(request.action_date),
      requestKey: request.temp,
      message_id: request.message_id || '',
      message: request.message,
      viewed_date: viewed_date && asFullDate(viewed_date),
      direction,
      requestDirection,
      hide_message: request.hide_message,
    };
    return {
      uid,
      justNow: false,
      eoiLoadingStyle: 'none',
      photoLoading: false,
      requests: { [listType]: requestInfo },
      contact: {
        country_code: profile.contact.country_code || '',
        mask_contact_no: profile.contact.mask_contact_no || '',
      },
      toggleCard: false,
    };
  });
  const metaInfo = inboxMetaInfo(inboxPayload.paginator, requestType, actionType, subList);
  return { items, metaInfo };
};

export { visitorsTrackingInfo, formatProfileData };
