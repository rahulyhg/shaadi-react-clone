/* eslint camelcase: 0 */
const contactSummary = ({ uid, results_id, page, file_extension }) => ({
  method: 'get',
  url: `/contacts/${uid}/contact-summary`,
  params: {
    _debug: 'contact_summary',
    page,
    limit_per_page: 10,
    key: results_id,
    profile_options:
      '{"fieldset":["basic","lifestyle","health_info","appearance","family","trait","origin","doctrine","account","location","profession","education"]}',
    photo_options: `{"fieldset":["count","photos"],"profile_photo":true,"size":["small","medium","semilarge"],"blur":true,"thumb_param":"_nb"${
      file_extension === 'webp' ? ',"file_extension":"webp"' : ''
    }}`,
  },
});

export default contactSummary;
