/* eslint camelcase: 0 */
import types from '../../../action_types';
import gotoProfile from './gotoProfile';

export default (params, uid) => {
  const { dispatch } = params;
  dispatch({ type: types.COLLECTION_REQUEST, payload: { uid } });
  dispatch({
    type: types.COLLECTION_SUCCESS,
    payload: {
      uid,
      uids: [uid],
      urls: [`/profile?profileid=${uid}`],
      backUrl: null,
    },
  });
  gotoProfile(params, uid);
};
