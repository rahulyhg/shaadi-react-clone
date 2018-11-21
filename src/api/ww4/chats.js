export default (uid, fileExtension) => ({
  method: 'get',
  relative_url: `/profiles/${uid}/messages`,
  query: {
    type: 'unified',
    options: {
      profile: {
        fieldset: ['account', 'basic', 'appearance', 'doctrine', 'location', 'profession'],
      },
      photo: {
        fieldset: ['count', 'photos'],
        profile_photo: 'true',
        size: ['small', 'medium', '120X120', '450X600'],
        blur: true,
        thumb_param: '_nb',
        file_extension: fileExtension,
      },
    },
    days: 60,
  },
});
