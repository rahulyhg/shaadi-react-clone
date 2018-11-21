const navList = ['request_pending', 'request_accepted', 'request_awaiting'];
const listParams = {
  request_pending: 'Pending Requests',
  request_accepted: 'Accepted Requests',
  request_awaiting: 'Sent Requests',
};
const counts = {
  request_pending: 3,
  request_aceepted: 3,
  request_awaiting: 3,
};
const activeNav = 'request_pending';
const onNavClick = () => {};
const factory = { activeNav, listParams, counts, navList, onNavClick };
it('should export SubNav componenets props', () => {
  expect(factory).not.toBeFalsy();
});

export default factory;
