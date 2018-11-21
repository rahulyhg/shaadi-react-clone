const payload = {
  decorator: {
    name: 'similar_profile',
    profile_photo: true,
    img_size: ['small', 'medium', 'semilarge'],
    img_border: '_nb',
  },
  page: 1,
  limit_per_page: 20,
};

const batchRequest = param => ({
  method: 'get',
  relative_url: `/searches/widgets/${param.uid}`,
  query: { ...payload, ...param },
});
export default {
  batchRequest,
};
