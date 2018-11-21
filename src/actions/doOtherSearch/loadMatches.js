/* eslint camelcase: 0, no-underscore-dangle: 0 */
import axios from 'axios';
import { encode64, cacheKey, searchParams, canonicalUrl } from './utils';

import types from '../../action_types';
import api from '../../api';
import localCache from '../../localCache';
import apiGetPremiumBanner from '../apiGetPremiumBanner';
import apiGetRecentlyJoinedMatches from './apiGetRecentlyJoinedMatches';
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
const publishResults = (last_request_id, results, q, dispatch, history, uid, searchTypeDetail, target) => {
  if (last_request_id && last_request_id !== results.meta.request_id) {
    console.log(`Canceling ${results.meta.type} search result`, q);
  } else {
    const ckey = cacheKey('counts', uid, {});
    const countData = localCache.read(ckey);
    const navCnt = countData && countData.counts ? countData.counts : 0;
    if (!Object.keys(target.changes).length && countData && countData.counts) {
      countData.counts[searchTypeDetail.name] = results.meta.max;
      localCache.write(ckey, countData, 1800);
    }
    dispatch({ type: types.OTHER_SEARCH_SUCCESS, payload: { ...results, counts: navCnt, searchTypeDetail } });
    history.push(results.permalink);
    const metadata = {
      event_loc: results.evtref,
      event_referrer: results.evtref,
    };
    dispatch({ type: types.METADATA, payload: metadata });
  }
};

const loadMatches = (uid, target, dispatch, getState, history, preventRetry) => {
  resetCancel(dispatch, getState().cancelApi, ['inbox', 'contactSummary', 'matches']);

  const q = searchParams(target);
  const searchTypeDetail = getState().otherSearch.searchType;
  const CancelToken = setCancel(axios, dispatch, 'matches');

  dispatch({ type: types.OTHER_SEARCH_REQUEST, payload: { ...q, searchTypeDetail } });

  q._t = new Date() / 1;
  q.request_id = encode64(q);
  getState().config.app.webp !== '0' && (q.file_extension = 'webp');
  api
    .get('/other_search', { params: q }, { CancelToken })
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
      let evtref = '';
      const viewedRef = response.data.meta.viewed === 'N' ? '_unviewed' : '_viewed';
      const gridRef = format === 'grid' ? '_grid' : '';
      switch (response.data.meta.type) {
        case 'recently-joined':
          evtref = `matches-new_matches${viewedRef}${gridRef}`;
          break;
        case 'near_me':
          evtref = `matches-near_me${viewedRef}${gridRef}`;
          break;
        case 'broader':
          evtref = `matches-broader${viewedRef}${gridRef}`;
          break;
        case 'reverse':
          evtref = `matches-reverse${gridRef}`;
          break;
        case '2-way':
          evtref = `matches-2way${gridRef}`;
          break;
        case 'discovery_newly_joined':
          evtref = `discovery_newly_joined${viewedRef}${gridRef}`;
          break;
        case 'discovery_premium':
          evtref = `discovery_premium${viewedRef}${gridRef}`;
          break;
        case 'discovery_recent_visitors':
          evtref = `discovery_recent_visitors${viewedRef}${gridRef}`;
          break;
        case 'discovery_newly_joined_2way':
          evtref = `discovery_newly_joined${viewedRef}_2ways${gridRef}`;
          break;
        case 'discovery_premium_2way':
          evtref = `discovery_premium${viewedRef}_2ways${gridRef}`;
          break;
        case 'discovery_recent_visitors_two_way':
          evtref = `discovery_recent_visitors${viewedRef}_2ways${gridRef}`;
          break;
        case 'myshaadi_smartsearch':
          evtref = `search_results-myshaadi${gridRef}`;
          break;
        case 'basic_search':
          evtref = `searchresults-basic${gridRef}`;
          break;
        case 'smart_search':
          evtref = `search_results-advanced${gridRef}`;
          break;
        case 'whoisonline':
          evtref = `search_results-who_is_online${gridRef}`;
          break;
        case 'specialcase_search':
          evtref = `search_results-special_cases${gridRef}`;
          break;
        case 'astrology_search':
          evtref = `search_results-astro${gridRef}`;
          break;
        default:
          break;
      }
      const results = { ...response.data, meta, permalink: destination.href, evtref, pagepath: `search/${target.searchList_type}` };
      const last_request_fired = getState().otherSearch.results.latest_request_id;
      const isPaidUser = getState().session.settings.isPaidUser;
      publishResults(last_request_fired, results, q, dispatch, history, uid, searchTypeDetail, target);

      if (
        (results.meta.page === results.meta.pages || results.meta.pages === 0) &&
        ['recently-joined', 'recently-joined-viewed'].includes(results.meta.category)
      ) {
        apiGetRecentlyJoinedMatches(dispatch, getState);
      }

      const photosPayload = { profiles: [], featuredProfiles: [], meta: {} };
      photosPayload.profiles = response.data.profiles.map(profileInfo => searchProfile(profileInfo.photos, profileInfo.uid));
      photosPayload.featuredProfiles = response.data.featuredProfiles.map(profileInfo =>
        searchProfile(profileInfo.photos, profileInfo.uid),
      );
      dispatch({ type: types.PREFERRED_PHOTOS_SUCCESS, payload: photosPayload });
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
        dispatch({ type: types.OTHER_SEARCH_FAIL, payload });
      }
    });
};

export default loadMatches;
