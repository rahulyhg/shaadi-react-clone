import types from '../action_types';
import api from '../api';
import errors from './lib/errors';
import localCache from '../localCache';

export default (dispatch, getState) => {
  const { experiments = {} } = getState().session.settings;
  const showModal = experiments.accept_success && experiments.accept_success.bucket === 'B';

  if (showModal === true) {
    const cacheKey = 'firstLoad';
    const firstLoad = localCache.read(cacheKey);

    if (firstLoad && firstLoad.show === true) {
      api
        .get('/pages/banners', { params: { type: 'accepted_match' } })

        .then(response => {
          const { data } = response;
          const modalData = data.data[0];
          if (modalData && !!Object.keys(modalData).length) {
            const uid = modalData.profileBrief.memberlogin;
            const payloadData = {
              modal: 'accept_match',
              uid,
              name: modalData.profileBrief.Name.displayName,
              himHer: modalData.profileBrief.himher,
              profilePhoto: `${modalData.photo_details.photos[0].domain_name}${modalData.photo_details.photos[0].medium}`,
              type: 'received',
            };
            if (!firstLoad.profiles.includes(uid)) {
              const profiles = firstLoad.profiles;
              profiles.push(uid);
              localCache.write(cacheKey, { ...firstLoad, profiles }, 3600 * 24 * 7);
              dispatch({ type: types.MODAL_SHOW, payload: payloadData });
            }
          }
        })
        .catch(error => dispatch({ type: types.COUNTS_FAIL, payload: errors.clean(error) }));
    } else {
      localCache.write(cacheKey, { show: true, profiles: [] }, 3600 * 24 * 7);
    }
  }
};
