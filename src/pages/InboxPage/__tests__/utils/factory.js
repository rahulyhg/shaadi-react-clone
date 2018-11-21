const profileID = 'pSH33665720';
const common = {
  topSpace: 0,
  windowWidth: window.innerWidth,
  isChatOpen: true,
  loading: false,
  wwwBaseUrl: '"https://www.shaadi.com"',
  profiles: {
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
  },
  settings: {
    canSendPasswordOnConnect: false,
    canConnectWithMessage: false,
    hasUploadedPhoto: false,
    showUpgradeBanner: false,
    isPaidUser: false,
    isHidden: false,
  },
  results: {
    results_id: 'inbox:55fba4862a7ddae6690d4b1c9c450244',
    evt: 'inbox-interests',
    evt_ref: 'aW5ib3gtaW50ZXJlc3Rz',
    permalink: '/inbox/pending/interests?page=1&pg_searchresults_id=inbox%3A55fba4862a7ddae6690d4b1c9c450244',
    items: [
      {
        uid: 'pSH33665720',
        justNow: false,
        photoLoading: false,
        eoiLoadingStyle: 'none',
        contact: {
          mask_contact_no: '9876XXXXXX',
          country_code: '+91',
        },
      },
    ],
    tooltip: {
      body: [],
      loading: false,
      position: 'none',
    },
    source: 'undefined',
  },
  pageTitle: 'Shaadi.com - Find Your Life Partner',
  location: {
    hash: 'hash',
    pathname: '/inbox/pending/interests',
    search: '',
  },
  isLoggedOut: false,
  facets: [
    {
      id: 'custom',
      isMulti: true,
      options: [],
      title: '',
    },
  ],
  isHeaderBarVisible: true,
};

const invitations = {
  ...common,
  profiles: {
    [profileID]: {
      ...common.profiles[profileID],
      flags: {
        ...common.profiles[profileID].flags,
        connectionStatus: 'theyContacted',
      },
    },
  },
  results: {
    ...common.results,
    items: [
      {
        ...common.results.items[0],
        requests: {
          connect_pending: {
            action: 'pending',
          },
        },
      },
    ],
  },
  requestType: {
    type: 'connect',
    action: 'pending',
  },
  featuredInvites: {
    permalink: '/inbox/pending/recent-interests',
    results_id: '',
    evt: '',
    evt_ref: '',
    items: [],
    source: 'unified',
    tooltip: {
      key: 'none',
      page: 'none',
      position: 'none',
      title: null,
      body: [],
      loading: false,
    },
  },
  type: 'connect',
  action: 'pending',
};

const accepted = {
  ...common,
  profiles: {
    [profileID]: {
      ...common.profiles[profileID],
      flags: {
        ...common.profiles[profileID].flags,
        connectionStatus: 'theyAccepted',
      },
    },
  },
  results: {
    ...common.results,
    items: [
      {
        ...common.results.items[0],
        requests: {
          connect_accepted: {
            action: 'accepted',
          },
        },
      },
    ],
  },
  featuredInvites: {
    permalink: '/inbox/pending/recent-interests',
    results_id: '',
    evt: '',
    evt_ref: '',
    items: [],
    source: 'unified',
    tooltip: {
      key: 'none',
      page: 'none',
      position: 'none',
      title: null,
      body: [],
      loading: false,
    },
  },
  requestType: {
    type: 'connect',
    action: 'accepted',
  },
  type: 'connect',
  action: 'accepted',
};

const sent = {
  ...common,
  profiles: {
    [profileID]: {
      ...common.profiles[profileID],
      flags: {
        ...common.profiles[profileID].flags,
        connectionStatus: 'contacted',
      },
    },
  },
  results: {
    ...common.results,
    items: [
      {
        ...common.results.items[0],
        requests: {
          connect_awaiting: {
            action: 'awaiting',
          },
        },
      },
    ],
  },
  featuredInvites: {
    permalink: '/inbox/pending/recent-interests',
    results_id: '',
    evt: '',
    evt_ref: '',
    items: [],
    source: 'unified',
    tooltip: {
      key: 'none',
      page: 'none',
      position: 'none',
      title: null,
      body: [],
      loading: false,
    },
  },
  requestType: {
    type: 'connect',
    action: 'awaiting',
  },
  type: 'connect',
  action: 'awaiting',
};

const deleted = {
  ...common,
  profiles: {
    [profileID]: {
      ...common.profiles[profileID],
      flags: {
        ...common.profiles[profileID].flags,
        connectionStatus: 'theyDeclined',
      },
    },
  },
  results: {
    ...common.results,
    items: [
      {
        ...common.results.items[0],
        requests: {
          connect_deleted: {
            action: 'deleted',
          },
        },
      },
    ],
  },
  featuredInvites: {
    permalink: '/inbox/pending/recent-interests',
    results_id: '',
    evt: '',
    evt_ref: '',
    items: [],
    source: 'unified',
    tooltip: {
      key: 'none',
      page: 'none',
      position: 'none',
      title: null,
      body: [],
      loading: false,
    },
  },
  requestType: {
    type: 'connect',
    action: 'deleted',
  },
  type: 'connect',
  action: 'deleted',
};

const pages = [
  {
    pageName: 'Invitations',
    toContain: 'Pending Invitations',
    data: invitations,
  },
  {
    pageName: 'Accepted',
    toContain: 'Accepted Invitations',
    data: accepted,
  },
  {
    pageName: 'Sent',
    toContain: 'Sent invitations',
    data: sent,
  },
  {
    pageName: 'Deleted',
    toContain: 'Deleted Invitations',
    data: deleted,
  },
];

const factory = { pages };

it('should export pages props', () => {
  expect(Object.keys(factory).length).toEqual(1);
});
export default factory;
