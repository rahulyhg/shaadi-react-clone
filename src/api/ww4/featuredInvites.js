const payload = {
  decorator: {
    name: 'inbox_list',
    profile_photo: true,
    img_size: ['small', 'medium', 'semilarge'],
    img_border: '_nb',
  },
  page: 1,
  limit_per_page: 10,
};

const getRequest = param => ({
  method: 'get',
  url: `featured/${param.uid}`,
  params: { ...payload, ...param },
});

const batchRequest = param => ({
  method: 'get',
  relative_url: `/featured/${param.uid}`,
  query: { ...payload, ...param },
});
export default {
  getRequest,
  batchRequest,
};
