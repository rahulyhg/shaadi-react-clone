const fieldsetDefault = ['count', 'photos'];
const sizeDefault = [
  'small',
  'medium',
  'semilarge',
  'large',
  '40X40',
  '60X60',
  '120X120',
  '150X200',
  '250X310',
  '400X500',
  '450X600',
  '720X1006',
  '750X1333',
];

export default (uid, query, { getState } = {}) => {
  const { getOnlyProfilePhoto = false, blur = true, size = sizeDefault, fieldset = fieldsetDefault } = query;
  const method = 'get';
  const url = `/photo/${uid}`;
  const relative_url = url;
  const photo_options = {
    fieldset,
    size,
    blur,
    // thumb_param: '_nb',
  };
  if (getOnlyProfilePhoto) {
    photo_options.profile_photo = true;
  }
  const { config: { app: { hasWebpSupport } = {} } } = (getState && getState()) || {};
  if (hasWebpSupport) {
    photo_options.file_extension = 'webp';
  }
  const params = {
    _debug: 'getUserPhotos',
    photo_options,
  };
  return {
    method,
    relative_url,
    url,
    query: params,
    params,
  };
};
