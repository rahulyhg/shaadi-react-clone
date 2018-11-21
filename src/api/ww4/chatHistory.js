/* eslint camelcase: 0 */
export default (uid, profile_ids, type) => ({
  method: 'get',
  relative_url: `/messages/${uid}`,
  query: {
    type,
    fieldset: 'count,messages',
    recipient_ids: profile_ids.join(','),
    profile_options: {
      fieldset: [
        'account',
        'basic',
        'lifestyle',
        'health_info',
        'appearance',
        'family',
        'trait',
        'origin',
        'doctrine',
        'account',
        'location',
        'profession',
        'education',
        'interests_and_more',
      ],
    },
    photo_options: {
      fieldset: ['count', 'photos'],
      profile_photo: 'true',
      size: ['small', 'medium', 'semilarge'],
      blur: true,
      thumb_param: '_nb',
    },
    limit: 100,
  },
});
