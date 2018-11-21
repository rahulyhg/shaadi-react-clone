const payload = {
  options: {
    profile: {
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
    photo: {
      fieldset: ['count', 'photos'],
      profile_photo: true,
      size: ['small', 'medium', 'semilarge', '120X120', '450X600', '250X310'],
      blur: 'true',
      thumb_param: '_grid',
    },
    astro: {
      fieldset: ['details'],
    },
  },
  derived_options: { fieldset: ['chat_presence', 'chat_details', 'relationship_actions', 'intents'] },
  page: 1,
  direction: 'out',
  limit_per_page: 21,
};

const batchRequest = param => ({
  method: 'get',
  relative_url: `/views/${param.uid}`,
  query: {
    ...payload,
    ...param.params,
    options: { ...payload.options, photo: { ...payload.options.photo, file_extension: param.file_extension } },
  },
});

const request = param => ({
  method: 'get',
  url: `profiles/${param.uid}/intents`,
  params: { ...payload, ...param.params },
});

export default {
  batchRequest,
  request,
};
