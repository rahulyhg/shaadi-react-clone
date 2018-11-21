const intentsType = ['shortlisted', 'blocked', 'ignored', 'full-profile'];
const discoverType = ['discovery_recent_visitors', 'discovery_premium', 'broader', 'reverse'];
const allSearchType = [...discoverType, ...intentsType];
const viewedResult = {
  items: [
    { uid: '3SH31026042', justNow: false, photoLoading: false, eoiLoadingStyle: 'none' },
    { uid: 'iSH17482794', justNow: false, photoLoading: false, eoiLoadingStyle: 'none' },
    { uid: 'iSH17482778', justNow: false, photoLoading: false, eoiLoadingStyle: 'none' },
  ],
  response_type: 'viewed',
  remark: {},
};

const unViewedResult = {
  items: [
    { uid: '3SH31026042', justNow: false, photoLoading: false, eoiLoadingStyle: 'none' },
    { uid: 'iSH17482794', justNow: false, photoLoading: false, eoiLoadingStyle: 'none' },
  ],
  response_type: 'unviewed',
  remark: {},
};
const viewedPrivacyResult = {
  items: [],
  response_type: 'viewed',
  remark: { messageCode: 'visitor_privacy' },
};

const otherRemarksResult = {
  items: [],
  response_type: 'viewed',
  remark: { messageCode: 'visitor_privacy_test' },
};

const discoverSearchResult = [viewedResult, unViewedResult, viewedPrivacyResult, otherRemarksResult];
const inentsSearchResult = [unViewedResult];
const searchResult = { discoverType: discoverSearchResult, intentsType: inentsSearchResult };

const profileA = {
  uid: '3SH31026042',
  name: 'male',
  himHer: 'Him',
  hisHer: 'His',
  heShe: 'He',
  flags: {
    isDeleted: false,
    isMaskedProfile: false,
    canUnblock: true,
    canUnignore: false,
    canRemind: true,
    canCancelInvite: false,
    connectionError: false,
    connectionStatus: 'default',
    isSameGender: false,
    membershipLevel: 'Free',
    albumStatus: 'default',
    isTwoWayMatch: false,
    isWatermarked: false,
    isBoldListing: true,
    membershipTags: '',
    isHidden: false,
  },
  summary: {
    gridAlbum: [],
    createdBy: 'self',
    shortBio: 'test',
  },
  base: {
    miniList: [],
    miniNriList: [],
  },
  presence: {
    onlineStatus: 'invisible',
    onlineStatusDetails: '...',
    onlineAt: 0,
    device: 'none',
    platform: 'none',
    lastOnline: '...',
    lastOnlineDetails: '...',
    ready: false,
    chatIcon: 'none',
  },
  shortlists: {
    ready: false,
    count: 0,
    selected: [],
  },
  requests: {
    count: 0,
  },
};
const profileB = {
  ...profileA,
  uid: 'iSH17482794',
};
const profileC = {
  ...profileA,
  uid: 'iSH17482778',
};

const profiles = {
  '3SH31026042': profileA,
  iSH17482794: profileB,
  iSH17482778: profileC,
};
const props = {
  loading: false,
  wwwBaseUrl: 'https://www.shaadi.com',
  shortlistItems: [{ key: '123', id: '123', label: 'My 1st List' }],
  settings: {
    isHidden: false,
    isBothPartyPayUser: false,
    isPaidUser: false,
    canSendPasswordOnConnect: false,
    canConnectWithMessage: false,
    hasUploadedPhoto: true,
    showUpgradeBanner: false,
  },
  searchResult: {
    results_id: 'search:8761797d1f0f3b48bf6239b3a3afaebe',
    permalink: '/profile/discover',
    evt_ref: 'aHR0cHM6Ly9teS5zaGFhZGkuY29tL3NlYXJjaC9kaXNjb3ZlcnkvcmVjZW50LXZpc2l0b3JzfHwyMA==',
    pg_ubt: 'aHR0cHM6Ly9teS5zaGFhZGkuY29tL3NlYXJjaC9kaXNjb3ZlcnkvcmVjZW50LXZpc2l0b3JzfHwyMA==',
    np: 'discovery',
    sourceList: '',
    source: '',
    tooltip: {
      body: [],
      position: '',
    },
  },
  profiles,
};
const factory = { allSearchType, discoverType, intentsType, searchResult, profiles, props };
it('should export allSearchType, profiles , searchResults ,intentsType ,discoverType and props', () => {
  expect(factory.allSearchType).not.toBeFalsy();
  expect(factory.intentsType).not.toBeFalsy();
  expect(factory.discoverType).not.toBeFalsy();
  expect(factory.searchResult).not.toBeFalsy();
  expect(factory.profiles).not.toBeFalsy();
  expect(factory.props).not.toBeFalsy();
});

export default factory;
