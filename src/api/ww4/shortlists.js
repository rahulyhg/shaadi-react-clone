export default uid => ({
  method: 'get',
  relative_url: `/shortlists/${uid}`,
  query: { fieldset: 'lists,count' },
});
