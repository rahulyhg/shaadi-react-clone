const infoItemProptypes = {
  id: '',
  title: '',
  icon: '',
};

const aboutProptypes = {
  ...infoItemProptypes,
  desc: '',
};

const interestProptypes = {
  ...infoItemProptypes,
  items: [],
};

const listItemProptypes = {
  ...infoItemProptypes,
  items: [],
};

const iconItemProptypes = {
  ...infoItemProptypes,
  items: [],
};

const preferenceProptypes = {
  ...infoItemProptypes,
  items: [],
};

const profileAdditionalInfoProps = {
  profile: {
    uid: '',
    userHandle: '',
    heShe: 'He',
    hisHer: 'His',
    himHer: 'Him',
    flags: {
      isHoroscopeApplicable: true,
      isHoroscopeAvailable: 'none',
      membershipTags: 'Premium',
    },
    detailed: {
      about: aboutProptypes,
      family: aboutProptypes,
      lifestyle: iconItemProptypes,
      background: listItemProptypes,
      horoscope: listItemProptypes,
      education: listItemProptypes,
      interests: interestProptypes,
      preferences: preferenceProptypes,
      contact: { title: '', titleRevamp: '', icon: '' },
    },
    contactSummary: {
      contact: {
        mobile_verified: '',
        telephone_verified: '',
        contact_number: '',
        titleRevamp: '',
        title: '',
      },
    },
  },
  wwwBaseUrl: '',
  settings: {
    isAstroGamified: true,
    isFamilyGamified: true,
    canViewHoroscope: true,
    canViewCollegeAndEmployer: true,
  },
  self: {
    photo: '',
    name: '',
    flags: {
      isFree: true,
      isPremium: true,
    },
  },
  gamification: {
    flash: true,
    loading: false,
  },
  isAstroStatusError: false,
  profilePageBucket: '',
  profileContactCard: '',
};

const factory = {
  profileAdditionalInfoProps,
};
it('should export contact card', () => {
  expect(factory.profileAdditionalInfoProps).not.toBeFalsy();
});
export default factory;
