const connectionStatusArr = [
  'accepted',
  'blocked',
  'cancelled',
  'contacted',
  'declined',
  'default',
  'ignored',
  'misuseReported',
  // 'shortlisted',
  'theyAccepted',
  'theyContacted',
  'theyDeclined',
];

const props = {
  gender: 'Male',
  uid: 'sample-uid',
  membershipLevel: 'free',
  isPaidUser: true,
  onAction: () => {},
};

export { connectionStatusArr };

export default props;
