const props = {
  wwwBaseUrl: 'https://www.shaadi.com',
  items: [
    {
      id: 'count',
      uid: null,
      name: null,
      message: 'You have new notifications',
      autoHide: true,
    },
    {
      id: 'alerts',
      uid: '4SH24177734',
      name: 'Ravindra T',
      message: 'You have new notifications',
      autoHide: true,
    },
  ],
  onHideToast() {},
  onClickNotificationToast() {},
};

const factory = {
  props,
};
it('should export notification Props', () => {
  expect(factory.props).not.toBeFalsy();
});
export default factory;
