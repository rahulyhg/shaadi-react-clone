/* global goog_report_conversion: true, ShaadiDataLayer: true */
/* eslint no-underscore-dangle: 0, camelcase: 0 */

window.ShaadiDataLayer = window.ShaadiDataLayer || [];

const setSessionVar = cookies => {
  if (cookies.gptrk) { // Enable Google Pixel Tracking
    goog_report_conversion();
  }
  // ga('set', '_setVar', cookies.mplan);
  // ga('set', 'Sessions', cookies.ga_sessions);
  // ga('set', 'dimension7', cookies.abclogin);
};

const setLoggerVar = profile => {
  const age = parseInt(profile.basic.age, 10);
  const profileAge = getProfileAge(age);
  const genderPostedBy = getGenderPostedBy(profile);
  const castMotherTongue = getCastMotherTongue(profile);
  const isFreeUser = profile.account.membership && profile.account.membership[0] && profile.account.membership[0].indexOf('Free') !== -1;

  ShaadiDataLayer.push({
    'P-Age': profileAge,
    'Gender-PostedBy': genderPostedBy,
    'Community': castMotherTongue,
    'isFreeUser' : isFreeUser,
    doctrine_caste: (profile.doctrine || {}).caste,
    account_postedBy: (profile.account || {}).postedBy,
    basic_gender: (profile.basic || {}).gender,
  });
  // ga('set', 'P-Age', profileAge);
  // ga('set', 'Gender-Postedby', genderPostedBy);
  // ga('set', 'Community', castMotherTongue);

  // setDimensions(profile);
  // tackVirtualPage();
};

/*
const tackVirtualPage = () => {
   ga("create", "UA-1319529-8", "auto", "gaVirtualPage");
   ga("gaVirtualPage.send", "pageview");
}

const setDimensions = profile => {
  const isFreeUser = profile.account.membership && profile.account.membership[0] && profile.account.membership[0].indexOf('Free') !== -1;
  ga('set', 'dimension2', profile.doctrine.caste);
  ga('set', 'dimension3', profile.doctrine.mother_tongue);
  ga('set', 'dimension4', profile.account.postedBy || '0');
  ga('set', 'dimension5', profile.basic.gender || '0');
  ga('set', 'dimension6', isFreeUser ? '2' : '1');
  ga("set", "dimension8", "Desktop");
}
*/

const trackProfileViews = settings => {
  let Page = '';
  if (settings.isFamilyGamified && settings.isAstroGamified) {
    Page = 'Views|Blocked-Family-Astro';
  } else if (settings.isFamilyGamified) {
    Page = 'Views|Blocked-Family';
  } else if (settings.isAstroGamified) {
    Page = 'Views|Blocked-Astro';
  }

  if (Page) {
    ShaadiDataLayer.push({ event: 'ProfilePage.Views', ga_category: 'ProfilePage', ga_action: 'Views', ga_label: Page.split('|')[1] });
    // ga('send', 'event', 'ProfilePage', 'Views', Page.split('|')[1]);
  }
}

const trackEoiEvent = (action, source = '') => {
  ShaadiDataLayer.push({ event: `EOI.${action}`, ga_category: 'EOI', ga_action: action, ga_label: source });
  // ga('send', 'event', 'EOI', action, source)
};


const getGenderPostedBy = profile => {
  const gender = profile.basic.gender;
  const postedBy = profile.account.posted_by;
  return `${gender} | ${postedBy}`;
};

const getCastMotherTongue = profile => {
  const caste = profile.doctrine.caste;
  const motherTongue = profile.doctrine.mother_tongue;
  return `${caste}:${motherTongue}`;
};

const getProfileAge = age => {
  /* eslint prettier/prettier: 0 */
  const profileAge =
    age < 1 ? '01: 0' :
    age < 8 ? '02: 1-7' :
    age < 16 ? '03: 8-15' :
    age < 31 ? '04: 16-30' :
    age < 91 ? '05: 31-90' :
    age < 181 ? '06: 91-180' :
    age > 181 ? '07: 180+' :  'none';
  return profileAge;
};

const sendEvent = (event, ga_category, ga_action, ga_label) => {
  console.log('Analytics event', event, ga_category, ga_action, ga_label);
  ShaadiDataLayer.push({ event, ga_category, ga_action, ga_label });
  // ga('send', 'event', ga_category, ga_action, ga_label);
};

const createProfile = step =>
  sendEvent(
    `reactProfileCreation.step-${step}`,
    'reg_events',
    `step-${step}`,
    'Continue/Submit profile creation - Click',
);

const trackAlbumClick = () => sendEvent('PhotoViews.Album', 'Photo Views', 'Album', 'Profile Page');
const trackDailyClick = () => sendEvent('ExitIntentDaily.Ok', 'ActionComplete', 'Exit Intent Layer - Click', 'Exit Intent Layer - Profile Recommendation Click');
const trackNotDailyClick = () => sendEvent('ExitIntentDaily.Cancel', 'ActionComplete', 'Exit Intent Layer - Click', 'Exit Intent Layer - Later Click');
const trackPendingClick = () => sendEvent('ExitIntentPending.Ok', 'ActionComplete', 'ActionComplete', 'Pending Interest Exit Layer - Click', 'Pending Interest Exit Layer – Respond Now Click')
const trackNotPendingClick = () => sendEvent('ExitIntentPending.Cancel', 'ActionComplete',  'Pending Interest Exit Layer - Click', 'Pending Interest Exit Layer – Close Click');

export default {
  setSessionVar,
  setLoggerVar,
  trackProfileViews,
  trackEoiEvent,
  trackAlbumClick,
  trackDailyClick,
  trackNotDailyClick,
  trackPendingClick,
  trackNotPendingClick,
  createProfile,
};