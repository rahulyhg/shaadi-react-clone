const payload = {
  profile: {
    fieldset: ['account'],
  },
  photo: {
    fieldset: ['count', 'photos'],
    profile_photo: false,
    size: ['medium', 'semilarge', '450X600', '250X310'],
    blur: true,
    thumb_param: '_nb',
  },
};

export default (uid, ids, fileExtension) => ({
  method: 'get',
  relative_url: `/profiles/${uid}`,
  query: {
    profileids: ids.join(','),
    source: 'react-app',
    options: JSON.stringify({ ...payload, photo: { ...payload.photo, file_extension: fileExtension } }),
  },
});
