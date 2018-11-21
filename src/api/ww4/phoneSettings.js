// /* eslint camelcase: 0 */
export default uid => ({
  method: 'get',
  url: `/list/view`,
  relative_url: `/list/view`,
  query: {
    _debug: 'phone_setting',
    fieldset: 'privacy_phone_settings_layer',
    profileid: uid,
  },
});
