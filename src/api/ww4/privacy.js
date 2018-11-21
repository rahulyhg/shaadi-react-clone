export default uid => ({
  method: 'get',
  relative_url: `/preferences/${uid}`,
  query: {
    profileids: uid,
    fieldset: 'privacy',
  },
});
