const recommendationsCount = uid => ({
  method: 'get',
  relative_url: `/recommendations/${uid}`,
  query: {
    type: 'daily_recommendations',
    result_options: {
      fieldset: ['count'],
    },
  },
});

const searchCount = (uid, type) => ({
  method: 'get',
  relative_url: `/searches/${uid}`,
  query: {
    type,
    viewed: 'N',
    days: ['discovery_recent_visitors', 'discovery_recent_visitors_two_way', 'discovery_premium', 'discovery_premium_2way'].includes(type)
      ? 30
      : ['recently-joined'].includes(type) ? 15 : '',
    preferred_selection: ['preferred', 'most_preferred', 'recently-joined'].includes(type) ? 'setting' : '',
    result_options: { fieldset: ['count'] },
  },
});

export default (uid, type) => {
  if (type === 'daily_recommendations') {
    return recommendationsCount(uid);
  }

  return searchCount(uid, type);
};
