/* eslint max-len: 0 */
export default (uid, ids) => ({
  method: 'get',
  relative_url: `/profiles/${uid}/badge`,
  query: {
    profileids: ids.join(','),
  },
});
