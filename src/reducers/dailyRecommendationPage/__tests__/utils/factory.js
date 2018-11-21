const theDefaultState = {
  defaultProfileId: '',
  target_time: Math.round(new Date() / 1000),
  items: [],
  nextDefaultProfileId: '',
  prevDefaultProfileId: '',
  disablePros: [],
  landingProfileId: '',
};

const profileSuccess = {
  profiles: [
    {
      uid: 'xSH12345678',
      name: 'Ashish K',
    },
    {
      uid: '2SH92206034',
      name: 'Ashish K',
    },
  ],
  defaultProfileId: '',
  target_time: 0,
  nextDefaultProfileId: '',
};

const profileSuccessState = {
  items: [
    {
      uid: 'xSH12345678',
      name: 'Ashish K',
    },
    {
      uid: '2SH92206034',
      name: 'Ashish K',
    },
  ],
  defaultProfileId: '',
  target_time: 0,
  nextDefaultProfileId: '',
  prevDefaultProfileId: '',
  disablePros: [],
  landingProfileId: '',
};

const zeroProfileSuccess = {
  profiles: [],
  defaultProfileId: '',
  target_time: 0,
  nextDefaultProfileId: '',
};

const zeroProfileSuccessState = {
  items: [],
  defaultProfileId: '',
  target_time: 0,
  nextDefaultProfileId: '',
  prevDefaultProfileId: '',
  disablePros: [],
  landingProfileId: '',
};
const profileFailState = {
  items: [],
  defaultProfileId: '',
  target_time: 0,
  nextDefaultProfileId: '',
  prevDefaultProfileId: '',
  disablePros: [],
  landingProfileId: '',
};

const profilePrepareNext = {
  profileid: 'xSH12345678',
  defaultProfileId: '',
  nextDefaultProfileId: '',
};

const profilePrepareNextSuccess = {
  defaultProfileId: 'xSH12345678',
  items: [
    {
      uid: 'xSH12345678',
      name: 'Ashish K',
    },
    {
      uid: '2SH92206034',
      name: 'Ashish K',
    },
  ],
  nextDefaultProfileId: '',
  target_time: 0,
  prevDefaultProfileId: '',
  disablePros: [],
  landingProfileId: '',
};

const defaultPaginationState = {
  backText: 'Back',
  backUrl: null,
  isVisible: false,
  loading: true,
  nextText: 'Next',
  nextUid: null,
  nextUrl: null,
  prevText: 'Prev',
  prevUrl: null,
  profileUid: null,
};
const paginationState = {
  uid: '2SH92206034',
  backText: 'Back',
  backUrl: 'test',
  isVisible: true,
  loading: false,
  nextText: 'Next',
  nextUid: null,
  nextUrl: null,
  prevText: 'Prev',
  prevUrl: null,
  profileUid: null,
};

const factory = {
  theDefaultState,
  profileSuccess,
  profileSuccessState,
  profileFailState,
  profilePrepareNext,
  profilePrepareNextSuccess,
  defaultPaginationState,
  paginationState,
  zeroProfileSuccess,
  zeroProfileSuccessState,
};

it('should export theDefaultState, payloadProps', () => {
  expect(Object.keys(factory).length).toEqual(10);
});

export default factory;
