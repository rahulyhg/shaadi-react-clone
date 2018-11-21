export default (uid, ids) => ({
  method: 'get',
  relative_url: `/intents/${uid}`,
  query: {
    type: 'ignored',
    profileids: ids.join(','),
    fieldset: 'count,intents',
  },
});
