const defaultParams = {
  action: 'push',
  block() {},
  createHref() {},
  go() {},
  goBack() {},
  goForward() {},
  length: 0,
  listen() {},
  push() {},
  replace() {},
  hash: '',
  pathname: '',
  search: '',
};

const getMockedHistory = (args = defaultParams) => {
  const params = { ...defaultParams, ...args };
  return {
    action: params.action,
    block() {},
    createHref() {},
    go() {},
    goBack() {},
    goForward() {},
    length: params.length,
    listen() {},
    push() {},
    replace() {},
    location: {
      hash: params.hash,
      pathname: params.pathname,
      search: params.search,
    },
  };
};

it('should export mocked event', () => {
  expect(getMockedHistory()).not.toBeFalsy();
});

export default getMockedHistory;
