/* eslint camelcase: 0 */
import types from '../../../action_types';
import gotoProfile from './gotoProfile';

const onFail = (payload, params) => {
  console.log('Ignoring queue fail', payload);
  const { dispatch } = params;
  const { uid } = payload;
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

export default onFail;
