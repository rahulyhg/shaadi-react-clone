const props = {
  status: 'online',
  activeTab: 'chats',
  counts: { alerts: 58, chats: 8, online: 26 },
  onTabClick() {},
};

const factory = {
  props,
};
it('should export chat tabs Props', () => {
  expect(factory.props).not.toBeFalsy();
});
export default factory;
