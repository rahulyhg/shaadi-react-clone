import axios from 'axios';
import types from '../../action_types';
import api from '../../api';
import { setCancel } from '../lib/utils';

const dispatchAction = (dispatch, getState, response, history) => {
  dispatch({ type: types.INBOX_DATA_SUCCESS, payload: { ...response.data, ...response.additionalPayload } });
  history.push(response.data.meta.permalink);
};

const filterList = (method, { queryParam, postParam }, history) => (dispatch, getState) => {
  const listType = `${getState().inbox.meta.requestType.type}_${getState().inbox.meta.requestType.action}`;
  const selfInfo = getState().profiles.self;
  dispatch({ type: types.INBOX_DATA_REQUEST, payload: { params: { data: postParam, configs: queryParam }, method: 'get' } });
  api[method]('/inbox', postParam, { params: queryParam, listType }).then(response => {
    const userInfoPayload = {
      requestType: queryParam.type,
      actionType: queryParam.action,
      userInfo: {
        heShe: selfInfo.heShe,
        himHer: selfInfo.himHer,
        gender: selfInfo.gender,
        uid: selfInfo.uid,
      },
    };
    const responseListType = response.data.meta.listType;
    const metadata = {
      event_loc: response.data.meta.evtRef,
      event_referrer: response.data.meta.evtRef,
    };

    dispatchAction(dispatch, getState, { data: { ...response.data, ...userInfoPayload } }, history);
    dispatch({ type: types.METADATA, payload: metadata });
    if (responseListType === 'connect_pending' && response.data.items.length <= 2) {
      fetchList('connect_filtered', { page: 1, userInfoPayload }, dispatch, getState);
    }
  });
};

const fetchList = (listType, { page, userInfoPayload }, dispatch, getState) => {
  const [type, action] = listType.split('_');
  const params = { type, action, page: page || 1 };
  const CancelToken = setCancel(axios, dispatch, 'inbox');
  dispatch({ type: types.INBOX_DATA_REQUEST, payload: { params: { configs: params } } });

  api.get('/inbox', { params, listType }, { CancelToken }).then(response => {
    const metadata = {
      event_loc: response.data.meta.evtRef,
      event_referrer: response.data.meta.evtRef,
    };
    dispatch({ type: types.METADATA, payload: metadata });
    dispatch({
      type: types.INBOX_DATA_SUCCESS,
      payload: { ...response.data, requestType: type, actionType: action, userInfo: userInfoPayload },
    });
  });
};
export { filterList, fetchList };
