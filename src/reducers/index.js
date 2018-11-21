import { combineReducers } from 'redux';
import chat from './chat';
import config from './config';
import header from './header';
import nav from './nav';
import session from './session';
import preferredSearch from './preferredSearch';
import otherSearch from './otherSearch';
import successStories from './successStories';
import profiles from './profiles';
import metadata from './metadata';
import view from './view';
import profilePage from './profilePage';
import hoverCard from './hoverCard';
import discoverMatchesGroup from './discoverMatchesGroup';
import inbox from './inbox';
import ui from './ui';
import dailyRecommendationPage from './dailyRecommendationPage';
import contactSummary from './contactSummary';
import cartPage from './cartPage';
import device from './device';
import payment from './payment';
import orderSuccess from './orderSuccess';
import csatSurvey from './csatSurvey';
import similarProfiles from './similarProfiles';
import cancelApi from './cancelApi';
import privacySettings from './privacySettings';

/**
 * @param {Object} - key/value of reducer functions
 */
const createReducer = asyncReducers =>
  combineReducers({
    chat,
    config,
    header,
    nav,
    session,
    preferredSearch,
    otherSearch,
    successStories,
    profiles,
    metadata,
    view,
    profilePage,
    hoverCard,
    discoverMatchesGroup,
    inbox,
    ui,
    dailyRecommendationPage,
    contactSummary,
    cartPage,
    device,
    payment,
    orderSuccess,
    csatSurvey,
    similarProfiles,
    cancelApi,
    privacySettings,
    // When reducers are provided to createReducer they'll be plopped on here
    ...asyncReducers,
  });

export default createReducer;
