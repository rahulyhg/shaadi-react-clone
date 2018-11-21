const noResults = {
  SHID1: {
    count: 0,
    items: [],
    loading: false,
    results: {},
    tooltip: {},
  },
};

const withResults = {
  SHID1: {
    count: 5,
    items: [
      {
        uid: 'SHID2',
        justNow: false,
        eoiLoadingStyle: 'none',
        photoLoading: false,
      },
      {
        uid: 'SHID3',
        justNow: false,
        eoiLoadingStyle: 'none',
        photoLoading: false,
      },
      {
        uid: 'SHID4',
        justNow: false,
        eoiLoadingStyle: 'none',
        photoLoading: false,
      },
      {
        uid: 'SHID5',
        justNow: false,
        eoiLoadingStyle: 'none',
        photoLoading: false,
      },
      {
        uid: 'SHID6',
        justNow: false,
        eoiLoadingStyle: 'none',
        photoLoading: false,
      },
    ],
    loading: false,
    results: {
      results_id: 'results_id',
    },
    tooltip: {
      title: 'Test Toolti[',
      body: [
        {
          key: 'key1',
          items: [
            {
              key: 'key1',
              type: 'link',
              text: 'Demo Text',
              url: 'www.shaadi.com',
            },
          ],
        },
      ],
      position: 'top',
    },
  },
};

const profileInfo = {
  base: {},
  flags: {
    albumStatus: 'default',
    isWatermarked: false,
    membershipLevel: 'Free',
    membershipTags: 'Free',
    connectionStatus: 'contacted',
    contactStatus: 'none',
    horoscopeStatus: 'none',
    isTwoWayMatch: false,
    isBoldListing: false,
    isHoroscopeApplicable: false,
    isIndianDiaspora: true,
    isHidden: false,
    isDeleted: false,
    canUnblock: false,
    canUnignore: false,
    canRemind: false,
    canCancelInvite: false,
    connectionError: false,
  },
  requests: {
    count: 0,
    items: [],
  },
  shortlists: {
    ready: false,
    selected: [],
    count: 0,
  },
  summary: {
    infoMap: [
      {
        key: 'key1',
        label: 'Label 1',
        value: 'Value 1',
      },
    ],
    infoMapInboxIndian: [
      {
        key: 'key1',
        label: 'Label 1',
        value: 'Value 1',
      },
    ],
    listAlbum: ['list/image/path/1', 'list/image/path/2'],
    gridAlbum: ['grid/image/path/1', 'grid/image/path/2'],
  },
  presence: {
    onlineStatus: 'Online',
    lastOnlineDetails: '2 days ago',
  },
  uid: 'SHID2',
  name: 'Profile Name',
  heShe: 'He',
  himHer: 'Him',
  hisHer: 'His',
  photoMedium: 'photo/path',
};

const profiles = {
  SHID2: {
    ...profileInfo,
    uid: 'SHID2',
  },
  SHID3: {
    ...profileInfo,
    uid: 'SHID3',
  },
  SHID4: {
    ...profileInfo,
    uid: 'SHID4',
  },
  SHID5: {
    ...profileInfo,
    uid: 'SHID5',
  },
  SHID6: {
    ...profileInfo,
    uid: 'SHID6',
  },
};

const props = {
  profileName: 'Jaya S',
  uid: 'SHID1',
  onAction() {},
  settings: {
    canSendPasswordOnConnect: false,
    canConnectWithMessage: false,
    hasUploadedPhoto: true,
    showUpgradeBanner: false,
    isPaidUser: false,
    isHidden: false,
  },
  wwwBaseUrl: 'www.shaadi.com',
  order: 1,
  page: 2,
  pg_ubt: 'pg_ubt',
};

const factory = { noResults, withResults, props, profiles };

it('should export similarProfiles', () => {
  expect(factory).not.toBeFalsy();
});

export default factory;
