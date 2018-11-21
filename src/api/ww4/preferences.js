export default (uid, uids) => ({
  method: 'get',
  relative_url: `/preferences/${uid}`,
  query: {
    profileids: uids.join(','),
    fieldset: 'contact_filter,partner,privacy',
  },
});
