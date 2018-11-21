import types from '../../../action_types';
import alerts from '../../lib/alerts';

export default (uid, args, params) => {
  const { type, dispatch } = params;

  switch (type) {
    case 'freezeSearch':
      return dispatch({ type: types.PREFERRED_SEARCH_FREEZE, payload: args[0] });
    case 'freezeOtherSearch':
      return dispatch({ type: types.OTHER_SEARCH_FREEZE, payload: args[0] });
    case 'freezeInboxSearch':
      return dispatch({ type: types.INBOX_DATA_FREEZE, payload: args[0] });
    case 'closeProfileTooltip':
      return alerts.hide(dispatch, ['any', ['photo', 'eoi']]);
    case 'closeEoiTooltip':
      return alerts.hide(dispatch, ['any', ['eoi']]);
    case 'closePhotoTooltip':
      return alerts.hide(dispatch, ['any', ['photo']]);
    case 'closeAllTooltips':
      return alerts.hide(dispatch, ['any', ['any']]);
    case 'hideNotificationsToast':
      return dispatch({ type: types.NOTIFICATIONS_HIDE_TOAST, payload: {} });
    default:
      return null;
  }
};
