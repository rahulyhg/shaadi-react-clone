/* eslint camelcase: 0 */
const premiumBanner = ({ uid, results_id, page }) => ({
  method: 'get',
  url: `/pages/premium-banner/${uid}`,
  params: {
    _debug: 'search_premium_banner',
    page,
    limit_per_page: 1,
    limit: 10,
    profile_options: '{"fieldset":["basic","account"]}',
    contact_options: '{"fieldset":["details"]}',
    result_options: '{"fieldset":["profileids","paginator","spotlight","criteria","facet_fields","shortlist_count","count"]}',
    photo_options: `{"fieldset":["count","photos"],"profile_photo":true,"size":["small","medium","semilarge"],"blur":true,"thumb_param":"_nb"}`,
  },
});

export default premiumBanner;
