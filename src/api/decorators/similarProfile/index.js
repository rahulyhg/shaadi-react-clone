import decorators from '../../decorators';

export default (uid, payload) => {
  const profiles = payload.data.map(item => decorators.profile(undefined, item, { source: 'similarProfile' }));
  const items = payload.data.map(item => ({
    uid: item.account.memberlogin,
    justNow: false,
    eoiLoadingStyle: 'none',
    photoLoading: false,
  }));
  return {
    profiles,
    similarProfiles: {
      items,
      uid,
      results: {
        results_id: (payload.paginator && payload.paginator.key) || '',
        page: (payload.paginator && payload.paginator.page) || 0,
      },
    },
  };
};
