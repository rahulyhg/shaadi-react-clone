const premiumBadgeAProps = {
  membershipTags: 'gold',
  membershipLevel: 'Premium',
  isVisible: false,
  bucket: 'A',
};
const premiumBadgeBProps = {
  membershipTags: 'gold',
  membershipLevel: 'Premium',
  isVisible: false,
  bucket: 'B',
};
const premiumBadgeCProps = {
  membershipTags: 'gold',
  membershipLevel: 'Premium',
  isVisible: false,
  bucket: 'C',
};
const crownBadgeProps = {
  membershipTags: 'free',
  membershipLevel: 'PremiumPlus',
  isVisible: true,
};

const factory = { premiumBadgeAProps, premiumBadgeBProps, premiumBadgeCProps, crownBadgeProps };
it('should export premiumBadgeAProps, premiumBadgeBProps, premiumBadgeCProps, crownBadgeProps', () => {
  expect(factory.premiumBadgeAProps).not.toBeFalsy();
  expect(factory.premiumBadgeBProps).not.toBeFalsy();
  expect(factory.premiumBadgeCProps).not.toBeFalsy();
  expect(factory.crownBadgeProps).not.toBeFalsy();
});
export default factory;
