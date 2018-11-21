/* eslint camelcase: 0, no-underscore-dangle: 0 */
import axios from 'axios';
import { encode64, cacheKey, searchParams, canonicalUrl } from './utils';

import types from '../../action_types';
import api from '../../api';
import localCache from '../../localCache';
import apiGetBroaderMatches from './apiGetBroaderMatches';
import apiGetPremiumBanner from '../apiGetPremiumBanner';
import errors from '../lib/errors';
import { setCancel, resetCancel } from '../lib/utils';

const searchProfile = (photo_details, uid) => ({
  uid,
  photos: (photo_details.photos || []).map((photo, i) => {
    photo['450X600'] && (photo.medium = photo['450X600']);
    photo['250X310'] && (photo.semilarge = photo['250X310']);

    return albumPhoto(photo);
  }),
});
const albumPhoto = ({ photo_order, domain_name, medium, semilarge }) => ({
  order: photo_order || 0,
  photoBlur: medium ? `${domain_name}${medium}` : null,
  fullPhotoBlur: semilarge ? `${domain_name}${semilarge}` : null,
});
const publishResults = (last_request_id, results, q, dispatch, history, uid) => {
  if (last_request_id && last_request_id !== results.meta.request_id) {
    console.log('Canceling preferred search result', q);
    dispatch({ type: types.PREFERRED_SEARCH_CANCEL, payload: results });
  } else {
    const cKey = cacheKey('mostMatchesTourShown', uid, {});
    dispatch({ type: types.PREFERRED_SEARCH_SUCCESS, payload: results });
    const cData = localCache.read(cKey);
    if (cData !== 'shown' && results.meta.tourShowable) {
      dispatch({ type: types.MODAL_SHOW, payload: { modal: 'mostMatchesTour' } });
    }
    history.push(results.permalink);
    const ref = `matches-${results.meta.type === 'most_preferred' ? 'most_preferred' : 'preferred'}${
      results.meta.viewed === 'N' ? '_unviewed' : '_viewed'
    }${results.meta.type === '2-way' ? '_2ways' : ''}${results.meta.format === 'grid' ? '_grid' : ''}`;
    const metadata = {
      event_loc: ref,
      event_referrer: ref,
    };
    dispatch({ type: types.METADATA, payload: metadata });
  }
};

const loadMatches = (uid, target, dispatch, getState, history, preventRetry) => {
  const q = searchParams(target);
  resetCancel(dispatch, getState().cancelApi, ['inbox', 'contactSummary', 'matches']);
  const CancelToken = setCancel(axios, dispatch, 'matches');

  dispatch({ type: types.PREFERRED_SEARCH_REQUEST, payload: q });

  const mKey = q.results_id ? cacheKey('search/preferred', uid, q) : null;
  q._t = new Date() / 1;
  q.request_id = encode64(q);
  getState().config.app.webp !== '0' && (q.file_extension = 'webp');

  if (mKey) {
    const cachedData = localCache.read(mKey);
    if (cachedData) {
      dispatch({ type: types.PREFERRED_SEARCH_CACHE, payload: cachedData });
    }
  }

  api
    .get('/preferred_matches', { params: q }, { CancelToken })
    .then(response => {
      const gridBucket =
        (getState().session.settings.experiments &&
          getState().session.settings.experiments.grid_view &&
          getState().session.settings.experiments.grid_view.bucket) ||
        'A';
      const format = gridBucket === 'B' ? 'list' : response.data.meta.format;
      const meta = {
        ...response.data.meta,
        format,
      };
      const destination = canonicalUrl(meta, target.defaultFormat);
      const results = { ...response.data, meta, permalink: destination.href };
      const last_request_fired = getState().preferredSearch.results.latest_request_id;
      const isPaidUser = getState().session.settings.isPaidUser;
      publishResults(last_request_fired, results, q, dispatch, history, uid);

      const dKey = cacheKey('search/preferred', uid, destination.params);
      localCache.write(dKey, results, 10 * 60);

      const ckey = cacheKey('counts', uid, {});
      const countData = localCache.read(ckey);
      if (countData && countData.counts && Object.keys(target.changes).length && target.changes.cluster === 'moreMatches') {
        countData.counts.matches = results.meta.max;
        localCache.write(ckey, countData, 1800);
      }

      const photosPayload = { profiles: [], featuredProfiles: [], meta: {} };
      photosPayload.profiles = response.data.profiles.map(profileInfo => searchProfile(profileInfo.photos, profileInfo.uid));
      photosPayload.featuredProfiles = response.data.featuredProfiles.map(profileInfo =>
        searchProfile(profileInfo.photos, profileInfo.uid),
      );
      dispatch({ type: types.PREFERRED_PHOTOS_SUCCESS, payload: photosPayload });

      if (results.meta.page === results.meta.pages || results.meta.pages === 0) {
        apiGetBroaderMatches(dispatch, getState);
      }
      if (results.profiles.length > 0 && !isPaidUser) {
        if (results.meta.page <= 10) {
          apiGetPremiumBanner(results.meta)(dispatch, getState);
        } else {
          dispatch({ type: types.PREMIUM_BANNNER_SUCCESS, payload: {} });
        }
      }
    })
    .catch(error => {
      const payload = errors.clean(error);
      if (payload.error.message.toLowerCase().includes('cache key') && !preventRetry) {
        const newTarget = { ...target, query: { ...target.query, pg_searchresults_id: undefined }, changes: {} };
        loadMatches(uid, newTarget, dispatch, getState, history, true);
      } else {
        dispatch({ type: types.PREFERRED_SEARCH_FAIL, payload });
      }
    });
};

export default loadMatches;
