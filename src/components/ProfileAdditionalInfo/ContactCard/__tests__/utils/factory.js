const contactCardProps = {
  contactPrefix: '+91',
  contactNumber: '9737666147',
  contactEmail: 'XXXXXXXXX@gmail.com',
  isPremiumMember: false,
  heShe: '',
  isFreeMember: true,
  connectionStatus: '',
  himHer: '',
  canCommunicate: false,
};

const upgradeTextProps = {
  isPremiumMember: false,
  heShe: '',
  isFreeMember: true,
  connectionStatus: '',
  himHer: '',
  canCommunicate: false,
};

const factory = {
  contactCardProps,
  upgradeTextProps,
};
it('should export contact card', () => {
  expect(factory.contactCardProps).not.toBeFalsy();
  expect(factory.upgradeTextProps).not.toBeFalsy();
});
export default factory;
