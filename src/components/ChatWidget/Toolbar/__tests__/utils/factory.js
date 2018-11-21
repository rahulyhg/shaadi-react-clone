const props = {
  chatSettings: {
    status: 'online',
    sounds: 'on',
    isOpen: false,
    activeTab: 'online',
    profileCardDisplay: false,
  },
  changeSettings() {},
  changeStatus() {},
  toggleChatInterface() {},
};

const factory = {
  props,
};
it('should export chat toolbar Props', () => {
  expect(factory.props).not.toBeFalsy();
});
export default factory;
