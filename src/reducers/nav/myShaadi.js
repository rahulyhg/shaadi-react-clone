/* eslint camelcase: 0 */
import types from '../../action_types';
import { decode64, createSubNavReducer } from '../utils';

const commmonSubReducer = createSubNavReducer();

/* myShaadi Sub-menus */

const dashboardInitialState = {
  key: 'dashboard',
  label: 'Dashboard',
  path: '/my-shaadi',
  url: '/my-shaadi',
  otherPaths: [],
  isExternal: true,
  isActive: false,
  count: 0,
};

const dashboard = (state = dashboardInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const myProfileInitialState = {
  key: 'myProfile',
  label: 'My Profile',
  path: '/my-shaadi/profile',
  url: '/my-shaadi/profile',
  otherPaths: [],
  isExternal: true,
  isActive: false,
  count: 0,
};

const myProfile = (state = myProfileInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const myPhotosInitialState = {
  key: 'myPhotos',
  label: 'My Photos',
  path: '/my-shaadi/photo',
  url: '/my-shaadi/photo',
  otherPaths: ['/my-shaadi/photo'],
  isExternal: false,
  isActive: false,
  count: 0,
};

const myPhotos = (state = myPhotosInitialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case types.GET_PROFILE_PHOTOS_SUCCESS: {
      return {
        ...state,
        label: payload && payload.data && payload.data.count > 0 ? 'My Photos' : 'Add Photos',
      };
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const myPartnerPreferncesInitialState = {
  key: 'partnerPreferences',
  label: 'Partner Preferences',
  path: '/my-shaadi/partner-profile',
  url: '/my-shaadi/partner-profile',
  otherPaths: [],
  isExternal: true,
  isActive: false,
  count: 0,
};

const myPartnerPrefernces = (state = myPartnerPreferncesInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const mySettingsInitialState = {
  key: 'settings',
  label: 'Settings',
  path: '/my-shaadi/my-account',
  url: '/my-shaadi/my-account',
  otherPaths: [],
  isExternal: true,
  isActive: false,
  count: 0,
};

const mySettings = (state = mySettingsInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const myContactDetailsInitialState = {
  key: 'contactDetails',
  label: 'Contact Details',
  path: '/my-shaadi/contact-details',
  url: '/my-shaadi/contact-details?lnkref=TopNavMenu',
  otherPaths: [],
  isExternal: true,
  isActive: false,
  count: 0,
};

const myContactDetails = (state = myContactDetailsInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const myAstroDetailsInitialState = {
  key: 'astroDetails',
  label: 'Edit Horoscope Details',
  path: '/my-shaadi/astro',
  url: '/my-shaadi/astro',
  otherPaths: [],
  isExternal: true,
  isActive: false,
  count: 0,
};

const myAstroDetails = (state = myAstroDetailsInitialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case types.GET_PROFILE_ASTRO_SUCCESS: {
      return {
        ...state,
        label: payload && payload.data && payload.data.chart ? 'Edit Horoscope Details' : 'Add Horoscope Details',
      };
    }
    default:
      return commmonSubReducer(state, action);
  }
};

const myNotificationsAndFeedsInitialState = {
  key: 'notificationsAndFeeds',
  label: 'Notifications & Feeds',
  path: '/inbox/notifications',
  url: '/inbox/notifications',
  otherPaths: [],
  isExternal: true,
  isActive: false,
  count: 0,
};

const myNotificationsAndFeeds = (state = myNotificationsAndFeedsInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

const myOrdersInitialState = {
  key: 'orders',
  label: 'My Orders',
  path: '/order',
  url: '/order',
  otherPaths: [],
  isExternal: true,
  isActive: false,
  count: 0,
};

const myOrders = (state = myOrdersInitialState, action) => {
  switch (action.type) {
    default:
      return commmonSubReducer(state, action);
  }
};

/* myShaadi Top menu */

const nav = (state, action) => {
  const newState = [
    dashboard(state[0], action),
    myProfile(state[1], action),
    myPhotos(state[2], action),
    myPartnerPrefernces(state[3], action),
    mySettings(state[4], action),
    myContactDetails(state[5], action),
    myAstroDetails(state[6], action),
    myNotificationsAndFeeds(state[7], action),
    myOrders(state[8], action),
  ];
  return newState.map((st, i) => (JSON.stringify(st) === JSON.stringify(state[i]) ? state[i] : st));
};

const myShaadiInitialState = {
  key: 'myShaadi',
  label: 'My Shaadi',
  url: '/my-shaadi',
  otherPaths: ['/my-shaadi/photo'],
  isExternal: true,
  isActive: false,
  count: 0,
  nav: nav([], {}),
};

export default function(state = myShaadiInitialState, action = {}) {
  const { payload, type } = action;
  switch (type) {
    case types.ROUTE_CHANGE:
      return {
        ...state,
        nav: nav(state.nav, action),
        isActive:
          payload &&
          (state.nav.some(item => item.path === payload.pathname || item.otherPaths.includes(payload.pathname)) ||
            state.path === payload.pathname),
      };
    case types.EVT_REF: {
      if (!payload || payload.length === 0) {
        return state;
      }
      const { evt_ref } = payload;
      const evt = evt_ref && decode64(evt_ref);
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
    case types.COUNTS_SUCCESS:
      return {
        ...state,
        count: (payload && payload.counts && payload.counts.myShadi) || state.count,
        nav: nav(state.nav, action),
      };
    case types.GET_PROFILE_ASTRO_SUCCESS:
    case types.GET_PROFILE_PHOTOS_SUCCESS: {
      return {
        ...state,
        nav: nav(state.nav, action),
      };
    }
    default:
      return state;
  }
}
