const defaultHeaderInfo = {
  title: '',
  header: '',
  viewed_link: '',
  default_link: '',
  messageCode: {},
};

const defaultExceptionInfo = { messageCode: '...', messageText: '...' };

const getGroupItemsInfo = searchType => {
  switch (searchType) {
    case 'discovery_recent_visitors':
    case 'discovery_recent_visitors_viewed': {
      return {
        ...defaultHeaderInfo,
        title: 'Recent Visitors',
        header: 'Members who recently visited your Profile',
        default_link: '/search/discovery/recent-visitors',
        viewed_link: '/search/discovery/recent-visitors-viewed',
      };
    }
    case 'discovery_premium':
    case 'discovery_premium_viewed': {
      return {
        ...defaultHeaderInfo,
        title: 'Premium Matches',
        header: 'Recently upgraded Premium members',
        viewed_link: '/search/discovery/premium-viewed',
        default_link: '/search/discovery/premium',
      };
    }
    case 'broader':
    case 'broader_viewed': {
      return {
        ...defaultHeaderInfo,
        title: 'Members you may like',
        header: 'Members who match many of your Preferences',
        viewed_link: '/search/broader/viewed',
        default_link: '/search/broader',
      };
    }
    case 'reverse':
    case 'reverse_viewed': {
      return {
        ...defaultHeaderInfo,
        title: 'Members looking for me',
        header: 'Members looking for matches like you',
        default_link: '/search/personal',
        viewed_link: '/search/personal',
      };
    }
    case 'ignored': {
      return {
        ...defaultHeaderInfo,
        title: 'Ignored Members',
        header: 'Profiles you have Ignored',
        default_link: '/profile/ignored-members',
        viewed_link: '/profile/ignored-members',
      };
    }
    case 'blocked': {
      return {
        ...defaultHeaderInfo,
        title: 'Blocked Members',
        header: 'Profiles you have Blocked',
        default_link: '/profile/blocked-members',
        viewed_link: '/profile/blocked-members',
      };
    }
    case 'shortlisted': {
      return {
        ...defaultHeaderInfo,
        title: 'Shortlisted Members',
        header: 'Profiles you have Shortlisted',
        default_link: '/profile/shortlist',
        viewed_link: '/profile/shortlist',
      };
    }
    case 'full-profile': {
      return {
        ...defaultHeaderInfo,
        title: 'Recently Viewed Members',
        header: 'Profiles you have recently Viewed',
        default_link: '/profile/viewed-profiles',
        viewed_link: '/profile/viewed-profiles',
      };
    }
    default: {
      return defaultHeaderInfo;
    }
  }
};
const getExceptionInfo = (exceptionType, searchType) => {
  const exceptionId = `${exceptionType}_${searchType}`;
  switch (exceptionId) {
    case 'visitor_privacy_discovery_recent_visitors_viewed':
    case 'visitor_privacy_discovery_recent_visitors': {
      return {
        messageCode: exceptionType,
        messageText: 'You have deactivated this feature',
        guideUrl: '/my-shaadi/my-account/privacy-settings/open/visitors',
      };
    }
    default:
      return defaultExceptionInfo;
  }
};

export { getGroupItemsInfo, getExceptionInfo };
