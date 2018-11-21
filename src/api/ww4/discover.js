const payload = {
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
    profile_photo: true,
    size: ['small', 'medium', 'semilarge', '120X120', '450X600', '250X310'],
    blur: 'true',
    thumb_param: '_nb',
  },
  derived_options: '{"fieldset":["chat_presence","chat_details", "relationship_actions","intents"]}',
  astro_options: {
    fieldset: ['details'],
  },

  page: 1,
  limit_per_page: 21,
  days: 30,
};

const batchRequest = param => ({
  method: 'get',
  relative_url: `/searches/${param.uid}`,
  query: { ...payload, ...param.params, photo_options: { ...payload.photo_options, file_extension: `${param.file_extension || ''}` } },
});

const request = param => ({
  method: 'get',
  url: `searches/${param.uid}`,
  params: { ...payload, ...param.params },
});

export default {
  batchRequest,
  request,
};
