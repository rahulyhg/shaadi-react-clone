import { identifyCommunity, ucword } from '../../../utils';

const community = identifyCommunity(window.location.hostname)
  .myDomain.split('.')
  .slice(1)
  .join('.');

const defaultState = {
  loading: true,
  freshLoading: true,
  listType: 'connect_pending',
  counts: {},
  frozenBy: null,
  requestType: { type: 'connect', action: 'pending' },
  pageTitle: `${ucword(community)} - Find Your Life Partner`,
};

const state = {
  default: {
    ...defaultState,
  },
  request: {
    ...defaultState,
    loading: true,
  },
  success: {
    ...defaultState,
    counts: {
      updated: {
        connect_accepted: 3,
      },
    },
    itemPerPage: 10,
    listType: 'connect_accepted',
    page: 1,
    pages: 1,
    permalink: 'permalink',
    requestType: { type: 'connect', action: 'accepted' },
    results_id: 'results_id',
    total: 3,
    loading: false,
    freshLoading: false,
    listCount: {},
  },
  count_success: {
    ...defaultState,
    counts: {
      total: {
        connect_accepted: 3,
        connect_filtered: 1,
        connect_pending: 0,
        connect_pending_new: 0,
        request_accepted: 0,
        request_pending: 0,
      },
      updated: {
        connect_accepted: 3,
        connect_filtered: 1,
        connect_pending: 0,
        connect_pending_new: 0,
        request_accepted: 0,
        request_pending: 0,
      },
    },
  },
};

const payload = {
  request: {
    params: {
      configs: {
        action: 'connect',
        type: 'pending',
      },
    },
  },
  success: {
    meta: {
      itemPerPage: 10,
      listType: 'connect_accepted',
      page: 1,
      pages: 1,
      permalink: 'permalink',
      requestType: { type: 'connect', action: 'accepted' },
      results_id: 'results_id',
      total: 3,
    },
  },
  count_success: {
    counts: {
      accepted: 3,
      accepted_new: 0,
      broader: 11007,
      discover: 3149,
      discovery_newly_joined: 2120,
      discovery_premium: 1019,
      discovery_recent_visitors: 10,
      filteredOut: 1,
      inbox: 0,
      invitations: 0,
      invitations_new: 0,
      matches: 37119,
      'matches-preferred': 37119,
      moreMatches: 20234,
      near_me: 0,
      'recently-joined': 2070,
      recommendations: 20,
      reverse: 8198,
      topBarMatches: 20,
    },
  },
};

const meta = {
  state,
  payload,
};

it('should export state, payload', () => {
  expect(Object.keys(meta).length).toEqual(2);
});

export default meta;
