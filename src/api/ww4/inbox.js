const payload = {
  action: 'pending',
  decorator: {
    name: 'inbox_list_details',
    profile_photo: true,
    img_size: ['small', 'medium', 'semilarge'],
    img_border: '_nb',
  },
  page: 1,
  limit_per_page: 10,
};

const addWebpPayload = isWebp =>
  isWebp === 'true'
    ? { ...payload, decorator: { ...payload.decorator, img_size: [...payload.decorator.img_size, ...['150X200']], img_format: 'webp' } }
    : payload;

const getRequest = param => {
  const newPayload = addWebpPayload(param.isWebp);
  return {
    method: 'get',
    url: `inbox/${param.uid}`,
    params: { ...newPayload, ...param },
  };
};
const postRequest = (param, data) => {
  const newPayload = addWebpPayload(param.isWebp);
  return {
    method: 'post',
    relative_url: `/inbox/${param.uid}`,
    query: { ...newPayload, ...param },
    body: data,
  };
};
const batchRequest = param => {
  const newPayload = addWebpPayload(param.isWebp);
  return {
    method: 'get',
    relative_url: `/inbox/${param.uid}`,
    query: { ...newPayload, ...param },
  };
};
export default {
  getRequest,
  postRequest,
  batchRequest,
};
