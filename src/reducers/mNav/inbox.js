/* eslint camelcase: 0 */
import types from '../../action_types';
import { decode64, createSubNavReducer, isMenuActive } from '../utils';

const commmonSubReducer = createSubNavReducer();

/* inbox Sub-menus */

const invitationsInitialState = {
  key: 'invitations',
  newCntKey: 'invitations_new',
  label: 'Invitations',
  path: '/inbox/pending/interests',
  otherPaths: ['/inbox/filteredout'],
  url: '/inbox/pending/interests',
  refs: ['widget-myshaadi_premium_interest_wall', 'inbox_pre_logout', 'inbox-interests', 'inbox-filteredout', 'featured_invitation'],
  isExternal: false,
  isActive: false,
  count: 0,
  isNew: false,
};

const invitations = (state = invitationsInitialState, action) => {
  switch (action.type) {
    case types.INBOX_DATA_SUCCESS: {
      const { listType } = action.payload.meta;
      const newState =
        listType === 'connect_pending' && state.isNew
          ? {
              ...state,
              isNew: false,
              count: state.readCount,
            }
          : state;
      return newState;
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const acceptedInitialState = {
  key: 'accepted',
  newCntKey: 'accepted_new',
  label: 'Accepted',
  path: '/inbox/accepted/interests',
  url: '/inbox/accepted/interests',
  refs: ['inbox-accepted_members'],
  isExternal: false,
  isActive: false,
  count: 0,
  isNew: false,
};

const accepted = (state = acceptedInitialState, action) => {
  switch (action.type) {
    case types.INBOX_DATA_SUCCESS: {
      const { listType } = action.payload.meta;
      const newState =
        listType === 'connect_accepted' && state.isNew
          ? {
              ...state,
              isNew: false,
              count: state.readCount,
            }
          : state;
      return newState;
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const sentInitialState = {
  key: 'sent',
  label: 'Sent',
  path: '/inbox/sent/interests',
  url: '/inbox/sent/interests',
  refs: ['inbox-sent_interests'],
  isExternal: false,
  isActive: false,
  count: 0,
};

const sent = (state = sentInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};
const requestsInitialState = {
  key: 'requests',
  label: 'Requests',
  path: '/inbox/pending/requests',
  url: '/inbox/pending/requests',
  otherPaths: ['/inbox/accepted/requests', '/inbox/pending/requests', '/inbox/sent/requests'],
  refs: ['inbox-requests', 'inbox-sent_requests', 'inbox-accepted_requests'],
  isExternal: false,
  isActive: false,
  count: 0,
};

const requests = (state = requestsInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const deletedInitialState = {
  key: 'deleted',
  label: 'Deleted',
  path: '/inbox/archived/interests',
  url: '/inbox/archived/interests',
  refs: ['inbox-deleted_interests'],
  isExternal: false,
  isActive: false,
  count: 0,
};

const deleted = (state = deletedInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

/* inbox Top menu */

const nav = (state, action) => {
  const newState = [
    invitations(state[0], action),
    accepted(state[1], action),
    requests(state[2], action),
    sent(state[3], action),
    deleted(state[4], action),
  ];

  return newState.map((st, i) => (JSON.stringify(st) === JSON.stringify(state[i]) ? state[i] : st));
};

const inboxInitialState = {
  key: 'inbox',
  label: 'Inbox',
  url: '/inbox/pending/interests',
  isExternal: false,
  otherPaths: ['/inbox/filteredout'],
  isActive: false,
  count: 0,
  nav: nav([], {}),
};

export default function(state = inboxInitialState, action = {}) {
  const { payload, type } = action;
  switch (type) {
    case types.ROUTE_CHANGE:
      return {
        ...state,
        nav: nav(state.nav, action),
        isActive: isMenuActive({ payload, state }),
      };
    case types.EVT_REF: {
      if (!payload || payload.length === 0) {
        return state;
      }
      const { evt_ref } = payload;
      let evt = evt_ref && decode64(evt_ref);
      const setProfilesBack = (!payload.set_profiles_back && evt === 'pre_logout' && 'inbox_pre_logout') || '';

      if (['inbox_pre_logout'].includes(setProfilesBack)) {
        evt = setProfilesBack;
      }
      if (!state.nav.some(n => (n.refs || []).includes(evt))) {
        return state;
      }
      return {
        ...state,
        isActive: true,
        nav: nav(state.nav, { ...action, payload: evt }),
      };
    }
    case types.COUNTS_CACHE:
    case types.COUNTS_SUCCESS: {
      if (!payload || !payload.counts) {
        return state;
      }
      return {
        ...state,
        count: payload.counts.inbox,
        nav: nav(state.nav, action),
      };
    }

    case types.INBOX_DATA_SUCCESS: {
      const { listType } = action.payload.meta;
      return ['connect_pending', 'connect_accepted'].includes(listType)
        ? {
            ...state,
            nav: nav(state.nav, action),
          }
        : state;
    }

    default:
      return state;
  }
}
