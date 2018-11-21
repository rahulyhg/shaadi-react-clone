import { stringify } from 'qs';

const decode64 = str => {
  if (!str) return '';
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch (err) {
    console.log('Bad ubt', str, err);
    return '';
  }
};

const urlFor = (urlParams = {}, { profileid, ubt, profileNumber, page }) => {
  if (!profileid) return null;
  const q = ubt ? { ...urlParams, profileid, ubt } : { ...urlParams, profileid, profileNumber, navigation: page, pg_show_from: page };
  return `/profile?${stringify(q)}`;
};
const backFor = ({ evt_ref, pg_searchresults_id, pg_ubt }, { page, ubt }) => {
  const [path, results_id] = decode64(ubt).split('|');
  const [pg_path] = decode64(pg_ubt).split('|');
  const q = path && results_id ? { pg_searchresults_id: results_id, page, evt_ref } : { pg_searchresults_id, page, evt_ref };
  if (!path && !pg_path) return null;
  return `${path || pg_path}?${stringify(q)}`;
};
const extractIcon = (infoObj = {}, gender) => {
  const defaultThumbs = {
    Male: '/assets/bw-m.gif',
    Female: '/assets/bw-f.gif',
  };
  const imgPath = infoObj['120X120'] || infoObj.small;
  return imgPath ? `${infoObj.domain_name}${imgPath}` : defaultThumbs[gender];
};

const currentPath = (info = 'default') => {
  const pathInfoMap = {
    pathname: window.location.pathname,
    search: window.location.search,
    default: `${window.location.pathname}${window.location.search}`,
  };
  return pathInfoMap[info] || null;
};

const prepareNextdata = (evt_ref, getState) => {
  const { nav } = getState().nav[1];
  const defaultData = {
    nextText: 'View More Matches',
    nextUrl: '/profile/discovery',
  };

  if (nav[1].count > 0) {
    defaultData.nextText = `View Today's Matches`;
    defaultData.nextUrl = '/profile/daily-recommendations';
  } else if (nav[2].count > 0) {
    defaultData.nextText = `View My Matches`;
    defaultData.nextUrl = '/search/partner';
  }

  switch (decode64(evt_ref)) {
    case 'matches-new_matches_unviewed':
      return defaultData;
    case 'matches-preferred_unviewed':
    case 'discovery_recent_visitors_unviewed':
    case 'matches-near_me_unviewed':
    case 'matches-broader_unviewed':
    case 'matches-reverse':
    case 'matches-most_preferred_unviewed':
      return {
        nextText: 'View More Matches',
        nextUrl: '/profile/discovery',
      };
    case 'RecentVisitors_mail':
      return {
        nextText: 'View All Recent Visitors',
        nextUrl: '/search/discovery/recent-visitors',
      };
    case 'new-matchmail-b':
      return {
        nextText: 'View New Matches',
        nextUrl: '/search/new-matches',
      };
    case 'mailer-premium_matchmail':
    case 'PremiumMatches_mail':
      return {
        nextText: 'View All Premium Matches',
        nextUrl: '/search/discovery/premium',
      };
    case 'featured_invitation':
    case 'PendingInterest_mail':
    case 'mailer-interest_free_gmail_name':
    case 'mailer-interest_premium_gmail_name':
    case 'mailer-interest_free':
    case 'mailer-interest_digestv4_gmail':
    case 'mailer-interest_premium':
    case 'widget-myshaadi_premium_interest_wall':
      return {
        nextText: 'View All Invitations',
        nextUrl: '/inbox/pending/interests',
      };
    case 'inbox-interests':
    case 'mailer-other':
      return {
        nextText: 'View All Accepted',
        nextUrl: '/inbox/accepted/interests',
      };
    case 'mailer-matchmail':
      return {
        nextText: 'View My Matches',
        nextUrl: '/search/partner',
      };
    default:
      return defaultData;
  }
};
export { decode64, urlFor, backFor, extractIcon, currentPath, prepareNextdata };
