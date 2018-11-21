import types from '../../../action_types';
import apiAction from '../apiAction';
import onSuccess from './onSuccess';
import onFail from './onFail';

export default (uid, args, params) => {
  const { source, self, type, dispatch, history } = params;

  const successFn = onSuccess(uid, args, params, history);
  const failFn = onFail(uid, args, params);

  switch (type) {
    case 'decline': {
      let trackInfo = {};
      if (source === 'featured') {
        trackInfo = {
          event_loc: 'featured_invitation',
          event_referrer: 'featured_invitation',
          event_referrer_ref: window.btoa(unescape(encodeURIComponent('featured_invitation'))),
          event_loc_ref: window.btoa(unescape(encodeURIComponent('featured_invitation'))),
        };
      }
      return apiAction(uid, 'decline', 'declined', params, { trackInfo }, successFn, failFn);
    }
    case 'decline_confirm': {
      dispatch({ type: types.MODAL_HIDE, payload: { uid, source } });
      const text = args[0];
      return apiAction(uid, 'decline', 'declined', params, { text }, successFn, failFn);
    }
    case 'decline_with_delete': {
      const ubt = args[0];
      const data = { metadata: { ubt } };
      return apiAction(uid, 'delete', 'theyContacted', params, data, successFn, failFn);
    }
    case 'delete': {
      const direction = args[0];
      const requestType = args[1];
      return apiAction(uid, 'delete_requests', '', params, { direction, requestType }, successFn, failFn);
    }
    default:
      console.log('TO DO eoiDecline', type, { source, uid, args, self });
      return null;
  }
};
