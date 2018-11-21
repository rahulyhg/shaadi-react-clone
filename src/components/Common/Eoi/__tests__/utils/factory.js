const male = {
  uid: 'uid-male',
  name: 'male',
  himHer: 'Him',
  hisHer: 'His',
  heShe: 'He',
  flags: {
    isDeleted: false,
    canUnblock: true,
    canUnignore: false,
    canRemind: true,
    canCancelInvite: false,
    connectionError: false,
    connectionStatus: 'default',
    isSameGender: false,
    membershipTags: 'Premium',
    isHidden: false,
    canCommunicate: false,
    connectionAction: 'member_contacted',
  },
  shortlists: {
    ready: false,
    count: 0,
    selected: [],
  },
  presence: {
    onlineStatus: 'Online',
    lastOnlineDetails: 'Online now',
    chatIcon: 'web_online',
  },
  requests: {
    count: 0,
  },
  userHandle: 'SH65090610',
};
const female = {
  ...male,
  uid: 'uid-female',
  name: 'female',
  himHer: 'Her',
  hisHer: 'Her',
  heShe: 'She',
  userHandle: 'SH65090610',
};

const profiles = [male, female];

const props = {
  loadingStyle: 'none',
  shortlistItems: [{ key: '123', id: '123', label: 'My 1st List' }],
  settings: {
    isHidden: false,
    isBothPartyPayUser: false,
    isPaidUser: false,
    canSendPasswordOnConnect: false,
    canConnectWithMessage: false,
  },
  tooltip: {
    position: 'none',
    body: [],
  },
  profilePageBucket: 'A',
  onChatNow() {},
  onViewPhoneNoClick() {},
};

const dr = {
  ...props,
  contact: {
    profileid: 'gSH65090610',
  },
};

const factory = { props, profiles, dr };

it('should export profiles and props', () => {
  expect(factory.profiles).not.toBeFalsy();
  expect(factory.props).not.toBeFalsy();
});

export default factory;
