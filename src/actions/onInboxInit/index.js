import { parse } from 'qs';
import withAuth from '../withAuth';
import apiGetRequest from './apiGetRequest';

export default (queryParam, postParam, location = {}) => (dispatch, getState) => {
  withAuth(
    ({ auth }, history) => {
      const queryStr = (location.search && parse(location.search.slice(1))) || '';
      const filterParams = { queryParam, queryStr, postParam };
      apiGetRequest(dispatch, getState, filterParams, history);
    },
    { caller: 'onInboxInit', allowCache: false, delay: 0 },
  );
};
