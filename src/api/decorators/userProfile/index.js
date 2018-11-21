const availabilityMaster = {
  None: 'none',
  'Show All': 'available',
  'When I Contact': 'locked',
};

const inchesToFeet = inches => Math.floor(inches / 12);

const profilePhotoBase = {
  order: 0,
  small: '',
  medium: '',
  large: '',
  isVisible: false,
};

const profilePhoto = (base = profilePhotoBase, payload) => ({
  ...base,
  src: `${payload.domain_name}${payload.medium}`,
  isVisible: payload.status === 'Y',
});

const preferredProfileBase = {
  uid: '',
  name: '',
  memberlogin: '',
  gender: '',
  pronoun: '',
  category: '',
  posted_by: '',
  isIgnored: false,
  isAwaitingResponse: false,
  isShortlisted: false,
  isTwoWayMatch: false,
  horoscopeStatus: 'none',
  contactStatus: 'none',
  details: [],
  chatStatus: 'Online now',
};

const userProfile = (base = preferredProfileBase, payload) => {
  const { photo_details, other, connect, origin, account, basic, trait, preferences, appearance, doctrine, location, profession } = payload;

  const profile = {
    ...base,
    uid: account.memberlogin,
    name: basic.display_name,
    memberlogin: account.memberlogin,
    profileUrl: `/profile?profileid=${basic.username}`,
    bio: trait.about_me,
    gender: basic.gender,
    pronoun: basic.gender === 'Male' ? 'him' : 'her',
    createdBy: account.posted_by,
    status: photo_details.status,
    photos: (photo_details.photos || []).map(photo => profilePhoto(undefined, photo)),
    isIgnored: other.ignored === 'Y',
    isAwaitingResponse: connect.status === 'Contacted',
    isShortlisted: other.shortlist_count > 0,
    isPreferredMatch: other.match_tag === 'preferred',
    detailList: [
      {
        label: 'Age / Height',
        value: `${basic.age}, ${inchesToFeet(appearance.height)}`,
      },
      {
        label: 'Maritial Status',
        value: basic.marital_status,
      },
      {
        label: 'Religion',
        value: doctrine.religion,
      },
      {
        label: 'Mother Tongue',
        value: doctrine.mother_tongue,
      },
      {
        label: 'Community',
        value: doctrine.caste,
      },
      {
        label: 'Location',
        value: `${location.state}, ${location.country}`,
      },
      {
        label: 'Grew up in',
        value: origin.grewup_in.join(', '),
      },
      {
        label: 'Profession',
        value: profession.occupation,
      },
    ],
  };

  if (preferences) {
    return {
      ...profile,
      horoscopeStatus: availabilityMaster[preferences.privacy.horoscope_status],
      contactStatus: availabilityMaster[preferences.privacy.phone],
    };
  }
  return profile;
};

export default userProfile;
