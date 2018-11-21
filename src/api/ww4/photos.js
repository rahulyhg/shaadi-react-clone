/* eslint camelcase: 0 */
const photos = ({ uid, results_id, page, file_extension }) => ({
  method: 'get',
  url: `/searches/${uid}`,
  params: {
    _debug: 'photos_search',
    type: 'pagination',
    page,
    key: results_id,
    limit_per_page: 20,
    profile_options: '{"fieldset":["account"]}',
    result_options: '{"fieldset":["profileids","paginator","featured"]}',
    photo_options: `{"fieldset":["count","photos"],"profile_photo":false,"size":["medium","semilarge","450X600","250X310"],"blur":true${
      file_extension === 'webp' ? ',"file_extension":"webp"' : ''
    }}`,
  },
});

export default photos;
