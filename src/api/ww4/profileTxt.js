const payload = {
  profile: {
    fieldset: ['account'],
  },
};
export default (uid, profileids) => {
  const query = {
    options: JSON.stringify(payload),
  };
  if (uid !== profileids[0]) {
    query.txtprofileids = profileids.join(',');
    query.source = 'profile_page';
  }
  return {
    method: 'get',
    relative_url: `/profiles/${uid}`,
    query,
  };
};
