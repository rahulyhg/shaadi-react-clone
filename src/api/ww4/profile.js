const payload = {
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
      'activity_factor',
      'verification',
    ],
  },
  photo: {
    fieldset: ['count', 'photos'],
    profile_photo: true,
    size: ['small', 'medium', 'semilarge', 'large', '750X1333', '120X120', '450X600', '250X310'],

    blur: true,
    thumb_param: '_nb',
  },
  astro: { fieldset: ['details'] },
  contact: { fieldset: ['details'] },
  derived: { fieldset: ['relationship_actions', 'chat_presence', 'chat_details', 'score', 'profile_views'] },
  derived_text: {
    fieldset: ['matching_data', 'family_details', 'horoscope_details', 'education', 'career', 'annualincome'],
    match_count: 3,
  },
};

export default (uid, profileids, fileExtension) => {
  const paramPayload = { ...payload, photo: { ...payload.photo, file_extension: `${fileExtension || ''}` } };
  const query = {
    options: JSON.stringify(paramPayload),
  };

  if (uid !== profileids[0]) {
    query.profileids = profileids.join(',');
    query.source = 'profile_page';
  }

  return {
    method: 'get',
    relative_url: `/profiles/${uid}`,
    query,
  };
};
