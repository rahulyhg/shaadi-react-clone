import axios from 'axios';
import types from '../../action_types';
import api from '../../api';
import { searchParam } from './utils';
import { setCancel, resetCancel } from '../lib/utils';

export default (dispatch, getState, filterParam, history) => {
  resetCancel(dispatch, getState().cancelApi, ['inbox', 'contactSummary']);
  const query = searchParam({ ...filterParam, isWebp: getState().config.app.webp === '1' });
  const CancelToken = setCancel(axios, dispatch, 'inbox');
  dispatch({ type: types.INBOX_DATA_REQUEST, payload: { ...query } });
  const apiObj = api[query.method];
  const { type, action } = query.params.configs;
  const selfInfo = getState().profiles.self;

  const listType = `${getState().inbox.meta.requestType.type}_${getState().inbox.meta.requestType.action}`;
  const userInfo = {
    heShe: selfInfo.heShe,
    himHer: selfInfo.himHer,
    gender: selfInfo.gender,
    uid: selfInfo.uid,
  };
  let apiService;
  switch (query.method) {
    case 'post':
      apiService = apiObj('/inbox', query.params.data, { params: query.params.configs, listType, CancelToken });
      break;
    case 'get':
      apiService = apiObj('/inbox', { params: query.params.configs, listType }, { CancelToken });
      break;

    // no default
  }
  apiService.then(response => {
    const metadata = {
      event_loc: response.data.meta.evtRef,
      event_referrer: response.data.meta.evtRef,
    };
    dispatch({ type: types.METADATA, payload: metadata });
    dispatch({ type: types.INBOX_DATA_SUCCESS, payload: { ...response.data, requestType: type, actionType: action, userInfo } });
    history.push(response.data.meta.permalink);
  });
};
