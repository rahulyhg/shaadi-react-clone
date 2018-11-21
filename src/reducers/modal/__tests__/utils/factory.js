const theDefaultState = {
  name: '',
  source: null,
  type: null,
  himHer: '',
  nextProfileLink: '',
  connectionType: '',
  discount: 10,
  offerDetails: '',
};

const payloadProps = {
  connectionStatus: 'contacted',
  connectionType: 'connect',
  modal: 'firstStep',
  driveLayer: '',
  helpdeskid: '',
  himHer: 'Him',
  name: 'Test Test',
  nextProfileLink: null,
  nextUrl: null,
  source: 'preferredSearch',
  type: 'connect',
  uid: 'uid-test',
};

const factory = {
  theDefaultState,
  payloadProps,
};

it('should export theDefaultState,payloadProps', () => {
  expect(Object.keys(factory).length).toEqual(2);
});

export default factory;
