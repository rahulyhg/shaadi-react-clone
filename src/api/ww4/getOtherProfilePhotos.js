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
  const {
    profileids,
    thumb_param_postfix = false,
    excludeProfilePhoto = false,
    getOnlyProfilePhoto = false,
    blur = true,
    size = sizeDefault,
    fieldset = fieldsetDefault,
  } = query;
  const { config: { app: { hasWebpSupport } = {} } } = (getState && getState()) || {};
  const options = {
    profile: {
      fieldset: ['account'],
    },
    photo: {
      fieldset,
      size,
      blur,
    },
  };
  if (hasWebpSupport) {
    options.photo.file_extension = 'webp';
  }
  if (getOnlyProfilePhoto) {
    options.photo.profile_photo = true;
  }
  if (excludeProfilePhoto) {
    options.photo.profile_photo = false;
  }
  if (thumb_param_postfix) {
    options.photo.thumb_param = '_nb';
  }
  const queryParams = {
    profileids: profileids instanceof Array ? profileids.join(',') : String(profileids),
    options: JSON.stringify(options),
  };
  return {
    method: 'get',
    url: `/profiles/${uid}`,
    relative_url: `/profiles/${uid}`,
    query: queryParams,
    params: queryParams,
  };
};
