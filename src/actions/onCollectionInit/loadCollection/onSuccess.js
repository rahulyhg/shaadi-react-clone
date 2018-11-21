/* eslint camelcase: 0 */
import types from '../../../action_types';
import gotoProfile from './gotoProfile';

const onSuccess = (payload, params) => {
  const { dispatch } = params;
  dispatch({ type: types.COLLECTION_SUCCESS, payload });
  gotoProfile(params, payload.uid);
};

export default onSuccess;
