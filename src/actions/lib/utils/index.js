import { parse, stringify } from 'qs';
import types from '../../../action_types';
import localCache from '../../../localCache';
import popup from './popup';
import GA from './ga';
import DA from './da';

const cacheKey = (pageName, uid, query = {}) => `${uid}::${pageName}?${stringify(query)}`;

const clearProfileCaches = (uid, self) => {
  // Invalidate all search and profile caches.
  localCache.clearPrefix(`${self}::search`);
  localCache.clearPrefix(`${self}::profile`);
};

const setCancel = (axios, dispatch, source) => {
  const CancelTokenClass = axios.CancelToken;
  const CancelToken = new CancelTokenClass(cancelFn => {
    dispatch({ type: types.SET_CANCEL, payload: { source, cancelFn } });
  });
  return CancelToken;
};
const resetCancel = (dispatch, source = {}, cancelSource) => {
  cancelSource.filter(sourceInfo => source[sourceInfo]).forEach(src => source[src]());
  dispatch({ type: types.RESET_CANCEL, payload: { source: cancelSource } });
};
export { cacheKey, parse, stringify, clearProfileCaches, popup, GA, DA, setCancel, resetCancel };
