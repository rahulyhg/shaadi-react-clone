const textLinkProps = {
  name: 'lock',
  profileContactCard: 'B',
  options: {
    isFreeMember: true,
  },
};

const factory = {
  textLinkProps,
};
it('should export contact card', () => {
  expect(factory.textLinkProps).not.toBeFalsy();
});
export default factory;
