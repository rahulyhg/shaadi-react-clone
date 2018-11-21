/* eslint camelcase: 0 */
import updateTrustBadge from './updateTrustBadge';
import getTrustBadge from './getTrustBadge';

export default (source, uid, action, args) => (dispatch, getState) => {
  switch (action) {
    case 'getTrustBadgeData': {
      return getTrustBadge();
    }
    case 'addTrustBadgeData': {
      updateTrustBadge(source, uid, { args, getState, dispatch });
      return null;
    }
    default:
      console.log('TO DO action', source, action, uid, args);
      return null;
  }
};
