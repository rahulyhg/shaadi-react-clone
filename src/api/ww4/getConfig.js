export default (uid, { params = {} }) => ({
  method: 'get',
  url: `/config/user/${uid}`,
  relative_url: `/config/user/${uid}`,
  params,
});
