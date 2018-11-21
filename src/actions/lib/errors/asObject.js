const clean0 = txt => (`${txt}`.includes('SQL') ? 'This action is not allowed.' : `${txt}`);
const clean1 = (status, txt) => `Error: (${status}) ${clean0(txt)}`;

export default e => {
  if (e.response && e.response.data && (e.response.data.code || e.response.data.message)) {
    return {
      status: e.response.status,
      message: clean0(e.response.data.message || e.response.data.code),
      errorCode: clean0(e.response.data.errorCode || e.response.data.message),
      type: 'formatted',
    };
  }
  if (e.response && e.response.data) {
    return {
      status: e.response.status,
      message: clean1(e.response.status, e.response.data),
      type: 'server',
    };
  }
  if (e.request || (e.config && e.config.url)) {
    console.log('%c Network ERROR', 'color: green; font-weight: bold;', e.message ? e.message : e);
    return {
      status: 0,
      message: 'Failed to connect.',
      type: 'network',
    };
  }

  console.log('%c Syntax ERROR', 'color: red; font-weight: bold; font-size: 200%', e);
  Promise.reject(e);
  return {
    status: -1,
    message: 'Failed to connect.',
    type: 'client',
  };
};
