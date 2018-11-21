const MembershipColors = [
  { membershipTags: 'vip', membershipLevel: 'PremiumPlus', color: '#a20005' },
  { membershipTags: 'diamond_plus', membershipLevel: 'PremiumPlus', color: '#a20005' },
  { membershipTags: 'platinum_plus', membershipLevel: 'PremiumPlus', color: '#a20005' },
  { membershipTags: 'select', membershipLevel: 'Select', color: '#866ab9' },
  { membershipTags: 'free', membershipLevel: 'Free', color: '#866ab9' },
];

const factory = { MembershipColors };
it('should export props', () => {
  expect(factory.MembershipColors).not.toBeFalsy();
});

export default factory;
