import withAuth from '../withAuth';
import { filterList } from './apiActions';
import { setFilterReq } from './utils';

const filterSelected = (actionType, ...args) => (dispatch, getState) => {
  withAuth(
    ({ auth }, history) => {
      const filterReqParam = setFilterReq(auth.uid, args);
      filterList('post', filterReqParam, history)(dispatch, getState);
      return false;
    },
    { caller: 'doInboxAction', allowCache: true, delay: 1 },
  );
};

export default filterSelected;
