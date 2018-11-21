import types from '../../action_types';

const initialState = {
  drawerOpen: false,
  headerHidden: false,
  headerNavHidden: false,
  downloadBanner: false,
  toast: {},
  hideNav: false,
  showHideOnScroll: false,
};
const headerHidden = string => {
  const hiddenHeaderPage = ['/inbox/chats/history', '/inbox/accepted/requests', '/inbox/sent/requests'];
  return hiddenHeaderPage.some(value => string.startsWith(value));
};
const showHideOnScroll = string => {
  const hiddenHeaderPage = ['/search', '/profile'];
  return hiddenHeaderPage.some(value => string.startsWith(value));
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.ROUTE_CHANGE: {
      return {
        ...state,
        showHideOnScroll: showHideOnScroll(action.payload.pathname),
        headerHidden: headerHidden(action.payload.pathname),
        headerNavHidden: action.payload.pathname.startsWith('/profile') && !action.payload.pathname.startsWith('/profile/'),
      };
    }
    case types.M_DRAWER_ACTION: {
      const { payload } = action;
      if (payload === 'open') return { ...state, drawerOpen: true };
      if (payload === 'close') return { ...state, drawerOpen: false };
      if (payload === 'toggle') return { ...state, drawerOpen: !state.drawerOpen };
      return state;
    }
    case types.TOAST_SHOW: {
      const { payload } = action;
      return {
        ...state,
        toast: payload,
      };
    }

    case types.DOWNLOAD_BANNER_SHOW: {
      return {
        ...state,
        downloadBanner: true,
      };
    }

    case types.DOWNLOAD_BANNER_HIDE: {
      return {
        ...state,
        downloadBanner: false,
      };
    }

    case types.TOAST_HIDE_KEY:
    case types.TOAST_HIDE: {
      const { payload } = action;
      return {
        ...state,
        toast: payload,
      };
    }
    case types.NAV_HIDDEN: {
      // return state;
      if (state.hideNav === action.payload.hideNav) {
        return state;
      }
      return {
        ...state,
        hideNav: action.payload.hideNav,
      };
    }

    default:
      return state;
  }
}
