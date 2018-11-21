const payload = {
  photo_options: {
    fieldset: ['count', 'photos'],
    size: ['small', 'medium', 'semilarge', 'large', '120X120', '450X600', '250X310', '750X1333'],
    blur: 'true',
    thumb_param: '_nb',
  },
};

const request = param => ({
  method: 'get',
  url: `photo/${param.uid}`,
  params: { ...payload, profileids: param.pid, photo_options: { ...payload.photo_options, file_extension: param.fileExtension } },
});
const batchRequest = param => ({
  method: 'get',
  relative_url: `/photo/${param.uid}`,
  query: { ...payload, profileids: param.pid, photo_options: { ...payload.photo_options, file_extension: param.fileExtension } },
});
export default {
  request,
  batchRequest,
};
