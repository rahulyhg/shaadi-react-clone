/* global window */
import types from '../../action_types';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));
const decode64 = str => decodeURIComponent(escape(window.atob(str)));

const maps = {
  '/search/partner': 'matches-most_preferred_viewed',
  '/search/partner/viewed': 'matches-most_preferred_unviewed',
  '/profile': 'profile',
  '/inbox/pending/interests': 'inbox-interests',
  '/inbox/accepted/interests': 'inbox-accepted_members',
  '/inbox/pending/requests': 'inbox-requests',
  '/inbox/accepted/requests': 'inbox-accepted_requests',
  '/inbox/sent/requests': 'inbox-sent_requests',
  '/inbox/sent/interests': 'inbox-sent_interests',
  '/inbox/archived/interests': 'inbox-deleted_interests',
};
const loc = path => maps[path] || path.replace(/\//g, '-');

const initialState = {
  entry_point: 'direct',
  event_loc: null,
  event_loc_url: null,
  event_referrer: null,
  event_referrer_url: null,
  platform: `web-${window.location.hostname}`,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.COOKIE_SUCCESS: {
      const cookies = action.payload;
      return {
        ...state,
        entry_point: cookies.entpt || cookies['entpt-session'] || state.entry_point,
      };
    }
    case types.METADATA: {
      const newState = {
        ...state,
        ...action.payload,
        entry_point: state.entry_point,
        platform: state.platform,
      };
      return {
        ...newState,
        event_loc_ref: encode64(newState.event_loc),
        event_referrer_ref: encode64(newState.event_referrer),
      };
    }
    case types.ROUTE_CHANGE: {
      const prefix = `${window.location.protocol}//${window.location.host}`;
      const { pathname, search, query } = action.payload;
      const url = `${prefix}${pathname}${search}`;
      const isDr = pathname.indexOf('daily-recommendations') > -1;
      const dr_event_ref = 'daily5';
      const refPath = query.evt_ref
        ? decode64(query.evt_ref)
        : isDr
          ? dr_event_ref
          : `/${`${window.document.referrer.split('://')[1]}`
              .split('?')[0]
              .split('/')
              .slice(1, 100)
              .join('/')}`;
      if (state.event_loc_url === url) {
        return state;
      }

      const eventReferrer = loc(refPath);
      const eventReferrerRef = encode64(loc(refPath));

      return {
        ...state,
        event_loc: isDr ? loc('profile') : loc(pathname),
        event_loc_ref: isDr ? encode64(loc(dr_event_ref)) : encode64(loc(pathname)),
        event_loc_url: url,
        event_referrer: eventReferrer,
        event_referrer_ref: state.event_loc_ref || eventReferrerRef,
        event_referrer_url: state.event_loc_url || window.document.referrer,
      };
    }
    default:
      return state;
  }
}
