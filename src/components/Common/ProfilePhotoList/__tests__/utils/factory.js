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
const factory = { premiumBadgeAProps, premiumBadgeBProps, premiumBadgeCProps };
it('should export premiumBadgeAProps, premiumBadgeBProps, premiumBadgeCProps', () => {
  expect(factory.premiumBadgeAProps).not.toBeFalsy();
  expect(factory.premiumBadgeBProps).not.toBeFalsy();
  expect(factory.premiumBadgeCProps).not.toBeFalsy();
});
export default factory;
