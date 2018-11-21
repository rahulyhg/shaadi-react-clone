const widgetTypeInfoMap = {
  discovery_recent_visitors: {
    eoiType: 'premiumCarousel',
    seeAllUrl: '/search/discovery/recent-visitors?vtype=list&spn=list',
    showUpgradeCard: false,
    additionalStyling: 'RVStyle',
  },
  invites: {
    eoiType: 'dashboard',
    seeAllUrl: '',
    showUpgradeCard: true,
    additionalStyling: 'InviteStyle',
  },
  default: {
    eoiType: 'dashboard',
    seeAllUrl: '',
    showUpgradeCard: false,
    additionalStyling: '',
  },
};
const renderTypeInfoMap = {
  default: {
    classSuffix: 'horizontal',
    dimension: 'small',
    infoPattern: 'p1',
    crownType: 'medium',
  },
  carousal: {
    classSuffix: 'verticle',
    dimension: 'medium',
    infoPattern: 'p2',
    crownType: 'small',
  },
};
const formatInfo = (infoMap = [], pattern) => {
  let patternConfig;
  switch (pattern) {
    case 'p1':
      patternConfig = {
        0: '',
        1: ', ',
        2: ', ',
        3: '\n',
      };
      break;
    case 'p2':
      patternConfig = {
        0: '',
        1: ', ',
        2: '\n',
      };
      break;
    default:
      patternConfig = {
        all: ',',
      };
  }

  return infoMap.reduce((accum, data, index) => {
    if (patternConfig.all) {
      return `${accum}${index !== 0 ? patternConfig.all : ''}${data.value}`;
    }
    if (Object.keys(patternConfig).includes(index.toString())) {
      return `${accum}${patternConfig[index]}${data.value}`;
    }
    return accum;
  }, '');
};
const redirectTo = (uid, type = 'profile', evt_ref = '') => {
  let url = `/profile?profileid=${uid}&evt_ref=${evt_ref}&datasrc=api`;
  switch (type) {
    case 'payment': {
      url = '/payment?source=listing_banner';
    }
    // no default
  }
  return url;
};

export { widgetTypeInfoMap, renderTypeInfoMap, formatInfo, redirectTo };
