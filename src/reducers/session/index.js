import { parse } from 'qs';
import types from '../../action_types';
import settings from './settings';
import shortlists from './shortlists';
import getIsLoggedOut from './isLoggedOut';
import getIsLoggedIn from './isLoggedIn';
import exitIntent from './exitIntent';
import searchPremiumBanner from './searchPremiumBanner';
import getModulePageName from './getModulePageName';
import getIsNative from '../../helpers/isNative';

const isNative = getIsNative();
const queryParams = parse(window.location.search.slice(1));

const initialState = {
  uid: undefined,
  document: {
    title: '',
  },
  experiments: {},
  areExperimentsFetched: false,
  exitIntent: exitIntent(undefined, {}),
  settings: settings(undefined, {}),
  shortlists: shortlists(undefined, {}),
  isLoggedIn: getIsLoggedIn(undefined, {}),
  isLoggedOut: getIsLoggedOut(undefined, {}),
  searchPremiumBanner: searchPremiumBanner(undefined, {}),
  nextUrl: isNative ? 'http://native_app_fake_url' : '/my-shaadi',
  isNative,
  isStoppage: false,
  canShowSkip: false,
  canShowChat: false,
  canShowLayerPartial: false,
  isUserFetchComplete: false,
  canRedirect: false,
  queryParams,
  rogStatus: {},
  user: {
    isLoggedIn: getIsLoggedIn(undefined, {}),
    isLoggedOut: getIsLoggedOut(undefined, {}),
    errusr: '',
    uid: '',
    gender: '',
    firstName: '',
    lastName: '',
    religion: '',
    motherTongue: '',
    country: '',
    complexion: '',
    built: '',
    height: '',
    weight: '',
    diet: '',
    drink: '',
    smoke: '',
    aboutMe: '',
    hasProfilePhoto: false,
    photos: {},
    heShe: '',
    himHer: '',
    hisHer: '',
    mrMs: '',
    heSheOrYou: '',
    himHerOrYou: '',
    hisHerOrYou: '',
    mrMsOrYou: '',
    heSheOrYour: '',
    himHerOrYour: '',
    hisHerOrYour: '',
    mrMsOrYour: '',
    doOrDoes: '',
    ptnr: '',
    sessionId: '',
    siteDisplay: '',
    litem: 'false',
    slang: 'en-US',
  },
  ...getModulePageName(),
};

const setUserLoggedInOrOut = (state, action) => {
  const isLoggedIn = getIsLoggedIn(state.isLoggedIn, action);
  const isLoggedOut = getIsLoggedOut(state.isLoggedOut, action);
  return {
    isLoggedIn,
    isLoggedOut,
    user: {
      ...state.user,
      isLoggedIn,
      isLoggedOut,
    },
  };
};

export default function(state = initialState, action) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.ROUTE_CHANGE: {
      const modulePageNames = getModulePageName();
      const canShowSkipPageWise = !modulePageNames.isProfileCreationPage && !/^\/stop-page\/phone-setting/i.test(payload.pathname);

      return {
        ...state,
        ...modulePageNames,
        canRedirect: false,
        canShowSkip: canShowSkipPageWise,
      };
    }
    case types.CONTACT_EOI_SUCCESS:
      return {
        ...state,
        settings: settings(state.settings, action),
      };
    case types.UNAUTH:
      return {
        ...initialState,
        ...setUserLoggedInOrOut(state, action),
      };
    case types.SESSION_SUCCESS:
      return {
        ...state,
        ...payload.auth,
        shortlists: shortlists(state.shortlists, { ...action, payload: payload.shortlists }),
        settings: settings(state.settings, { ...action, payload }),
        searchPremiumBanner: searchPremiumBanner(state.searchPremiumBanner, action),
        ...setUserLoggedInOrOut(state, action),
      };
    case types.SHORTLIST_CREATE_SUCCESS:
      return {
        ...state,
        shortlists: shortlists(state.shortlists, action),
        ...setUserLoggedInOrOut(state, action),
      };
    case types.AUTH_SUCCESS:
    case types.AUTH_FAIL:
    case types.SESSION_FAIL:
    case types.COUNTS_FAIL:
    case types.CHATS_DATA_FAIL:
    case types.LAYER_SUCCESS:
      return {
        ...state,
        exitIntent: exitIntent(state.exitIntent, action),
        ...setUserLoggedInOrOut(state, action),
      };
    case types.PREFERRED_SEARCH_FAIL:
    case types.OTHER_SEARCH_FAIL:
    case types.CART_FAIL:
    case types.CART_SUCCESS:
      return {
        ...state,
        ...setUserLoggedInOrOut(state, action),
      };
    case types.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        settings: settings(state.settings, { ...action, payload }),
      };
    case types.PREMIUM_BANNNER_CACHE:
    case types.PREMIUM_BANNNER_SUCCESS:
      return {
        ...state,
        searchPremiumBanner: searchPremiumBanner(state.searchPremiumBanner, action),
      };
    case types.COOKIE_SUCCESS: {
      const { reg_logger, abc, mid, misc2 = '', slang = 'en-US', litem = 'false' } = payload;
      const accessToken = getModulePageName().isProfileCreationPage ? reg_logger : abc;
      const uid = String(accessToken).split('|')[1];
      const siteDisplay = (misc2.match(/s:7:"[a-z]*";/) || [''])[0].split('"')[1] || '';
      return {
        ...state,
        deviceId: mid,
        mid,
        siteDisplay,
        accessToken,
        firstPtnr: payload.first_ptnr,
        sessionId: payload.ltabc,
        errusr: payload.ust || '',
        ptnr: payload.first_ptnr,
        user: { ...state.user, uid, slang, litem },
      };
    }
    case types.GET_EXPERIEMENT_ACTION_SUCCESS: {
      const { data: { experiment: experiments = {} } = {} } = payload.response.data;
      return {
        ...state,
        experiments,
        areExperimentsFetched: true,
      };
    }
    case types.GET_PROFILE_PHOTO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          photos: { ...payload.data },
        },
      };
    case types.GET_SELF_PROFILE_SUCCESS: {
      return {
        ...state,
        isUserFetchComplete: true,
        user: {
          ...state.user,
          ...payload.data,
        },
      };
    }
    case types.GET_SELF_PROFILE_FAIL:
      return {
        ...state,
        isUserFetchComplete: true,
      };
    case types.GET_SELF_PROFILE_REQUEST:
    case types.GET_PROFILE_PHOTO_FAIL:
    case types.GET_PROFILE_PHOTO_REQUEST:
    default:
      return state;
  }
}
