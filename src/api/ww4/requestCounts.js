export default (uid, types) => ({
  method: 'get',
  relative_url: `/profiles/${uid}/requests/count`,
  query: {
    fieldset: types.join(','),
  },
});
