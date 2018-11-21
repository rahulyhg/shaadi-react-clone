export default (uid, fileExtension) => ({
  method: 'get',
  relative_url: `/buddylist/${uid}`,
  query: {
    fieldset: 'matches,accepted,shortlist',
    options: {
      profile: {
        fieldset: ['account', 'basic', 'appearance', 'doctrine', 'location', 'profession', 'origin'],
      },
      photo: {
        fieldset: ['count', 'photos'],
        profile_photo: 'true',
        size: ['small', 'medium', '120X120', '450X600'],
        blur: true,
        thumb_param: '_nb',
        file_extension: fileExtension,
      },
      derived: { fieldset: ['relationship_actions', 'chat_presence', 'chat_details'] },
    },
  },
});
