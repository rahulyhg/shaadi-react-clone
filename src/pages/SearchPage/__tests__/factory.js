const profiles = {
  pSH33665720: {
    fullName: 'Deepika V',
    flags: {
      isPremium: false,
      membershipTags: 'free',
      membershipLevel: 'none',
      albumStatus: 'default',
      isWatermarked: false,
      contactStatus: 'availableOnVerification',
      horoscopeStatus: 'none',
      isHoroscopeApplicable: true,
      isIndianDiaspora: true,
      isTwoWayMatch: false,
      isMaskedProfile: false,
      isBoldListing: false,
      isDeleted: false,
      canUnblock: false,
      canUnignore: false,
      canRemind: false,
      canCancelInvite: false,
      connectionError: false,
      isSameGender: false,
      isHidden: false,
    },
    uid: 'pSH33665720',
    name: 'Deepika V',
    gender: 'Female',
    heShe: 'She',
    himHer: 'Her',
    hisHer: 'Her',
    photoBlur: 'https://img1.shaadi.com//2017/05/21/tSH31981089-7f63d0.jpg',
    photoMedium: '',
    presence: {
      device: 'mobile_native-android',
      lastOnline: 'Online on Android App',
      lastOnlineDetails: 'Online now',
      onlineAt: 1518007263000,
      onlineStatus: 'Online',
      onlineStatusDetails: 'Online',
      platform: 'mobile',
      chatIcon: 'web_idle',
    },
    summary: {
      infoMap: [],
      infoMapNonIndian: [],
      infoMapIndian: [],
      infoMapNri: [],
      listAlbum: [],
      gridAlbum: [],
      infoMapInboxIndian: [
        {
          key: 'info-0',
          label: 'age_height_mt_caste',
          value: '25 yrs , 5\' 2" , Hindi , Lohar',
        },
      ],
      createdBy: 'self',
      shortBio: 'test',
    },
    verification: {
      count: 3,
      shield_state: 'GREEN',
      derived_text: 'Aadhaar, Facebook and Mobile number Verified',
      verified_proofs: ['Aadhaar Verified', 'Facebook Verified', 'Mobile number Verified'],
    },
    shortlists: {
      count: 0,
      ready: false,
      selected: [],
    },
    requests: {
      count: 0,
      items: [],
    },
  },
};
const items = [
  {
    uid: 'pSH33665720',
    justNow: false,
    eoiLoadingStyle: 'none',
    photoLoading: false,
    actionType: '',
    displayStatusMessage: '',
  },
];

const settings = {
  defaultSearchFormat: 'list',
  isPaidUser: false,
  showUpgradeBanner: true,
  canAccessChat: true,
  canInitiateChat: false,
  hasUploadedPhoto: false,
  canConnectWithMessage: false,
  showUpgradeLinks: true,
  canSendPasswordOnConnect: false,
  contactsTotal: null,
  contactsRemaining: null,
  isUnderScreening: false,
  isAstroGamified: true,
  gender: 'Female',
  canViewCollegeAndEmployer: false,
  canViewHoroscope: true,
  horoscopeStyle: 'l/ENG/hs/1',
  isFamilyGamified: true,
  isHidden: false,
  isBothPartyPayUser: true,
  isMobileVerified: false,
  mobileNumber: '9876568790',
  wasPaidUser: false,
  expiryDate: '',
  isNri: false,
  isIndianDiaspora: true,
  experiments: {
    profile_contact_card: {
      bucket: 'B',
    },
  },
  membershipTags: 'free',
  offerCode: 'octbd60h2',
  offer_details: [
    {
      type: 'perc',
      value: 60,
    },
  ],
};
const meta = {
  loading: false,
  wwwBaseUrl: 'https://www.shaadi.com',
  isLoggedOut: false,
  isMoreMatchesSelected: false,
  activePage: 1,
  pageCount: 1,
  location: {
    pathname: '/search/ematchmaker',
    search: '?pg_searchresults_id=search%3A4eeaf0102618c48c0d1662ecec07c0b3&vtype=list&spn=list',
    hash: '',
    key: 'lij5gi',
  },
  history: { push: () => {} },
  facets: [],
  settings,
  toast: { message: '' },
  searchType: 'recently_joined',
};
const pageProps = {
  ...meta,
  profiles,

  pagination: {
    isVisible: true,
    page: '1',
    activePage: 1,
    pageCount: 30,
    total: 600,
  },
  shortlistItems: [],
  results: {
    results_id: 'search:fhhty899',
    items,
    evt_ref: '',
    permalink: '',
    query: {},
  },
};

it('should export pages props', () => {
  expect(typeof pageProps).toBe('object');
});
export default pageProps;
