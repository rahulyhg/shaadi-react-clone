export default (uid, data, metadata) => ({
  method: 'put',
  relative_url: `/profiles/${uid}`,
  body: { data, metadata },
});
