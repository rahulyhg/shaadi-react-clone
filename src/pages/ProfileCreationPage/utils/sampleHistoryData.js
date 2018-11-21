const defaultData = {
  hash: '',
  pathname: '',
  search: '',
};

export default data => {
  const dataPopulate = { ...defaultData, ...data };
  return {
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
    location: {
      hash: dataPopulate.hash,
      pathname: dataPopulate.pathname,
      search: dataPopulate.search,
    },
  };
};
