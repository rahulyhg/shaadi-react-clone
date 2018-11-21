/* eslint no-underscore-dangle: 0 */
import ww4 from '../ww4';
import batchRequestService from '../services/batchRequestService';

const searches = {
  matches: 'preferred',
  'recently-joined': 'recently-joined',
  near_me: 'near_me',
  'matches-preferred': 'preferred',
  discovery_premium: 'discovery_premium',
  discovery_recent_visitors: 'discovery_recent_visitors',
  discovery_newly_joined: 'discovery_newly_joined',
  broader: 'broader',
  reverse: 'reverse',
};

const requests = {
  invitations_new: 'connect_pending_new',
  accepted_new: 'connect_accepted_new',
  _photoReqNew: 'photo_pending_new',
  _photoPassReqNew: 'photoaccess_pending_new',
  _contactReqNew: 'contact_pending_new',
  _photoReqAcceptedNew: 'photo_accepted_new',
  _photoPassAcceptedNew: 'photoaccess_accepted_new',
  _contactReqAcceptedNew: 'contact_accepted_new',
  inbox: 'connect_pending_total',
  invitations: 'connect_pending_total',
  accepted: 'connect_accepted_total',
  filteredOut: 'connect_filtered_total',
  photo_pending_new: 'photo_pending_new',
  photo_pending: 'photo_pending_total',
  contact_pending: 'contact_pending_total',
  contact_pending_new: 'contact_pending_new',
  contact_accepted_new: 'contact_accepted_new',
  contact_accepted: 'contact_accepted_total',
  photo_accepted: 'photo_accepted_total',
  photo_accepted_new: 'photo_accepted_new',
  accepted_sent_today: 'accepted_sent_today',
};

const show = (logger, query, auth) => {
  const { uid } = auth;
  const batchRequests = {
    countReco: ww4.searchCounts(uid, 'daily_recommendations'),
    countRequests: ww4.requestCounts(uid, Object.keys(requests).map(k => requests[k])),
  };
  Object.keys(searches).forEach(k => {
    batchRequests[`count_${searches[k]}`] = ww4.searchCounts(uid, searches[k]);
  });

  return batchRequestService(logger, query, auth, batchRequests, data => {
    const { countReco, countRequests } = data;

    const counts = {
      recommendations: countReco.actionNotTaken,
      recommendations_total: countReco.totalCount,
    };

    const tempCounts = {};

    Object.keys(searches).forEach(k => {
      const v = `count_${searches[k]}`;
      counts[k] = data[v] && data[v].search ? data[v].search.count : 0;
    });

    Object.keys(requests).forEach(k => {
      if (k.startsWith('_')) {
        tempCounts[k] = countRequests && countRequests.data ? countRequests.data[requests[k]] : 0;
      } else {
        counts[k] = countRequests && countRequests.data ? countRequests.data[requests[k]] : 0;
      }
    });
    tempCounts.inbox =
      counts.invitations_new +
      counts.accepted_new +
      tempCounts._photoReqNew +
      tempCounts._photoPassReqNew +
      tempCounts._contactReqNew +
      tempCounts._photoReqAcceptedNew +
      tempCounts._photoPassAcceptedNew +
      tempCounts._contactReqAcceptedNew;
    counts.inbox = tempCounts.inbox > 0 ? tempCounts.inbox : counts.inbox;
    counts.moreMatches = counts.discovery_premium + counts.discovery_recent_visitors + counts.broader + counts.reverse;
    counts.discover = counts.discovery_premium + counts.discovery_newly_joined + counts.discovery_recent_visitors;
    counts.topBarMatches = counts.recommendations ? counts.recommendations : counts.matches;
    counts.requests = counts.contact_pending + counts.photo_pending;
    counts.requestsPending = counts.contact_pending + counts.photo_pending;
    counts.requestsAccepted = counts.photo_accepted + counts.contact_accepted;
    counts.newRequestsAccepted = counts.photo_accepted_new + counts.contact_accepted_new;
    counts.newRequestsPending = counts.photo_pending_new + counts.contact_pending_new;
    counts.today_accepts_sent = counts.accepted_sent_today;
    return { counts };
  });
};

export default {
  show,
};
