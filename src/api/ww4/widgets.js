export default (uid, widget, id, fileExtension) => ({
  method: 'get',
  url: `/searches/${uid}`,
  params: {
    type: widget,
    limit_per_page: 4,
    profileid: id,
    profile_options: {
      fieldset: ['account', 'basic', 'appearance', 'doctrine', 'account', 'location', 'profession'],
    },
    photo_options: {
      fieldset: ['count', 'photos'],
      profile_photo: 'true',
      size: ['small', '120X120'],
      blur: true,
      thumb_param: '_nb',
      file_extension: fileExtension,
    },
    result_options: { fieldset: ['profileids', 'paginator', 'count'] },
  },
});
