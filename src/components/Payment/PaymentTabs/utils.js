const skipLinkUrl = (urlParams, wwwBaseUrl, skipProfileId) => {
  let url = `${wwwBaseUrl}/my-shaadi`;
  const go = urlParams.go ? `${urlParams.go}`.split(',')[0] : 'my-shaadi';
  const source = urlParams.source ? urlParams.source : '';
  const page = urlParams.page ? urlParams.page : '';
  // const category = urlParams.category ? urlParams.category : 'default';
  const evtRef = urlParams.evt_ref ? urlParams.evt_ref : '';
  url = source.indexOf('stop') !== -1 && go.match(/(megaoffer|registration|payment)/) ? url : go;
  if (page !== '') {
    url = getUrlBaseOnCategory(wwwBaseUrl, page, skipProfileId, url, evtRef);
  }
  return url;
};

const getUrlBaseOnCategory = (wwwBaseUrl, page, skipProfileId, url, evtRef) => {
  switch (page) {
    case 'accepted': {
      return `${wwwBaseUrl}/inbox/accepted/interests`;
    }
    case 'profile': {
      return `${wwwBaseUrl}/profile/${skipProfileId}?evt_ref=${evtRef}`;
    }
    case 'mailer_message_view': {
      return `${wwwBaseUrl}/my-shaadi`;
    }
    default: {
      return `${url}`;
    }
  }
};

export { skipLinkUrl };
