const payload = {
  profile: {
    fieldset: ['account', 'basic', 'appearance', 'doctrine', 'location', 'profession'],
  },
  photo: {
    fieldset: ['count', 'photos'],
    profile_photo: true,
    size: ['small', 'medium', '120X120', '450X600'],

    blur: true,
    thumb_param: '_nb',
  },
};

export default (uid, profileids, fileExtension) => {
  const paramPayload = { ...payload, photo: { ...payload.photo, file_extension: `${fileExtension || ''}` } };
  const query = {
    options: JSON.stringify(paramPayload),
  };

  if (uid !== profileids[0]) {
    query.profileids = profileids.join(',');
  }

  return {
    method: 'get',
    relative_url: `/profiles/${uid}`,
    query,
  };
};
