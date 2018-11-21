export default (uid, { type, campaign_type, page }) => {
  if (page) {
    return {
      method: 'get',
      relative_url: `/pages/${page}/${uid}`,
      query: (type && { type }) || {},
    };
  }

  return {
    method: 'get',
    relative_url: `/layer/${uid}`,
    query: {
      type,
      campaign_type,
    },
  };
};
